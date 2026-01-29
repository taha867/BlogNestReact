import { useParams } from "react-router-dom";
import { Suspense } from "react";
import { PostDetailContent } from "../components/posts/PostDetailContent";
import { CommentSection } from "../components/comments/CommentSection";
import { PostInitializer } from "../components/posts/PostInitializer";
import { CommentInitializer } from "../components/comments/CommentInitializer";
import { postIdParamSchema } from "../validations/postSchemas";


export const PostContainer = () => {
  const { id } = useParams();

  let postId;
  try {
    postId = postIdParamSchema.validateSync(id);
    // postId is now already a number (transformed by the schema)
  } catch (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center py-12">
          <p className="text-gray-500">Invalid post ID.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Post Content */}
        <Suspense fallback={<PostInitializer />}>
          <PostDetailContent postId={postId} />
        </Suspense>
  

        {/* Comments Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
       <Suspense fallback={<CommentInitializer />}>
            <CommentSection postId={postId} />
       </Suspense>
      
        </div>
      </div>
    </div>
  );
};
