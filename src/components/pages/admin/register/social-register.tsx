import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Chrome } from "lucide-react";

interface SocialRegisterProps {
  onGoogleRegister: () => void;
  loading: boolean;
}

export const SocialRegister = ({
  onGoogleRegister,
  loading,
}: SocialRegisterProps) => {
  return (
    <>
      {/* Google Register */}
      <div className="mb-6">
        <Button
          type="button"
          variant="outline"
          onClick={onGoogleRegister}
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-6"
          disabled={loading}
        >
          <Chrome className="w-5 h-5 mr-3" />
          Sign up with Google
        </Button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full bg-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">
            Or sign up with email
          </span>
        </div>
      </div>
    </>
  );
};
