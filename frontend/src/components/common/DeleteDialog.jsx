
import { forwardRef, useImperativeHandle } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useImperativeDialog } from "../../hooks/useImperativeDialog";

// it allows deleteDailouge to accept a ref from its parrent
export const DeleteDialog = forwardRef(({ config }, ref) => {
  const {
    title,
    descriptionFormatter, // takes data and return text message
    mutationHook, // react query hook
    mutationCall,
    payloadFormatter,
  } = config || {};

  // Local dialog state via shared hook
  const {
    isOpen,
    payload: entityToDelete,
    openDialog: openDialogState,
    closeDialog: closeDialogState,
  } = useImperativeDialog(null);

  // React Query mutation - handles API call and cache invalidation automatically
  const deleteMutation = mutationHook ? mutationHook() : null;

  // Expose methods to parent via ref
  useImperativeHandle(
    ref,
    () => ({
      openDialog: (entity) => {
        if (!entity) return;
        // Format payload using provided formatter
        const formattedPayload = payloadFormatter
          ? payloadFormatter(entity)
          : entity;
        openDialogState(formattedPayload);
      },
      closeDialog: () => {
        if (!deleteMutation?.isPending) {
          closeDialogState();
        }
      },
    }),
    [
      openDialogState,
      closeDialogState,
      deleteMutation?.isPending,
      payloadFormatter,
    ]
  );

  const handleConfirmDelete = async () => {
    if (!entityToDelete?.id || !deleteMutation) return;

    try {
      // Call mutation with formatted params
      const mutationParams = mutationCall
        ? mutationCall(entityToDelete)
        : entityToDelete.id;

      await deleteMutation.mutateAsync(mutationParams);

      // Close dialog after successful deletion
      closeDialogState();
    } catch (error) {
      // Error handling is done by React Query and axios interceptor
    }
  };

  const handleCancel = () => {
    if (!deleteMutation?.isPending) {
      closeDialogState();
    }
  };

  // Format description using provided formatter
  const description = descriptionFormatter
    ? descriptionFormatter(entityToDelete)
    : "Are you sure you want to delete this item? This action cannot be undone.";

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        // Only handle close events from the dialog
        if (!open) {
          handleCancel();
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || "Delete Item"}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation?.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleConfirmDelete();
            }}
            disabled={deleteMutation?.isPending}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {deleteMutation?.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});


