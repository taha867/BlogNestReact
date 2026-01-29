import React from 'react';

export const CommentInitializer = () => {
  return (
    <div className="space-y-10 max-w-4xl mx-auto py-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 border-b border-slate-100 pb-6">
        <div className="h-8 bg-slate-200 rounded-lg w-48"></div>
        <div className="h-4 bg-slate-100 rounded w-64 mt-2"></div>
      </div>

      {/* Comment List Skeleton */}
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="h-10 w-10 bg-slate-200 rounded-full shrink-0"></div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-slate-200 rounded w-32"></div>
                <div className="h-3 bg-slate-100 rounded w-24"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3.5 bg-slate-100 rounded w-full"></div>
                <div className="h-3.5 bg-slate-100 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
