import React from "react";
import Toolbar from "./toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import FakeNavbar from "./_components/FakeNavbar";
import { PAGE_WIDTH } from "@/constants/margins";

export const Loading = async () => {
  return (
    <div className="min-h-screen bg-antonio-white">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
        <FakeNavbar />
        <Toolbar />
      </div>
      <div className="pt-[120px] print:pt-0">
        <Skeleton className={`w-[${PAGE_WIDTH || 816}px]`} />
      </div>
    </div>
  );
};

export default Loading;
