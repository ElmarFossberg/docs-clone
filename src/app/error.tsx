"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-rose-100 p-3 rounded-full">
            <AlertTriangleIcon className="size-10 text-rose-600" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-gray-900">
            Something went wrong
          </h1>
          <p>{error.message}</p>
        </div>
        <div className="flex items-center gap-x-3">
          <Button className="font-medium" asChild>
            <Link href={"/"}>Home</Link>
          </Button>
          <Button
            onClick={reset}
            variant={"outline"}
            className="font-medium px-6"
          >
            Try again
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
