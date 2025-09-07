"use client";
// TODO: Fix bug (if the user didn't style the text, the font size button doesn't update when the selection changes)

import React, { useState, useEffect } from "react";
import { useEditorStore } from "@/store/use-editor-store";
import { MinusIcon, PlusIcon } from "lucide-react";

const FontSizeButton = () => {
  const { editor } = useEditorStore();
  const [inputValue, setInputValue] = useState("14");

  // This is needed to update the input value when the selection changes
  useEffect(() => {
    if (!editor) return;

    const updateFromSelection = () => {
      const attrs = editor.getAttributes("textStyle");
      let fontSize;

      if (attrs?.fontSize) {
        fontSize = attrs.fontSize.replace("px", "");
      } else if (editor.isActive("heading")) {
        const level = editor.getAttributes("heading").level;
        fontSize =
          level === 1 ? "28" : level === 2 ? "24" : level === 3 ? "20" : "18";
      } else {
        fontSize = "14";
      }

      setInputValue(fontSize);
    };

    // Run once immediately
    updateFromSelection();

    editor.on("selectionUpdate", updateFromSelection);
    editor.on("transaction", updateFromSelection);

    return () => {
      editor.off("selectionUpdate", updateFromSelection);
      editor.off("transaction", updateFromSelection);
    };
  }, [editor]);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setInputValue(size.toString());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => updateFontSize(inputValue);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => updateFontSize((parseInt(inputValue) + 1).toString());
  const decrement = () =>
    updateFontSize(Math.max(1, parseInt(inputValue) - 1).toString());

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <MinusIcon className="size-4" />
      </button>

      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="h-7 w-10 text-xs text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
      />

      <button
        onClick={increment}
        className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

export default FontSizeButton;
