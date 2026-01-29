
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost, deletePost } from "../../services/postService";
import { homePostsKeys, userPostsKeys, postDetailKeys } from "../../utils/queryKeys";
import { POST_STATUS } from "../../utils/constants";

const { PUBLISHED } = POST_STATUS;

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (formData) => {
      return await createPost(formData);
    },
    onSuccess: async (response) => {
      const newPost = response.data;
      await queryClient.refetchQueries({ queryKey: userPostsKeys.all });
      if (newPost?.status === PUBLISHED) {
        await queryClient.refetchQueries({ queryKey: homePostsKeys.all });
      }
    },
  });
};


export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, formData, previousStatus }) => {
      const response = await updatePost(postId, formData);
      return { response, previousStatus };
    },
    onSuccess: async ({ response, previousStatus }, variables) => {
      const updatedPost = response.data;
      const { postId } = variables;


      // Invalidate post detail cache so the detail page shows updated data immediately
      await queryClient.invalidateQueries({ queryKey: postDetailKeys.detail(postId) });

      // FORCE refetch of user posts list (dashboard)

      await queryClient.refetchQueries({ queryKey: userPostsKeys.all });

      // Invalidate home posts if status changed to/from published
      const wasPublished = previousStatus === PUBLISHED;
      const isNowPublished = updatedPost?.status === PUBLISHED;
      if (wasPublished || isNowPublished) {

        await queryClient.refetchQueries({ queryKey: homePostsKeys.all });
      }

    },
  });
};


export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, wasPublished }) => {
      const response = await deletePost(postId);
      return { response, postId, wasPublished };
    },
    onSuccess: async ({ wasPublished }) => {

      await queryClient.refetchQueries({ queryKey: userPostsKeys.all });
      if (wasPublished) {
        await queryClient.refetchQueries({ queryKey: homePostsKeys.all });
      }
    },
  });
};
