"use client";

import { PartyPopperIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/use-window-size";
import { useState } from "react";

const ConfettiButton = () => {
  const { width, height } = useWindowSize();
  const [runConfetti, setRunConfetti] = useState(false);

  const handleClick = () => {
    setRunConfetti(true);
    setTimeout(() => setRunConfetti(false), 4000);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <button
            onClick={handleClick}
            className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          >
            <PartyPopperIcon className="size-4" />
          </button>
          {runConfetti && (
            <Confetti
              width={width}
              height={height}
              run={runConfetti}
              tweenDuration={300}
            />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Confetti!</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ConfettiButton;
