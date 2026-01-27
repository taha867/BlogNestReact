import { useRef } from "react";
import {PostList} from "../components/posts/PostList";
import {EditPostForm} from "../components/posts/form/EditPostForm";
import {DeletePostDialog} from "../components/posts/DeletePostDialog";


export const DashboardContainer = () => {

  
  const editDialogRef = useRef(null);
  const deleteDialogRef = useRef(null);

  

  const handleEditPost = (post) => {
    editDialogRef.current?.openDialog(post);
  };

  const handleDeletePost = (post) => {
    deleteDialogRef.current?.openDialog(post);
  };

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="space-y-6">
        {/* Posts List */}
        <div>
          <PostList onEditPost={handleEditPost} onDeletePost={handleDeletePost} />
        </div>

        {/* Local Dialog Component - Each manages its own state */}
        <EditPostForm ref={editDialogRef} />
        <DeletePostDialog ref={deleteDialogRef} />
      </div>
    </div>
  );
};
