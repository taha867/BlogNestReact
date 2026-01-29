import React from 'react';

export const PostInitializer = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 animate-pulse">
      {/* Header Skeleton */}
      <header className="mb-10 text-center md:text-left">
        <div className="h-10 md:h-12 bg-slate-200 rounded-lg w-3/4 mb-6 mx-auto md:mx-0"></div>
        <div className="h-10 md:h-12 bg-slate-200 rounded-lg w-1/2 mb-6 mx-auto md:mx-0"></div>

        {/* Author Info Skeleton */}
        <div className="flex items-center justify-center md:justify-start gap-4">
          <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-24"></div>
            <div className="h-3 bg-slate-200 rounded w-32"></div>
          </div>
        </div>
      </header>

      {/* Image Skeleton */}
      <div className="w-full aspect-[21/9] bg-slate-100 rounded-2xl mb-12 shadow-sm"></div>

      {/* Content Skeleton */}
      <div className="space-y-4 max-w-none mx-auto">
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-4/5"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
      </div>
    </div>
  );
};
