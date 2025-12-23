"use client";

import { use } from "react";
import { ProfilePage } from "../../home/components/profile-page";

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <ProfilePage userId={id} isOwnProfile={false} />;
}

