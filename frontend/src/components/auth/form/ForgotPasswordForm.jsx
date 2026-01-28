import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { FormField } from "../../custom";
import { forgotPasswordSchema } from "../../../validations/authSchemas";
import { useAuth } from "../../../hooks/authHooks/authHooks";
import { createSubmitHandlerWithToast } from "../../../utils/formSubmitWithToast";

export const ForgotPasswordForm = () => {
  const { requestPasswordReset, isLoading } = useAuth();

  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    await requestPasswordReset({ email: data.email });
    methods.reset();
  };

  const handleSubmit = createSubmitHandlerWithToast(methods, onSubmit);

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={methods.control}
          name="email"
          type="email"
          label="Email"
          showIcon
          className="h-11"
        />

        <Button
          type="submit"
          variant="success"
          className="w-full h-11 font-medium"
          disabled={isLoading || !methods.formState.isDirty}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>
    </Form>
  );
};
