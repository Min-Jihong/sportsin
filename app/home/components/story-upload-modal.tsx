"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Type, Trash2, Share2, Palette, Camera, Smile, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { useSpring, animated, config } from "@react-spring/web";

interface StoryUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (imageUrl: string) => void;
}

interface TextItem {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
  fontFamily: string;
  rotation: number;
}

const FILTERS = [
  { name: "원본", filter: "none" },
  { name: "클래식", filter: "grayscale(100%)" },
  { name: "빈티지", filter: "sepia(100%) contrast(1.2)" },
  { name: "흑백", filter: "grayscale(100%) contrast(1.2)" },
  { name: "밝게", filter: "brightness(1.3)" },
  { name: "어둡게", filter: "brightness(0.7)" },
  { name: "따뜻하게", filter: "sepia(50%) saturate(150%)" },
  { name: "차갑게", filter: "hue-rotate(180deg) saturate(120%)" },
];

const TEXT_COLORS = ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];

// 더미 갤러리 이미지들
const GALLERY_IMAGES = Array.from({ length: 20 }, (_, i) => ({
  id: `gallery-${i}`,
  url: `https://picsum.photos/400/400?random=${i}`,
}));

type ViewMode = "gallery" | "edit";
type ToolMode = "text" | "filter" | "sticker" | null;

export function StoryUploadModal({ isOpen, onClose, onSave }: StoryUploadModalProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("none");
  const [texts, setTexts] = useState<TextItem[]>([]);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [isAddingText, setIsAddingText] = useState(false);
  const [newText, setNewText] = useState("");
  const [imageTransform, setImageTransform] = useState({ scale: 1, x: 0, y: 0, rotation: 0 });
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [isDraggingText, setIsDraggingText] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [toolMode, setToolMode] = useState<ToolMode>(null);
  const [isEyeDropperActive, setIsEyeDropperActive] = useState(false);
  const [eyeDropperPosition, setEyeDropperPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDraggingEyeDropper, setIsDraggingEyeDropper] = useState(false);
  const [textPinchStart, setTextPinchStart] = useState<{ distance: number; fontSize: number } | null>(null);
  const [textRotationStart, setTextRotationStart] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textElementRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // React Spring 애니메이션
  const gallerySpring = useSpring({
    transform: viewMode === "gallery" ? "translateX(0%)" : "translateX(-100%)",
    opacity: viewMode === "gallery" ? 1 : 0,
    config: config.gentle,
  });

  const editSpring = useSpring({
    transform: viewMode === "edit" ? "translateX(0%)" : "translateX(100%)",
    opacity: viewMode === "edit" ? 1 : 0,
    config: config.gentle,
  });

  useEffect(() => {
    if (isOpen) {
      // 페이지 줌 방지
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      const preventZoom = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      };
      const preventWheel = (e: WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
        }
      };
      document.addEventListener("touchstart", preventZoom, { passive: false });
      document.addEventListener("touchmove", preventZoom, { passive: false });
      document.addEventListener("wheel", preventWheel, { passive: false });

      return () => {
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        document.removeEventListener("touchstart", preventZoom);
        document.removeEventListener("touchmove", preventZoom);
        document.removeEventListener("wheel", preventWheel);
      };
    } else {
      setViewMode("gallery");
      setSelectedImage(null);
      setSelectedFilter("none");
      setTexts([]);
      setIsAddingText(false);
      setNewText("");
      setSelectedTextId(null);
      setImageTransform({ scale: 1, x: 0, y: 0, rotation: 0 });
      setToolMode(null);
      setIsEyeDropperActive(false);
      setEyeDropperPosition(null);
      setIsDraggingEyeDropper(false);
    }
  }, [isOpen]);

  // 텍스트 입력 모드일 때 input에 포커스
  useEffect(() => {
    if (isAddingText && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [isAddingText]);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setViewMode("edit");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지에서 색상 추출 (eye dropper 위치 기반)
  const extractColorFromEyeDropper = useCallback((): string | null => {
    if (!eyeDropperPosition || !imageRef.current || !imageContainerRef.current) return null;

    try {
      const img = imageRef.current;
      const container = imageContainerRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!canvas || !ctx) return null;

      const containerRect = container.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();

      // eye dropper 위치를 이미지 좌표로 변환
      const imgX = ((eyeDropperPosition.x - containerRect.left) / containerRect.width) * imgRect.width;
      const imgY = ((eyeDropperPosition.y - containerRect.top) / containerRect.height) * imgRect.height;

      // 이미지가 로드되었는지 확인
      if (img.complete && img.naturalWidth > 0) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // CORS 설정
        img.crossOrigin = "anonymous";

        ctx.drawImage(img, 0, 0);

        const scaleX = img.naturalWidth / imgRect.width;
        const scaleY = img.naturalHeight / imgRect.height;
        const pixelX = Math.floor((imgX - imgRect.left + containerRect.left) * scaleX);
        const pixelY = Math.floor((imgY - imgRect.top + containerRect.top) * scaleY);

        const imageData = ctx.getImageData(
          Math.max(0, Math.min(pixelX, img.naturalWidth - 1)),
          Math.max(0, Math.min(pixelY, img.naturalHeight - 1)),
          1,
          1
        );
        const [r, g, b] = imageData.data;

        return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
      }
    } catch (error) {
      // CORS 에러 등이 발생하면 null 반환
      console.warn("색상 추출 실패:", error);
      return null;
    }

    return null;
  }, [eyeDropperPosition]);

  // Eye dropper 위치 변경 시 색상 추출 (드래그 종료 시에만)
  useEffect(() => {
    if (eyeDropperPosition && isEyeDropperActive && selectedTextId && !isDraggingEyeDropper) {
      // 약간의 지연을 두어 드래그 종료 후 색상 추출
      const timer = setTimeout(() => {
        const color = extractColorFromEyeDropper();
        if (color) {
          updateTextStyle(selectedTextId, { color });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [eyeDropperPosition, isEyeDropperActive, selectedTextId, isDraggingEyeDropper, extractColorFromEyeDropper]);

  // 이미지 핀치 줌 (마우스 휠)
  const handleImageWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!imageContainerRef.current || selectedTextId) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(0.5, Math.min(3, imageTransform.scale * delta));
      setImageTransform((prev) => ({ ...prev, scale: newScale }));
    },
    [imageTransform.scale, selectedTextId]
  );

  // 이미지 드래그 시작
  const handleImageMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (selectedTextId || isDraggingText) {
        return;
      }
      setIsDraggingImage(true);
      setDragStart({ x: e.clientX - imageTransform.x, y: e.clientY - imageTransform.y });
    },
    [imageTransform, selectedTextId, isDraggingText]
  );

  // 이미지 드래그
  const handleImageMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDraggingImage) return;
      setImageTransform({
        ...imageTransform,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDraggingImage, dragStart, imageTransform]
  );

  // 이미지 드래그 종료
  const handleImageMouseUp = useCallback(() => {
    setIsDraggingImage(false);
  }, []);

  // 텍스트 드래그 시작
  const handleTextMouseDown = useCallback(
    (e: React.MouseEvent, textId: string) => {
      e.stopPropagation();
      setSelectedTextId(textId);
      setIsDraggingText(true);
      const text = texts.find((t) => t.id === textId);
      if (text) {
        const container = imageContainerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          const textX = (text.x / 100) * rect.width + rect.left;
          const textY = (text.y / 100) * rect.height + rect.top;
          setDragStart({ x: e.clientX - textX, y: e.clientY - textY });
        }
      }
    },
    [texts]
  );

  // Eye dropper 클릭 핸들러
  const handleEyeDropperClick = useCallback(() => {
    if (isEyeDropperActive) {
      setIsEyeDropperActive(false);
      setEyeDropperPosition(null);
    } else {
      setIsEyeDropperActive(true);
      // 초기 위치를 이미지 중앙으로 설정
      if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        setEyeDropperPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    }
  }, [isEyeDropperActive]);

  // Eye dropper 드래그 시작
  const handleEyeDropperMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsDraggingEyeDropper(true);
      if (eyeDropperPosition) {
        setDragStart({ x: e.clientX - eyeDropperPosition.x, y: e.clientY - eyeDropperPosition.y });
      }
    },
    [eyeDropperPosition]
  );

  // 전역 마우스 이벤트
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingEyeDropper) {
        const container = imageContainerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          const x = Math.max(rect.left, Math.min(rect.right, e.clientX));
          const y = Math.max(rect.top, Math.min(rect.bottom, e.clientY));
          setEyeDropperPosition({ x, y });
        }
      } else if (isDraggingImage) {
        setImageTransform({
          ...imageTransform,
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      } else if (isDraggingText && selectedTextId) {
        const container = imageContainerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left - dragStart.x) / rect.width) * 100;
        const y = ((e.clientY - rect.top - dragStart.y) / rect.height) * 100;

        setTexts((prev) =>
          prev.map((text) =>
            text.id === selectedTextId
              ? { ...text, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
              : text
          )
        );
      }
    };

    const handleMouseUp = () => {
      setIsDraggingImage(false);
      setIsDraggingText(false);
      setIsDraggingEyeDropper(false);
    };

    if (isDraggingImage || isDraggingText || isDraggingEyeDropper) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDraggingImage, isDraggingText, isDraggingEyeDropper, selectedTextId, dragStart, imageTransform]);

  // 터치 이벤트
  const [touchStart, setTouchStart] = useState<{ x: number; y: number; distance: number; angle: number } | null>(null);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      // 두 손가락 터치 시 기본 줌 방지
      if (e.touches.length === 2) {
        e.preventDefault();
      }

      if (e.touches.length === 1) {
        const touch = e.touches[0];
        // 텍스트가 있는 위치인지 확인
        const container = imageContainerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          const touchX = ((touch.clientX - rect.left) / rect.width) * 100;
          const touchY = ((touch.clientY - rect.top) / rect.height) * 100;

          // 가장 가까운 텍스트 찾기
          const closestText = texts.reduce((closest, text) => {
            const distance = Math.hypot(text.x - touchX, text.y - touchY);
            const closestDistance = closest ? Math.hypot(closest.x - touchX, closest.y - touchY) : Infinity;
            return distance < closestDistance && distance < 10 ? text : closest;
          }, null as TextItem | null);

          if (closestText) {
            setSelectedTextId(closestText.id);
            setIsDraggingText(true);
            setDragStart({
              x: (closestText.x / 100) * rect.width - touch.clientX + rect.left,
              y: (closestText.y / 100) * rect.height - touch.clientY + rect.top,
            });
          } else {
            setIsDraggingImage(true);
            setDragStart({ x: touch.clientX - imageTransform.x, y: touch.clientY - imageTransform.y });
          }
        }
      } else if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
        const angle = Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX);

        // 텍스트가 선택되어 있으면 텍스트 크기/회전 조절
        if (selectedTextId) {
          const selectedText = texts.find((t) => t.id === selectedTextId);
          if (selectedText) {
            setTextPinchStart({ distance, fontSize: selectedText.fontSize });
            setTextRotationStart(angle);
          }
        } else {
          // 이미지 핀치 줌/회전
          setTouchStart({
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2,
            distance,
            angle,
          });
        }
      }
    },
    [texts, imageTransform, selectedTextId]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      // 두 손가락 터치 시 기본 줌 방지
      if (e.touches.length === 2) {
        e.preventDefault();
      }

      if (e.touches.length === 1 && isDraggingText && selectedTextId) {
        const touch = e.touches[0];
        const container = imageContainerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          const x = ((touch.clientX - rect.left - dragStart.x) / rect.width) * 100;
          const y = ((touch.clientY - rect.top - dragStart.y) / rect.height) * 100;
          setTexts((prev) =>
            prev.map((text) =>
              text.id === selectedTextId
                ? { ...text, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
                : text
            )
          );
        }
      } else if (e.touches.length === 1 && isDraggingImage) {
        const touch = e.touches[0];
        setImageTransform({
          ...imageTransform,
          x: touch.clientX - dragStart.x,
          y: touch.clientY - dragStart.y,
        });
      } else if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
        const angle = Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX);

        // 텍스트 크기/회전 조절
        if (selectedTextId && textPinchStart && textRotationStart !== null) {
          const scale = distance / textPinchStart.distance;
          const rotationDelta = angle - textRotationStart;
          const newFontSize = Math.max(16, Math.min(128, textPinchStart.fontSize * scale));
          const selectedText = texts.find((t) => t.id === selectedTextId);
          if (selectedText) {
            const newRotation = selectedText.rotation + (rotationDelta * 180) / Math.PI;
            updateTextStyle(selectedTextId, { fontSize: newFontSize, rotation: newRotation });
          }
        } else if (touchStart) {
          // 이미지 핀치 줌/회전
          const scale = (distance / touchStart.distance) * imageTransform.scale;
          const rotation = angle - touchStart.angle;

          const newScale = Math.max(0.5, Math.min(3, scale));
          setImageTransform((prev) => ({
            ...prev,
            scale: newScale,
            rotation: prev.rotation + (rotation * 180) / Math.PI,
          }));
        }
      }
    },
    [
      isDraggingText,
      isDraggingImage,
      selectedTextId,
      touchStart,
      imageTransform,
      dragStart,
      textPinchStart,
      textRotationStart,
      texts,
    ]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDraggingImage(false);
    setIsDraggingText(false);
    setTouchStart(null);
    setTextPinchStart(null);
    setTextRotationStart(null);
  }, []);

  const handleAddText = () => {
    if (newText.trim()) {
      const newTextItem: TextItem = {
        id: Date.now().toString(),
        text: newText,
        x: 50,
        y: 50,
        color: TEXT_COLORS[0],
        fontSize: 32,
        fontFamily: "Arial",
        rotation: 0,
      };
      setTexts([...texts, newTextItem]);
      setSelectedTextId(newTextItem.id);
      setNewText("");
      setIsAddingText(false);
      setToolMode("text");
    }
  };

  const handleDeleteText = (textId: string) => {
    setTexts((prev) => prev.filter((text) => text.id !== textId));
    if (selectedTextId === textId) {
      setSelectedTextId(null);
    }
  };

  const updateTextStyle = (textId: string, updates: Partial<TextItem>) => {
    setTexts((prev) => prev.map((text) => (text.id === textId ? { ...text, ...updates } : text)));
  };

  const selectedText = texts.find((t) => t.id === selectedTextId);

  const handleSave = () => {
    if (selectedImage && onSave) {
      onSave(selectedImage);
    }
    onClose();
  };

  const handleBack = () => {
    if (viewMode === "edit") {
      setViewMode("gallery");
      setSelectedImage(null);
      setTexts([]);
      setSelectedTextId(null);
      setImageTransform({ scale: 1, x: 0, y: 0, rotation: 0 });
      setToolMode(null);
      setIsAddingText(false);
      setIsEyeDropperActive(false);
    } else {
      onClose();
    }
  };

  const handleTextClick = (e: React.MouseEvent, textId: string) => {
    e.stopPropagation();
    setSelectedTextId(textId);
    setToolMode("text");
  };

  const handleTextIconClick = () => {
    if (toolMode === "text") {
      setToolMode(null);
      setIsAddingText(false);
    } else {
      setToolMode("text");
      setIsAddingText(true);
      setSelectedTextId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      style={{ touchAction: "none" }}
      onTouchStart={(e) => {
        // 두 손가락 터치 시 기본 줌 방지
        if (e.touches.length === 2) {
          e.preventDefault();
        }
      }}
      onTouchMove={(e) => {
        // 두 손가락 터치 시 기본 줌 방지
        if (e.touches.length === 2) {
          e.preventDefault();
        }
      }}
    >
      <canvas ref={canvasRef} className="hidden" />
      <div className="relative w-full h-full max-w-md max-h-dvh bg-background flex flex-col overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <X className="size-5" />
          </Button>
          <h2 className="font-semibold text-foreground">{viewMode === "gallery" ? "사진 선택" : "스토리 만들기"}</h2>
          <div className="w-9" />
        </div>
        {/* 메인 콘텐츠 - 슬라이드 컨테이너 */}
        <div className="relative flex-1 overflow-hidden">
          {/* 갤러리 뷰 */}
          <animated.div
            style={{
              ...gallerySpring,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            className="flex flex-col h-full"
          >
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-3 gap-2">
                {/* 카메라 버튼 */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square bg-muted rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-muted/80 transition-colors border-2 border-dashed border-border"
                >
                  <Camera className="size-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">카메라</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* 갤러리 이미지들 */}
                {GALLERY_IMAGES.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => handleImageSelect(image.url)}
                    className="aspect-square rounded-lg overflow-hidden bg-muted hover:opacity-80 transition-opacity"
                  >
                    <img src={image.url} alt="Gallery" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </animated.div>

          {/* 편집 뷰 */}
          <animated.div
            style={{
              ...editSpring,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            className="flex h-full relative"
          >
            {selectedImage && (
              <>
                {/* 이미지 미리보기 영역 */}
                <div
                  ref={imageContainerRef}
                  className="relative flex-1 bg-black overflow-hidden touch-none"
                  onMouseDown={handleImageMouseDown}
                  onMouseMove={handleImageMouseMove}
                  onMouseUp={handleImageMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onWheel={handleImageWheel}
                  style={{ touchAction: "none" }}
                  onClick={(e) => {
                    // 텍스트가 아닌 곳을 클릭하면 선택 해제
                    if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === "IMG") {
                      setSelectedTextId(null);
                      setToolMode(null);
                      setIsAddingText(false);
                    }
                  }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `scale(${imageTransform.scale}) rotate(${imageTransform.rotation}deg) translate(${
                        imageTransform.x / imageTransform.scale
                      }px, ${imageTransform.y / imageTransform.scale}px)`,
                      transition: isDraggingImage || isDraggingText ? "none" : "transform 0.1s",
                    }}
                  >
                    <img
                      ref={imageRef}
                      src={selectedImage}
                      alt="스토리 미리보기"
                      className="max-w-full max-h-full object-contain select-none"
                      style={{ filter: selectedFilter }}
                      draggable={false}
                    />
                  </div>

                  {/* 중앙 텍스트 입력 */}
                  {isAddingText && (
                    <div className="absolute inset-0 flex items-center justify-center z-30">
                      <input
                        ref={textInputRef}
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder="텍스트 입력"
                        className="bg-transparent border-none outline-none text-white text-4xl font-bold text-center placeholder:text-white/50 px-4 w-full max-w-[80%]"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAddText();
                          } else if (e.key === "Escape") {
                            setIsAddingText(false);
                            setNewText("");
                            setToolMode(null);
                          }
                        }}
                        onBlur={() => {
                          if (newText.trim()) {
                            handleAddText();
                          } else {
                            setIsAddingText(false);
                            setToolMode(null);
                          }
                        }}
                        autoFocus
                      />
                    </div>
                  )}

                  {/* 텍스트 오버레이 */}
                  {texts.map((textItem) => (
                    <div
                      key={textItem.id}
                      ref={(el) => {
                        if (el) {
                          textElementRefs.current.set(textItem.id, el);
                        } else {
                          textElementRefs.current.delete(textItem.id);
                        }
                      }}
                      className={cn(
                        "absolute cursor-move select-none z-10",
                        selectedTextId === textItem.id && "ring-2 ring-blue-500 rounded"
                      )}
                      style={{
                        left: `${textItem.x}%`,
                        top: `${textItem.y}%`,
                        transform: `translate(-50%, -50%) rotate(${textItem.rotation}deg)`,
                        color: textItem.color,
                        fontSize: `${textItem.fontSize}px`,
                        fontFamily: textItem.fontFamily,
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                        padding: selectedTextId === textItem.id ? "4px" : "0",
                      }}
                      onMouseDown={(e) => handleTextMouseDown(e, textItem.id)}
                      onClick={(e) => handleTextClick(e, textItem.id)}
                    >
                      {textItem.text}
                      {selectedTextId === textItem.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteText(textItem.id);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="size-3 text-white" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Eye Dropper 아이콘 (이미지 위에 배치) */}
                {isEyeDropperActive && eyeDropperPosition && (
                  <div
                    className="absolute z-40 cursor-move"
                    style={{
                      left: `${eyeDropperPosition.x}px`,
                      top: `${eyeDropperPosition.y}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onMouseDown={handleEyeDropperMouseDown}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border-2 border-blue-500">
                      <Droplet className="size-6 text-blue-500" />
                    </div>
                  </div>
                )}

                {/* 사이드바 도구 */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 p-2 z-20">
                  <button
                    onClick={handleTextIconClick}
                    className={cn(
                      "size-12 rounded-full flex items-center justify-center transition-all",
                      toolMode === "text"
                        ? "bg-blue-500 text-white"
                        : "bg-black/80 backdrop-blur-sm text-foreground hover:bg-black"
                    )}
                  >
                    <Type className="size-5" />
                  </button>
                  <button
                    onClick={() => setToolMode(toolMode === "filter" ? null : "filter")}
                    className={cn(
                      "size-12 rounded-full flex items-center justify-center transition-all",
                      toolMode === "filter"
                        ? "bg-blue-500 text-white"
                        : "bg-black/80 backdrop-blur-sm text-foreground hover:bg-black"
                    )}
                  >
                    <Palette className="size-5" />
                  </button>
                  <button
                    onClick={() => setToolMode(toolMode === "sticker" ? null : "sticker")}
                    className={cn(
                      "size-12 rounded-full flex items-center justify-center transition-all",
                      toolMode === "sticker"
                        ? "bg-blue-500 text-white"
                        : "bg-black/80 backdrop-blur-sm text-foreground hover:bg-black"
                    )}
                    disabled
                  >
                    <Smile className="size-5" />
                  </button>
                </div>

                {/* 텍스트 선택 시 하단 색상 팔레트 */}
                {selectedTextId && selectedText && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center z-30">
                    {/* Eye Dropper 버튼 */}
                    <button
                      onClick={handleEyeDropperClick}
                      className={cn(
                        "size-10 rounded-full border-2 flex items-center justify-center transition-all",
                        isEyeDropperActive
                          ? "border-white bg-white/20 scale-110"
                          : "border-white/50 bg-white/10 hover:bg-white/20"
                      )}
                    >
                      <Droplet className="size-5 text-white" />
                    </button>

                    {/* 색상 팔레트 */}
                    {TEXT_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          updateTextStyle(selectedText.id, { color });
                          setIsEyeDropperActive(false);
                        }}
                        className={cn(
                          "size-10 rounded-full border-2 transition-all",
                          selectedText.color === color ? "border-white scale-110" : "border-white/50"
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}

                {/* 필터 패널 */}
                {toolMode === "filter" && (
                  <div className="absolute bottom-4 left-4 right-20 bg-black/90 backdrop-blur-sm rounded-lg p-4 z-20">
                    <p className="text-sm font-medium text-foreground mb-2">필터</p>
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                      {FILTERS.map((filter) => (
                        <button
                          key={filter.name}
                          onClick={() => setSelectedFilter(filter.filter)}
                          className={cn(
                            "shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                            selectedFilter === filter.filter
                              ? "bg-blue-500 text-white"
                              : "bg-background text-foreground border border-border hover:bg-muted"
                          )}
                        >
                          {filter.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </animated.div>
        </div>
        {/* 하단 버튼 */}
        {viewMode === "edit" && selectedImage && (
          <div className="flex gap-2 p-4 border-t border-border bg-black shrink-0">
            <Button variant="outline" onClick={handleBack} className="flex-1">
              뒤로
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <Share2 className="size-4 mr-2" />
              공유하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
