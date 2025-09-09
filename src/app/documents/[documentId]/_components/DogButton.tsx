"use client";

import { DogIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditorStore } from "@/store/use-editor-store";

const DogButton = () => {
  const { editor } = useEditorStore();

  // Generate a random dog image
  const handleClick = () => {
    const num = Math.floor(Math.random() * 13) + 1;
    editor
      ?.chain()
      .focus()
      .setImage({ src: `/dog${num}.jpg` })
      .run();
  };

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <button
          onClick={handleClick}
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <DogIcon className="size-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Woof!</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default DogButton;
