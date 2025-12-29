export const TeamDetailSkeleton = () => {
  return (
    <div className="w-full h-full overflow-y-auto">
      {/* ProfileSection Skeleton */}
      <div className="relative h-[200px] flex flex-col">
        <div className="w-full h-full bg-gray-700 animate-pulse" />
        <div className="absolute top-25 left-10 size-20 rounded-full bg-gray-600 animate-pulse border-2 border-gray-500" />
      </div>

      <div className="flex flex-col gap-4 px-4">
        {/* Team Name Skeleton */}
        <div className="h-8 w-32 bg-gray-700 rounded animate-pulse mt-2" />

        {/* SummarySection Skeleton */}
        <div className="flex items-center gap-2 border-b border-border mb-4 h-15">
          <div className="flex flex-col gap-0.5 min-w-20 px-2 py-1 items-center">
            <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
            <div className="h-6 w-12 bg-gray-600 rounded animate-pulse" />
          </div>
          <div className="h-10 w-px bg-border" />
          <div className="flex flex-col gap-0.5 min-w-20 px-2 py-1 items-center">
            <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
            <div className="h-6 w-12 bg-gray-600 rounded animate-pulse" />
          </div>
          <div className="h-10 w-px bg-border" />
          <div className="flex flex-col gap-0.5 min-w-20 px-2 py-1 items-center">
            <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
            <div className="h-6 w-12 bg-gray-600 rounded animate-pulse" />
          </div>
        </div>

        {/* Squad List Skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-3 rounded-lg flex-shrink-0 w-[calc(33.333%-11px)]"
              >
                <div className="size-20 rounded-full bg-gray-600 animate-pulse border-2 border-gray-500" />
                <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Review List Skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
          <div className="flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-lg border border-gray-700 bg-gray-800"
              >
                <div className="h-4 w-32 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-8 bg-gray-600 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
