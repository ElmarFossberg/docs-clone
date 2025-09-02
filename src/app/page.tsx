import Link from "next/link";

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      Click{" "}
      <Link href="/documents/123" className="underline text-blue-500">
        here
      </Link>{" "}
      to go to document 123
    </div>
  );
};

export default page;
