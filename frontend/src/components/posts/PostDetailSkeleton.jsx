import { ImageIcon } from "lucide-react";

export const PostDetailSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 animate-pulse">
      {/* Header Section */}
      <header className="mb-10 text-center md:text-left">
        {/* Title Skeleton */}
        <div className="h-10 md:h-12 bg-slate-200 rounded-lg w-3/4 mb-4 mx-auto md:mx-0"></div>
        <div className="h-10 md:h-12 bg-slate-200 rounded-lg w-1/2 mb-8 mx-auto md:mx-0"></div>

        {/* Author & Meta Info Skeleton */}
        <div className="flex items-center justify-center md:justify-start gap-4">
          <div className="h-12 w-12 rounded-full bg-slate-200 ring-2 ring-white shadow-sm"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-24"></div>
            <div className="h-3 bg-slate-100 rounded w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Image Skeleton */}
      <div className="w-full aspect-[21/9] bg-slate-50 rounded-2xl mb-12 flex items-center justify-center border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        <ImageIcon className="w-16 h-16 text-slate-100" />
      </div>

      {/* Post Body Skeleton */}
      <div className="space-y-4 max-w-none mx-auto">
        <div className="h-4 bg-slate-100 rounded w-full"></div>
        <div className="h-4 bg-slate-100 rounded w-full"></div>
        <div className="h-4 bg-slate-100 rounded w-5/6"></div>
        <div className="h-4 bg-slate-100 rounded w-full"></div>
        <div className="h-4 bg-slate-100 rounded w-4/5"></div>
        
        <div className="h-8 w-full"></div> {/* Spacer */}
        
        <div className="h-4 bg-slate-100 rounded w-full"></div>
        <div className="h-4 bg-slate-100 rounded w-full"></div>
        <div className="h-4 bg-slate-100 rounded w-3/4"></div>
      </div>
    </div>
  );
};
