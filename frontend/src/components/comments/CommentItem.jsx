import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentForm } from "./CommentForm";
import { CommentActionsMenu } from "./CommentActionsMenu";
import { DeleteCommentDialog } from "./DeleteCommentDialog";
import { useAuth } from "../../hooks/authHooks/authHooks";
import { getAuthorInfo } from "../../utils/postUtils";
import { AuthorAvatar } from "../common/AuthorAvatar";
import { useUpdateComment } from "../../hooks/commentHooks/commentMutations";

export const CommentItem = ({ comment, postId }) => {
  const { isAuthenticated, user } = useAuth();
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [, setCurrentTime] = useState(Date.now());
  const deleteDialogRef = useRef(null);

  const commentRef = useRef(comment);

  // Keep ref in sync with comment prop
  useEffect(() => {
    commentRef.current = comment;
  }, [comment]);

  // Update timestamp every minute to keep "time ago" current
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const {
    author,
    createdAt,
    body,
    id,
    parentId,
    replies: commentReplies = [],
  } = comment || {};

  const { name: authorName } = getAuthorInfo(author);
  const hasReplies = commentReplies.length > 0;
  const isCommentAuthor = user?.id === author?.id;

  const timeAgo = createdAt 
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: enUS })
    : "";

  // React Query mutation for updating comment
  const updateCommentMutation = useUpdateComment();

  const toggleReplies = () => {
    setShowReplies((prev) => !prev);
  };

  const toggleReplyForm = () => {
    setShowReplyForm((prev) => !prev);
  };

  const handleReplySuccess = () => {
    setShowReplyForm(false);
    setShowReplies(true); // Show replies after successful reply
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdate = async (updatedBody) => {
    if (!id) return;

    try {
      await updateCommentMutation.mutateAsync({
        commentId: id,
        body: updatedBody,
      });
      setIsEditing(false);
      // Call onReplySuccess to refresh comments if provided
      setIsEditing(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = () => {
    if (deleteDialogRef.current && commentRef.current) {
      deleteDialogRef.current.openDialog(commentRef.current);
    }
  };

  const isPending = updateCommentMutation.isPending;

  return (
    <div className="relative group">
      {/* Thread line for replies - only if it has parentId or has replies */}
      {parentId && (
        <div className="absolute -left-6 top-0 bottom-0 w-px bg-slate-200 group-last:bottom-auto group-last:h-8" />
      )}

      <div className="flex gap-4">
        {/* Author Avatar with a small decorative ring on hover */}
        <div className="flex-shrink-0 relative">
          <AuthorAvatar author={author} size="md" className="ring-2 ring-white" />
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">
                  {authorName}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-xs font-medium text-slate-500">{timeAgo}</span>
              </div>
              
              {/* Comment Actions Menu */}
              {isAuthenticated && isCommentAuthor && !isEditing && (
                <CommentActionsMenu
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  disabled={isPending}
                />
              )}
            </div>

            {/* Edit Mode or View Mode */}
            {isEditing ? (
              <div className="mt-2">
                <CommentForm
                  initialValue={body}
                  onUpdate={handleUpdate}
                  onCancel={handleCancelEdit}
                  placeholder="Edit your comment..."
                />
              </div>
            ) : (
              <p className="text-slate-700 text-[15px] leading-relaxed whitespace-pre-wrap break-all">
                {body}
              </p>
            )}

            {/* Actions: Reply and Show/Hide Replies */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-50">
              {isAuthenticated && !isEditing && !parentId && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={toggleReplyForm}
                  className={`h-8 text-xs font-bold transition-all duration-200 ${
                    showReplyForm 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {showReplyForm ? "Cancel Reply" : "Reply"}
                </Button>
              )}

              {hasReplies && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={toggleReplies}
                  className="h-8 text-xs font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  {showReplies ? (
                    <span className="flex items-center gap-1.5">
                      <ChevronUp className="h-3.5 w-3.5" />
                      Hide {commentReplies.length} {commentReplies.length === 1 ? "reply" : "replies"}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <ChevronDown className="h-3.5 w-3.5" />
                      View {commentReplies.length} {commentReplies.length === 1 ? "reply" : "replies"}
                    </span>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Reply Form Overlay */}
          {showReplyForm && isAuthenticated && (
            <div className="mt-4 pl-6 relative">
              <div className="absolute left-0 top-0 bottom-4 w-px bg-slate-200" />
              <div className="absolute left-0 top-0 w-4 h-px bg-slate-200" />
              <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 ring-4 ring-slate-50/50">
                <CommentForm
                  postId={postId}
                  parentId={id}
                  onSuccess={handleReplySuccess}
                  placeholder={`Reply to ${authorName}...`}
                />
              </div>
            </div>
          )}

          {/* Replies Section - Threaded */}
          {showReplies && hasReplies && (
            <div className="mt-4 pl-6 space-y-6 relative">
              <div className="absolute left-0 top-0 bottom-6 w-px bg-slate-200" />
              {commentReplies.map((reply) => (
                <div key={reply.id} className="relative">
                  <div className="absolute -left-6 top-5 w-6 h-px bg-slate-200" />
                  <CommentItem
                    comment={reply}
                    postId={postId}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Comment Dialog */}
      <DeleteCommentDialog ref={deleteDialogRef} />
    </div>
  );
};
