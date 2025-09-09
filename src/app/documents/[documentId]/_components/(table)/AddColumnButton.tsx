"use client";

import { Columns2Icon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditorStore } from "@/store/use-editor-store";

const AddColumnButton = () => {
  const { editor } = useEditorStore();

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild>
        <button
          onClick={() => editor?.commands.addColumnAfter()}
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
        >
          <Columns2Icon className="size-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Add Column</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default AddColumnButton;
