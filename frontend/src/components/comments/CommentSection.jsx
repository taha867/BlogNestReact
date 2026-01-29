import { useTransition } from "react";
import { Link } from "react-router-dom";
import { usePostComments } from "../../hooks/commentHooks/commentQueries";
import { useAuth } from "../../hooks/authHooks/authHooks";
import {CommentItem} from "./CommentItem";
import {CommentForm} from "./CommentForm";
import { Button} from "@/components/ui/button";
import { CommentInitializer } from "./CommentInitializer";
import { Loader2 } from "lucide-react";

export const CommentSection = ({ postId }) => {
  const { isAuthenticated } = useAuth();
  const [isPending, startTransition] = useTransition();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = usePostComments(postId);

  // Flatten nested pages into a single array of comments
  const allComments = data?.pages.flatMap((page) => page.comments || []) || [];

  // Get total comments count from the first page metadata with fallback
  const firstPagePagination = data?.pages[0]?.paginationOptions;
  const apiTotal = firstPagePagination?.total;
  
  let totalComments;
  if (apiTotal !== undefined && apiTotal !== null && apiTotal > 0) {
    totalComments = apiTotal;
  } else {
    // If API says 0 or is missing, but we actually have comments, use the loaded count
    totalComments = allComments.length;
  }

  const commentsText = `${totalComments} ${totalComments === 1 ? "comment" : "comments"}`;

  const handleLoadMore = () => {
    startTransition(() => {
      fetchNextPage();
    });
  };


  if (isLoading) {
    return <CommentInitializer />;
  }

  return (
    <div className="space-y-10 max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-slate-100 pb-6">
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Comments <span className="text-blue-600 ml-1 font-medium text-lg">({totalComments})</span>
        </h3>
        {!isAuthenticated && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Join the conversation.</span>
            <Link
              to="/signin"
              className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-all"
            >
              Sign in to share your thoughts
            </Link>
          </div>
        )}
      </div>

      {/* Form */}
      {isAuthenticated && (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
          <div className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <CommentForm
              postId={postId}
              placeholder="What are your thoughts on this?"
            />
          </div>
        </div>
      )}

      {/* List */}
      {allComments.length === 0 ? (
        <div className="text-center py-20 px-6 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 ring-1 ring-slate-100">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-xl font-bold text-slate-900 mb-2">No comments yet</p>
          <p className="text-slate-500 max-w-xs mx-auto">
            Be the first to break the silence! Start the discussion now.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {allComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
            />
          ))}
        </div>
      )}

      {/* Actions */}
      {hasNextPage && (
        <div className="flex justify-center pt-10">
          <Button
            type="button"
            variant="outline"
            onClick={handleLoadMore}
            disabled={isFetchingNextPage || isPending}
            className="rounded-full px-10 py-6 font-bold text-slate-700 border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95"
          >
            {isFetchingNextPage || isPending ? (
              <span className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading discussions...
              </span>
            ) : (
              "Load More Comments"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

