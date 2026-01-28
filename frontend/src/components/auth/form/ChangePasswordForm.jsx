import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { FormField } from "../../custom";
import { changePasswordSchema } from "../../../validations/userSchemas";
import { useAuth } from "../../../hooks/authHooks/authHooks";
import { createSubmitHandlerWithToast } from "../../../utils/formSubmitWithToast";

export const ChangePasswordForm = () => {
  const { changePassword, isLoading } = useAuth();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { newPassword } = data;
    await changePassword(newPassword);
    navigate("/dashboard");

  };

  const handleSubmit = createSubmitHandlerWithToast(methods, onSubmit);

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <FormField
          control={methods.control}
          name="newPassword"
          type="password"
          label="Type new password"
          placeholder="Enter your new password"
          autoComplete="new-password"
          showToggle
          className="h-11"
        />

        <FormField
          control={methods.control}
          name="confirmPassword"
          type="password"
          label="Type new password again"
          placeholder="Re-enter your new password"
          autoComplete="new-password"
          showToggle
          className="h-11"
        />

        <Button
          type="submit"
          className="w-full h-11 font-medium bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md transition-all mt-4"
          disabled={isLoading || !methods.formState.isDirty}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  );
};

