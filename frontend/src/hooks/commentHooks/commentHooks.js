import {
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
} from "./commentMutations";

export const useComments = () => {
  // React Query mutations
  const createCommentMutation = useCreateComment();
  const updateCommentMutation = useUpdateComment();
  const deleteCommentMutation = useDeleteComment();

  // Combine mutation loading states
  const isLoading =
    createCommentMutation.isPending ||
    updateCommentMutation.isPending ||
    deleteCommentMutation.isPending;

  return {
    // State
    isLoading,
    isCreating: createCommentMutation.isPending,
    isUpdating: updateCommentMutation.isPending,
    isDeleting: deleteCommentMutation.isPending,

    // Actions (using mutateAsync for Promise-based API compatibility)
    createComment: createCommentMutation.mutateAsync,
    updateComment: updateCommentMutation.mutateAsync,
    deleteComment: deleteCommentMutation.mutateAsync,
  };
};
