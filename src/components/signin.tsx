import { SignIn } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";

const SignInScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.svg"
            alt="DocZilla Logo"
            width={50}
            height={50}
            className="h-12 w-auto"
          />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome to DocZilla
          </h1>
          <p className="text-gray-600 mt-2">
            {`Let's create something amazing.`}
          </p>
        </div>

        <div className="w-full flex justify-center">
          <SignIn routing="hash" />
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          By signing in, you agree to adopt a penguin
        </p>
      </div>
    </div>
  );
};

export default SignInScreen;
