import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { FormField, FormFileInput } from "../custom";
import { updateProfileSchema } from "../../validations/userSchemas";
import { useAuth } from "../../hooks/authHooks/authHooks";
import { createSubmitHandlerWithToast } from "../../utils/formSubmitWithToast";

export const UpdateProfileForm = () => {
  const { user, updateProfileImage, isLoading } = useAuth(); // Using updateProfileImage as the general update hook for now

  const methods = useForm({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      image: user?.image || null, 
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const{name,email,phone}=data;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);

      // Handle Image Logic
      if (data.image instanceof File) {
        // New file selected
        formData.append("image", data.image);
      } else if (data.image === null && user.image) {
        // Image explicitly removed (data.image set to null by FormFileInput)
        // Send empty string to indicate removal to backend
        formData.append("image", "");
      }
      
      await updateProfileImage(formData);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleSubmit = createSubmitHandlerWithToast(methods, onSubmit);

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Image Upload */}
        {/* Profile Image Upload - Centered */}
        <div className="flex justify-center mb-6">
          <FormFileInput
            control={methods.control}
            name="image"
            label="Profile Image"
            accept="image/*"
            maxSizeMB={5}
            disabled={isLoading}
            existingImageUrl={user?.image}
            className="w-full max-w-xs"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={methods.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            disabled={isLoading}
          />
          <FormField
            control={methods.control}
            name="phone"
            label="Phone Number"
            placeholder="+1234567890"
            disabled={isLoading}
          />
        </div>

        <FormField
          control={methods.control}
          name="email"
          type="email"
          label="Email Address"
          placeholder="john@example.com"
          disabled={isLoading}
        />

        <div className="flex justify-end pt-4">
            <Button
               type="submit"
               className="w-full md:w-auto min-w-[140px] h-11 font-semibold text-base bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all"
               disabled={isLoading || !methods.formState.isDirty}
             >
               {isLoading ? (
                 <>
                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   Saving Changes...
                 </>
               ) : (
                 "Save Changes"
               )}
             </Button>
        </div>
      </form>
    </Form>
  );
};


