"use client";

import { SmileIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useEditorStore } from "@/store/use-editor-store";

const EmojiButton = () => {
  const { editor } = useEditorStore();

  const handleClick = (emojiData: EmojiClickData) => {
    editor?.commands.insertContent(emojiData.emoji);
  };

  return (
    <DropdownMenu modal={false}>
      <Tooltip delayDuration={500}>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
              <SmileIcon className="size-4" />
            </button>
          </TooltipTrigger>
        </DropdownMenuTrigger>

        <TooltipContent side="bottom">
          <p>Add Emoji</p>
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent className="z-50">
        <EmojiPicker
          style={{
            border: "none",
          }}
          onEmojiClick={handleClick}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EmojiButton;
