"use client";

import { FeedItem, type FeedItemProps } from "./feed-item";

interface FeedListProps {
  items: FeedItemProps[];
}

export function FeedList({ items }: FeedListProps) {
  return (
    <div className="w-full max-w-[614px] mx-auto">
      {items.map((item) => (
        <FeedItem key={item.id} {...item} />
      ))}
    </div>
  );
}
