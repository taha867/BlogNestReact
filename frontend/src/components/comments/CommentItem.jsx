import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentForm } from "./CommentForm";
import { CommentActionsMenu } from "./CommentActionsMenu";
import { DeleteCommentDialog } from "./DeleteCommentDialog";
import { useAuth } from "../../hooks/authHooks/authHooks";
import { getAuthorInfo } from "../../utils/postUtils";
import { AuthorAvatar } from "../common/AuthorAvatar";
import { useUpdateComment } from "../../hooks/commentHooks/commentMutations";

export const CommentItem = ({ comment, postId, onReplySuccess }) => {
  const { isAuthenticated, user } = useAuth();
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const deleteDialogRef = useRef(null);

  const commentRef = useRef(comment);

  // Keep ref in sync with comment prop
  useEffect(() => {
    commentRef.current = comment;
  }, [comment]);

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
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
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
    if (onReplySuccess) {
      onReplySuccess();
    }
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
      if (onReplySuccess) {
        onReplySuccess();
      }
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
    <div className="border-b border-gray-100 pb-4 last:border-b-0">
      {/* Main Comment */}
      <div className="flex gap-3">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <AuthorAvatar author={author} size="md" />
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{authorName}</span>
              <span className="text-xs text-gray-500">{timeAgo}</span>
            </div>
            {/* Comment Actions Menu - Only show for comment author */}
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
            <p className="text-gray-700 text-sm whitespace-pre-wrap break-all">
              {body}
            </p>
          )}

          {/* Reply Button - Only show for top-level comments and when not editing */}
          {isAuthenticated && !isEditing && !parentId && (
            <div className="mt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleReplyForm}
                className="h-7 text-xs"
              >
                Reply
              </Button>
            </div>
          )}

          {/* Reply Form */}
          {showReplyForm && isAuthenticated && (
            <div className="mt-3 pl-4 border-l-2 border-gray-200">
              <CommentForm
                postId={postId}
                parentId={id}
                onSuccess={handleReplySuccess}
                placeholder="Write a reply..."
              />
            </div>
          )}

          {/* Replies Section */}
          {hasReplies && (
            <div className="mt-4">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleReplies}
                className="h-7 text-xs text-gray-600 hover:text-gray-900"
              >
                {showReplies ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Hide replies ({commentReplies.length})
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Show replies ({commentReplies.length})
                  </>
                )}
              </Button>

              {showReplies && (
                <div className="mt-3 pl-4 border-l-2 border-gray-200 space-y-4">
                  {commentReplies.map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      postId={postId}
                      onReplySuccess={onReplySuccess}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Comment Dialog */}
      <DeleteCommentDialog ref={deleteDialogRef} />
    </div>
  );
};
