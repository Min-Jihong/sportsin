import { useState } from "react";
import { sportsinApi } from "@/lib/utils/api";
import { ENDPOINTS } from "@/constants/end-points";

export interface PreSignedUrl {
  preSignedUrl: string;
  imageUrl: string;
}

interface UploadImageParams {
  channelId: string;
  imagePath: string;
  method?: string;
}

export const useUploadImage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getPreSignedUrl = async ({
    channelId,
    imagePath,
    method = "PUT",
  }: UploadImageParams): Promise<PreSignedUrl | null> => {
    try {
      const response = await sportsinApi.get<PreSignedUrl>(ENDPOINTS.v1.urls.channels.images(channelId), {
        params: {
          imagePath,
          method,
        },
      });
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to get pre-signed URL");
      setError(error);
      console.error("Error getting pre-signed URL:", error);
      return null;
    }
  };

  const uploadImageToS3 = async (preSignedUrl: string, file: File): Promise<boolean> => {
    try {
      const response = await fetch(preSignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to upload image to S3");
      setError(error);
      console.error("Error uploading image to S3:", error);
      return false;
    }
  };

  const uploadImage = async (channelId: string, file: File): Promise<string | null> => {
    setIsUploading(true);
    setError(null);

    try {
      // 파일명 생성 (타임스탬프 + 원본 파일명)
      const timestamp = Date.now();
      const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const imagePath = `profiles/${channelId}/${timestamp}_${fileName}`;

      // 1. Pre-signed URL 받기
      const preSignedUrlData = await getPreSignedUrl({
        channelId,
        imagePath,
        method: "PUT",
      });

      if (!preSignedUrlData) {
        throw new Error("Failed to get pre-signed URL");
      }

      // 2. S3에 이미지 업로드
      const uploadSuccess = await uploadImageToS3(preSignedUrlData.preSignedUrl, file);

      if (!uploadSuccess) {
        throw new Error("Failed to upload image to S3");
      }

      // 3. 업로드된 이미지 URL 반환
      return preSignedUrlData.imageUrl;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to upload image");
      setError(error);
      console.error("Error uploading image:", error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    error,
  };
};
