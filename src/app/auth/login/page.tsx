"use client"
import Image from "next/image";
import LoginForm from "../../../components/auth/loginForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const handleBackClick = () => {
        router.push('/');
    };
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-auto border-gray-800 rounded-3xl flex max-w-[700px] h-[500px] shadow-2xl">
        {/* Left Image Section */}
        <div className="flex w-2/5 items-center">
          <Image
            src="/cows.jpeg"
            alt="Login page image"
            width={600}
            height={600}
            className="object-cover h-full rounded-l-3xl"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-3/5 flex items-center justify-center">
          <div>
            {/* Heading */}
            <div className="ml-2 mb-4">
              <h1 className="text-lg font-bold">Hello Again !!</h1>
            </div>
            {/* Login Form */}
            <LoginForm />
            {/* Footer Links */}
            <div className="mt-4 text-xs text-gray-500">
              <Link
                href="/forgot-password"
                className="text-blue-400 hover:underline block mb-1"
              >
                Forgot Password?
              </Link>
              <div>
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-blue-400 hover:underline"
                >
                  Register here
                </Link>
              </div>
              <Button onClick={handleBackClick} className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1  px-2 rounded transition-all">
                <ArrowLeft className="w-5 h-5 mr-3" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
