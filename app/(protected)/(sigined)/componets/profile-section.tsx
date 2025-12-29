import { BackgroundImage, ProfileImage } from "./image";

export const ProfileSection = ({
  backgroundImageUrl,
  playerImageUrl,
}: {
  backgroundImageUrl?: string;
  playerImageUrl?: string;
}) => {
  return (
    <div className="relative h-[200px] flex flex-col">
      <BackgroundImage imageUrl={backgroundImageUrl} />
      <ProfileImage imageUrl={playerImageUrl} className="absolute top-25 left-10" />
    </div>
  );
};
