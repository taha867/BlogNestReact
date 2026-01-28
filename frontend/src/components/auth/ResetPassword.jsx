import { ResetPasswordForm } from "./form/ResetPasswordForm.jsx";
import { AuthLayout } from "./AuthLayout";

export const ResetPassword = () => {
  return (
    <AuthLayout
      title="Set new password"
      subtitle="Enter your new password below"
    >
      <div className="space-y-4">
        <ResetPasswordForm />
      </div>
    </AuthLayout>
  );
};
