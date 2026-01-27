import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { FormField } from "../../custom";
import { resetPasswordSchema } from "../../../validations/authSchemas";
import { useAuth } from "../../../hooks/authHooks/authHooks";
import { createSubmitHandlerWithToast } from "../../../utils/formSubmitWithToast";
import { useSearchParams } from "react-router-dom";

export const ResetPasswordForm = () => {
  const { resetUserPassword, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const method = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    // Pass as object since React Query's mutateAsync only passes first argument
    const { newPassword, confirmPassword } = data;
    await resetUserPassword({
      token,
      newPassword,
      confirmPassword,
    });

    // Redirect to signin after successful reset
    setTimeout(() => {
      navigate("/signin");
    }, 1500);
  };

  const handleSubmit = createSubmitHandlerWithToast(method, onSubmit);

  return (
    <Form {...method}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <FormField
          control={method.control}
          name="newPassword"
          type="password"
          label="New Password"
          placeholder="Enter your new password"
          autoComplete="new-password"
          className="h-11"
        />

        <FormField
          control={method.control}
          name="confirmPassword"
          type="password"
          label="Confirm New Password"
          placeholder="Confirm your new password"
          autoComplete="new-password"
          className="h-11"
        />

        <Button
          type="submit"
          variant="success"
          disabled={isLoading || !method.formState.isDirty}
          className="w-full h-11 font-medium"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>

        <div className="text-center pt-2">
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            onClick={() => navigate("/signin")}
          >
            Back to Sign In
          </button>
        </div>
      </form>
    </Form>
  );
};
