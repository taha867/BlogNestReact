import { useState, useCallback, useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormField } from "../custom";
import { useCreateComment } from "../../hooks/commentHooks/commentMutations";
import { createSubmitHandlerWithToast } from "../../utils/formSubmitWithToast";
import { commentSchema } from "../../validations/commentSchemas";

const CommentForm = ({
  postId,
  parentId = null,
  onSuccess,
  placeholder = "Add comment...",
  // Edit mode props
  initialValue = null,
  onUpdate = null,
  onCancel = null,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createCommentMutation = useCreateComment();

  const isEditMode = !!initialValue && !!onUpdate;

  const form = useForm({
    resolver: yupResolver(commentSchema),
    defaultValues: {
      body: initialValue || "",
    },
    mode: "onChange",
  });

  
  const { reset: formReset, handleSubmit: formHandleSubmit } = form;

  // Update form when initialValue changes (for edit mode)
  // Use formReset instead of form object to avoid dependency on entire form
  useEffect(() => {
    if (isEditMode && initialValue !== null) {
      formReset({ body: initialValue });
    }
  }, [initialValue, formReset]);

  const onSubmit = useCallback(
    async (data) => {
      
      if (initialValue && onUpdate) {
        setIsSubmitting(true);
        try {
          await onUpdate(data.body);
          
        } catch (error) {
        
        } finally {
          setIsSubmitting(false);
        }
        return;
      }

      // Create mode: create new comment
      if (!postId && !parentId) return;

      setIsSubmitting(true);
      try {
        await createCommentMutation.mutateAsync({
          body: data.body,
          postId: parentId ? undefined : postId,
          parentId: parentId || undefined,
        });

        // Reset form on success using stable formReset reference
        formReset({ body: "" });

        // Call optional success callback
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      initialValue, // Used to determine edit mode
      onUpdate,
      postId,
      parentId,
      createCommentMutation,
      formReset,
      onSuccess,
    ]
  );

  
  const isPending = isSubmitting || createCommentMutation.isPending;
  
  // Determine button text based on state
  const buttonText = isPending
    ? (isEditMode ? "Saving..." : "Posting...")
    : (isEditMode ? "Save" : (parentId ? "Reply" : "Post"));

  // Create handleSubmit - formHandleSubmit is stable from react-hook-form
  const handleSubmit = isEditMode
    ? formHandleSubmit(onSubmit) // Edit mode: no toast, parent handles it
    : createSubmitHandlerWithToast(form, onSubmit); // Create mode: use toast

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <FormField
          control={form.control}
          name="body"
          type="textarea"
          placeholder={placeholder}
          rows={3}
          disabled={isPending}
        />
        <div className="flex justify-end gap-2">
          {isEditMode && onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
              size="sm"
            >
              Cancel
            </Button>
          )}
          <Button type="submit" variant="success" disabled={isPending} size="sm">
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};


export default memo(CommentForm);
