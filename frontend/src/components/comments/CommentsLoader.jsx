import { Loader2, MessageSquare } from "lucide-react";

export const CommentsLoader = () => {
  return (
    <div className="py-12 flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full blur-sm animate-pulse" />
        <div className="relative bg-white p-4 rounded-full shadow-sm ring-1 ring-slate-100">
          <MessageSquare className="w-8 h-8 text-blue-500 animate-bounce" />
        </div>
      </div>
      
      <div className="text-center space-y-1">
        <h4 className="text-lg font-bold text-slate-900 flex items-center justify-center gap-2">
          Gathering Discussions
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
        </h4>
        <p className="text-sm text-slate-500 font-medium tracking-wide">
          Connecting to our community servers...
        </p>
      </div>

      {/* Shimmering bar to show movement */}
      <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="w-1/2 h-full bg-blue-500 rounded-full animate-[progress_1.5s_infinite]" />
      </div>
    </div>
  );
};
