import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import toast from "react-hot-toast";
import { TOAST_MESSAGES } from "../../utils/constants";
import { SignUpForm } from "./form/SignUpForm.jsx";
import { AuthLayout } from "./AuthLayout";

export const SignUp = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join our community of writers and readers"
    >
      <div className="space-y-3">
        <SignUpForm />
        <Separator className="bg-slate-200" />

        <div className="space-y-3 mt-3">
          <p className="text-[10px] text-center text-slate-500 leading-tight">
            By clicking continue, you agree to our{" "}
            <a
              className="text-blue-600 hover:text-blue-700 hover:underline"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              className="text-blue-600 hover:text-blue-700 hover:underline"
              href="#"
            >
              Privacy Policy
            </a>
            .
          </p>

          <p className="text-sm text-center text-slate-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};
