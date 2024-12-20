import Image from "next/image";
import RegisterForm from "../../../components/auth/registerForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-auto border-gray-800 rounded-3xl flex max-w-[700px] h-[500px] shadow-2xl'>
        <div className="flex w-2/5 items-center">
          <Image
            src="/cows.jpeg"
            alt="Register page image"
            width={600}
            height={600}
            className="object-cover h-full rounded-l-3xl"
          />
        </div>
        <div className='w-3/5 flex items-center justify-center'>
          <div>
            <div className="ml-2">
              <Image
                className="h-14 w-auto rounded-full"
                src="/logo.svg"
                alt="Cattle Software Logo"
                width={32}
                height={32}
                objectFit="contain"
              />
            </div>
            <div className="ml-2">
              <span className='text-lg font-bold'>Register</span>
            </div>
            <RegisterForm />
            <div className='mt-4'>
              <div className="text-xs text-gray-500">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-400 hover:underline text-xs">
                  Sign In here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
