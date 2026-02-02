import { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { FormField } from "../custom";
import { useComments } from "../../hooks/commentHooks/commentHooks";
import { createSubmitHandlerWithToast } from "../../utils/formSubmitWithToast";
import { commentSchema } from "../../validations/commentSchemas";

export const CommentForm = ({
  postId,
  parentId = null,
  onSuccess,
  placeholder = "Add comment...",
  initialValue = null,
  onUpdate = null,
  onCancel = null,
}) => {
  const [isUpdatePending, startTransition] = useTransition();
  const { createComment, isCreating } = useComments();

  const isEditMode = !!initialValue && !!onUpdate;

  const method = useForm({
    resolver: yupResolver(commentSchema),
    defaultValues: {
      body: initialValue || "",
    },
    mode: "onChange",
  });

  const { reset: formReset, handleSubmit: formHandleSubmit } = method;

  // Update form when initialValue changes (for edit mode)
  // Use formReset instead of form object to avoid dependency on entire form
  useEffect(() => {
    if (isEditMode && initialValue !== null) {
      formReset({ body: initialValue });
    }
  }, [isEditMode, initialValue, formReset]);

  const onSubmit = async (data) => {
    if (initialValue && onUpdate) {
      // Use startTransition for handling the async update state automatically
      startTransition(async () => {
        await onUpdate(data.body);
      });
      return;
    }

    // Create mode: create new comment
    if (!postId && !parentId) return;
    await createComment({
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
  };

  // Combine transition pending state with mutation pending state
  const isPending = isUpdatePending || isCreating;

  // Determine button text based on state
  const buttonText = isPending
    ? isEditMode
      ? "Saving..."
      : "Posting..."
    : isEditMode
      ? "Save"
      : parentId
        ? "Reply"
        : "Post";

  // Create handleSubmit - formHandleSubmit is stable from react-hook-form
  const handleSubmit = isEditMode
    ? formHandleSubmit(onSubmit) // Edit mode: no toast, parent handles it
    : createSubmitHandlerWithToast(method, onSubmit); // Create mode: use toast

  return (
    <Form {...method}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Replying to indicator */}
        {parentId && (
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
            <div className="w-1 h-1 rounded-full bg-slate-400" />
            <span>Replying to {placeholder.replace("Reply to ", "")}</span>
          </div>
        )}

        <div className="relative group">
          <FormField
            control={method.control}
            name="body"
            type="textarea"
            placeholder={placeholder}
            rows={parentId ? 2 : 3}
            disabled={isPending}
            className="w-full resize-none bg-white border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 rounded-xl"
          />

          <div className="flex justify-end items-center gap-3 mt-3">
            {isEditMode && onCancel && (
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                disabled={isPending}
                size="sm"
                className="text-slate-500 hover:text-slate-700 font-medium"
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="success"
              disabled={isPending || !method.formState.isDirty}
              size="sm"
              className={`rounded-full px-6 font-semibold shadow-sm transition-all duration-200 bg-green-600 text-white hover:bg-green-700 ${
                !method.formState.isDirty
                  ? "opacity-50"
                  : "hover:shadow-md active:scale-95"
              }`}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditMode ? "Saving..." : "Posting..."}
                </>
              ) : (
                buttonText
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
