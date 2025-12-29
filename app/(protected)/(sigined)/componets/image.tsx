import { cn } from "@/lib/utils";

interface ImageProps {
  imageUrl?: string;
  className?: string;
}

const DefaultPlayerImage = "/default-player-image.svg";
const DefaultBackgroundImage = "/default-background-image.svg";

export const ProfileImage = ({ imageUrl, className }: ImageProps) => {
  return (
    <img
      src={imageUrl || DefaultPlayerImage}
      alt="player"
      className={cn("w-24 h-24 rounded-full border-black border-4 bg-gray-800 object-cover", className)}
      onError={(e) => {
        e.currentTarget.src = DefaultPlayerImage;
      }}
    />
  );
};

export const BackgroundImage = ({ imageUrl, className }: ImageProps) => {
  return (
    <img
      src={imageUrl || DefaultBackgroundImage}
      alt="background"
      className={cn("w-full h-40 bg-gray-800 object-cover", className)}
      onError={(e) => {
        e.currentTarget.src = DefaultBackgroundImage;
      }}
    />
  );
};
