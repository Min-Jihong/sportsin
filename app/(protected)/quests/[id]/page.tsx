"use client";

import { use } from "react";
import { QuestDetailPage } from "../../home/components/quest-detail-page";

export default function QuestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <QuestDetailPage questId={id} />;
}
