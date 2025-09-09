"use client";

import { WandSparklesIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { useEditorStore } from "@/store/use-editor-store";

const PolishButton = () => {
  //   const { editor } = useEditorStore();

  // Generate a random cat image
  const handleClick = () => {};

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <WandSparklesIcon className="size-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Ai Polish</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default PolishButton;
