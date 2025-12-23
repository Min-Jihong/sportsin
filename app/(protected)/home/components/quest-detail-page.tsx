"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, X, Upload, Check } from "lucide-react";
import { useUploadImage } from "@/hooks/use-upload-image";
import { mockQuests } from "../lib/mock-quests";

interface QuestDetailPageProps {
  questId: string;
}

interface UploadedMedia {
  id: string;
  file: File;
  previewUrl: string;
  type: "image" | "video";
  uploadedUrl?: string;
}

export const QuestDetailPage = ({ questId }: QuestDetailPageProps) => {
  const router = useRouter();
  const { uploadImage, isUploading } = useUploadImage();
  const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const quest = mockQuests.find((q) => q.id === questId);

  if (!quest) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <p>퀘스트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 타입 확인
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      alert("이미지 또는 비디오 파일만 업로드 가능합니다.");
      return;
    }

    // 파일 크기 제한
    const MAX_FILE_SIZE = isImage ? 10 * 1024 * 1024 : 100 * 1024 * 1024; // 이미지 10MB, 비디오 100MB
    if (file.size > MAX_FILE_SIZE) {
      alert(`파일 크기는 ${isImage ? "10MB" : "100MB"} 이하여야 합니다.`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const newMedia: UploadedMedia = {
      id: Date.now().toString(),
      file,
      previewUrl,
      type: isImage ? "image" : "video",
    };

    setUploadedMedia((prev) => [...prev, newMedia]);

    // 같은 파일을 다시 선택할 수 있도록 input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveMedia = (id: string) => {
    setUploadedMedia((prev) => {
      const media = prev.find((m) => m.id === id);
      if (media) {
        URL.revokeObjectURL(media.previewUrl);
      }
      return prev.filter((m) => m.id !== id);
    });
  };

  const handleUpload = async () => {
    // TODO: 실제 업로드 로직 구현
    // 현재는 이미지만 업로드 가능하므로, 비디오 업로드도 추가해야 함
    for (const media of uploadedMedia) {
      if (media.type === "image" && !media.uploadedUrl) {
        // TODO: userId 가져오기
        const userId = "temp-user-id"; // 실제로는 인증된 사용자 ID 사용
        const uploadedUrl = await uploadImage(userId, media.file);
        if (uploadedUrl) {
          setUploadedMedia((prev) => prev.map((m) => (m.id === media.id ? { ...m, uploadedUrl } : m)));
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (uploadedMedia.length === 0) {
      alert("최소 1개 이상의 미디어를 업로드해주세요.");
      return;
    }

    // 모든 미디어 업로드
    await handleUpload();

    // TODO: API 호출로 퀘스트 완료 제출
    alert("퀘스트 완료가 제출되었습니다!");
    router.back();
  };

  return (
    <div className="h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* 헤더 */}
      <div className="shrink-0 flex items-center gap-4 px-4 py-4 border-b border-white/10">
        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-lg font-bold text-white">퀘스트 상세</h1>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="w-full px-4 py-6 space-y-6">
          {/* 퀘스트 정보 */}
          <div className="space-y-4">
            {quest.thumbnail && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <img src={quest.thumbnail} alt={quest.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{quest.title}</h2>
              <p className="text-white/70 mb-4">{quest.description}</p>
              <div className="flex items-center gap-4 text-sm text-white/50">
                <span>✓ {quest.completedCount}명 완료</span>
              </div>
            </div>
          </div>

          {/* 클리어 방법 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">클리어 방법</h3>
            <div className="space-y-2 text-white/70">
              <p>1. {quest.title}를 수행하세요</p>
              <p>2. 수행한 내용을 영상 또는 이미지로 촬영하세요</p>
              <p>3. 아래에서 미디어를 업로드하고 제출하세요</p>
            </div>
          </div>

          {/* 업로드된 미디어 */}
          {uploadedMedia.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">업로드한 미디어</h3>
              <div className="grid grid-cols-2 gap-3">
                {uploadedMedia.map((media) => (
                  <div key={media.id} className="relative aspect-square rounded-lg overflow-hidden bg-white/5">
                    {media.type === "image" ? (
                      <img src={media.previewUrl} alt="업로드" className="w-full h-full object-cover" />
                    ) : (
                      <video src={media.previewUrl} className="w-full h-full object-cover" controls />
                    )}
                    <button
                      onClick={() => handleRemoveMedia(media.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    {media.uploadedUrl && (
                      <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-green-500/80">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 업로드 버튼 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">미디어 업로드</h3>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Upload className="w-5 h-5 text-white/70" />
              <span className="text-sm font-medium text-white/70">이미지 또는 비디오 선택</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* 제출 버튼 */}
          <button
            onClick={handleSubmit}
            disabled={uploadedMedia.length === 0 || isUploading}
            className="w-full py-4 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-white/10 disabled:text-white/50 transition-colors font-semibold"
          >
            {isUploading ? "업로드 중..." : "퀘스트 완료 제출"}
          </button>
        </div>
      </div>
    </div>
  );
};
