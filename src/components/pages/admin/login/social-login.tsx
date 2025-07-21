import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Chrome } from "lucide-react";

interface SocialLoginProps {
  onGoogleLogin: () => void;
  loading: boolean;
}

export const SocialLogin = ({ onGoogleLogin, loading }: SocialLoginProps) => {
  return (
    <>
      {/* Google Login */}
      <div className="mb-6">
        <Button
          type="button"
          variant="outline"
          onClick={onGoogleLogin}
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-6"
          disabled={loading}
        >
          <Chrome className="w-5 h-5 mr-3" />
          Continue with Google
        </Button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full bg-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">
            Or continue with email
          </span>
        </div>
      </div>
    </>
  );
};
