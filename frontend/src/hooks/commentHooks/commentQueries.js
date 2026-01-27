import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getPostComments } from "../../services/commentService";
import { COMMENTS_PER_PAGE } from "../../utils/constants";

export const postCommentsKeys = {
  all: ["postComments"],
  lists: () => [...postCommentsKeys.all, "list"],
  list: (postId, page, limit) => [
    ...postCommentsKeys.lists(),
    postId,
    page,
    limit,
  ],
};


export const usePostComments = (postId, limit = COMMENTS_PER_PAGE) => {
  return useInfiniteQuery({ //STORES DATA AS ARRAY OF PAGES
    queryKey: postCommentsKeys.list(postId, "infinite", limit),
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getPostComments(postId, { page: pageParam, limit });
      return result || { comments: [], paginationOptions: {} };
    },
    getNextPageParam: (lastPage, allPages) => {
      const { paginationOptions } = lastPage;
      if (!paginationOptions || !paginationOptions.total) return undefined;
      
      const loadedCount = allPages.length * limit;
      return loadedCount < paginationOptions.total ? allPages.length + 1 : undefined;
    },
    enabled: !!postId,
    staleTime: 1000 * 30,
  });
};
