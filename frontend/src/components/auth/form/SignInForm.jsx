import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { FormField } from "../../custom";
import { signinSchema } from "../../../validations/authSchemas";
import { useAuth } from "../../../hooks/authHooks/authHooks";
import { createSubmitHandlerWithToast } from "../../../utils/formSubmitWithToast";

export const SignInForm = () => {
  const { signin, isLoading } = useAuth();
  const navigate = useNavigate();

  const method = useForm({
    resolver: yupResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await signin(data);
    navigate("/dashboard");
  };

  const handleSubmit = createSubmitHandlerWithToast(method, onSubmit);

  return (
    <Form {...method}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <FormField
          control={method.control}
          name="email"
          type="email"
          label="Email"
          className="h-11"
        />

        <FormField
          control={method.control}
          name="password"
          type="password"
          label="Password"
          showToggle
          showForgotLink
          className="h-11"
        />

        <Button
          type="submit"
          variant="success"
          className="w-full h-11 font-medium"
          disabled={isLoading || !method.formState.isDirty}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in with Email"
          )}
        </Button>
      </form>
    </Form>
  );
};
