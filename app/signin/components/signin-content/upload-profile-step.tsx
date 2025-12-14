"use client";

import { UserRound } from "lucide-react";
import { Fragment, useRef, useState, useEffect } from "react";
import { match, P } from "ts-pattern";
import { AnimationContainer } from "./animation-container";
import { cn } from "@/lib/utils";
import { useSigninDataStore } from "@/signin/lib/stores/use-signin-data-store";
import { useUploadImage } from "@/hooks/use-upload-image";

export const UploadProfileStep = () => {
  const { data: signinData, setData: setSigninData } = useSigninDataStore();
  const { uploadImage, isUploading } = useUploadImage();
  const [previewUrl, setPreviewUrl] = useState<string>(signinData.imageUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // store의 imageUrl이 변경되면 로컬 state 업데이트
  useEffect(() => {
    if (signinData.imageUrl) {
      setPreviewUrl(signinData.imageUrl);
    }
  }, [signinData.imageUrl]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 크기 제한 (예: 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      alert("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    // 이미지 파일인지 확인
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 미리보기용 로컬 URL 생성
    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(localPreviewUrl);

    // userId가 없으면 로컬 미리보기만 표시
    if (!signinData.userId) {
      console.warn("userId가 없어 로컬 미리보기만 표시합니다.");
      return;
    }

    // S3에 이미지 업로드
    const uploadedImageUrl = await uploadImage(signinData.userId, file);

    if (uploadedImageUrl) {
      // 업로드 성공 시 로컬 미리보기 URL 해제
      URL.revokeObjectURL(localPreviewUrl);
      setPreviewUrl(uploadedImageUrl);
      // store에도 저장
      setSigninData({ imageUrl: uploadedImageUrl });
    } else {
      // 업로드 실패 시 로컬 미리보기 유지
      console.error("이미지 업로드에 실패했습니다.");
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <AnimationContainer className="flex flex-col items-center gap-8 w-full px-4 h-full justify-center">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-bold text-white">프로필 사진을 설정해주세요</h1>
        <p className="text-white/70 text-sm leading-relaxed">
          경기장에서 다른 사람들이 당신을 알아볼 수 있도록
          <br />
          자신을 잘 나타내는 사진을 올려주세요
        </p>
      </div>
      <div className="relative size-fit">
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        <div
          className={cn(
            "size-40 rounded-full border-2 border-dashed border-white/30 bg-white/5 cursor-pointer hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-3 relative",
            previewUrl && "border-solid",
            isUploading && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleClick}
        >
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full z-10">
              <div className="w-8 h-8 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin" />
            </div>
          )}
          {match(previewUrl)
            .with(P.string.minLength(1), (url) => (
              <img src={url} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ))
            .otherwise(() => (
              <Fragment>
                <div className="relative">
                  <UserRound className="size-12 text-white/60" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">+</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-white font-medium">사진 업로드</p>
                </div>
              </Fragment>
            ))}
        </div>
      </div>
    </AnimationContainer>
  );
};
