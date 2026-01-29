import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormSelect, FormFileInput } from "../../custom";
import { postSchema } from "../../../validations/postSchemas";
import { useCreatePost } from "../../../hooks/postHooks/postMutations";
import { POST_STATUS } from "../../../utils/constants";
import { createSubmitHandlerWithToast } from "../../../utils/formSubmitWithToast";

export const CreatePostForm = ({ onPostCreated }) => {
  const [isFormPending, startFormTransition] = useTransition();

  const createPostMutation = useCreatePost();

  const methods = useForm({
    resolver: yupResolver(postSchema),
    defaultValues: {
      title: "",
      body: "",
      status: POST_STATUS.DRAFT,
      image: null, // File object or null
    },
    mode: "onChange", //validates fields as the user types
  });

  const onSubmit = async (data) => {
    // Create FormData for multipart/form-data
    const { title, body, status } = data;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("status", status);

    // Append file if selected
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    await createPostMutation.mutateAsync(formData);

    startFormTransition(() => {
      methods.reset();
      // Switch to list tab after successful creation
      onPostCreated?.(status);
    });
  };

  const handleSubmit = createSubmitHandlerWithToast(methods, onSubmit);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...methods}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              control={methods.control}
              name="title"
              type="text"
              label="Title"
              placeholder="Enter post title"
            />

            <FormField
              control={methods.control}
              name="body"
              type="textarea"
              label="Content"
              placeholder="Write your post content here..."
              rows={8}
              className="min-h-[200px]"
            />

            <FormSelect
              control={methods.control}
              name="status"
              label="Status"
              placeholder="Select post status"
              options={[
                { value: POST_STATUS.DRAFT, label: "Draft" },
                { value: POST_STATUS.PUBLISHED, label: "Published" },
              ]}
            />

            <FormFileInput
              control={methods.control}
              name="image"
              label="Post Image (Optional)"
              maxSizeMB={5}
            />

            <Button
              type="submit"
              variant="success"
              disabled={
                createPostMutation.isPending ||
                isFormPending ||
                !methods.formState.isDirty
              }
              className="w-full"
            >
              {createPostMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : isFormPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
