import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { FormField } from "../../custom";
import { signupSchema } from "../../../validations/authSchemas";
import { useAuth } from "../../../hooks/authHooks/authHooks";
import { createSubmitHandlerWithToast } from "../../../utils/formSubmitWithToast";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();

  const methods = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
      await signup(data);
      navigate("/signin");
  };

  const handleSubmit = createSubmitHandlerWithToast(methods, onSubmit);

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <FormField
          control={methods.control}
          name="name"
          type="text"
          label="Full name"
          placeholder="Alex Smith"
          showIcon
          className="h-11"
        />

        <FormField
          control={methods.control}
          name="email"
          type="email"
          label="Email"
          showIcon
          className="h-11"
        />

        <FormField
          control={methods.control}
          name="phone"
          type="tel"
          label="Phone"
          showIcon
          className="h-11"
        />

        <FormField
          control={methods.control}
          name="password"
          type="password"
          label="Password"
          placeholder="Create a password"
          showToggle
          autoComplete="new-password"
          className="h-11"
        />

        <FormField
          control={methods.control}
          name="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="Re-enter password"
          showToggle
          autoComplete="new-password"
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
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </Form>
  );
};
