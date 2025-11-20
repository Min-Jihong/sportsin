"use client";

import { UserRound } from "lucide-react";
import { Fragment, useRef, useState } from "react";
import { match, P } from "ts-pattern";
import { AnimationContainer } from "./animation-container";
import { cn } from "@/lib/utils";

export const UploadProfileStep = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
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
            "size-40 rounded-full border-2 border-dashed border-white/30 bg-white/5 cursor-pointer hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-3",
            imageUrl && "border-solid"
          )}
          onClick={handleClick}
        >
          {match(imageUrl)
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
