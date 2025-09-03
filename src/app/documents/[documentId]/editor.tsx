"use client";

import React from "react";
// Tiptap
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TableKit } from "@tiptap/extension-table";

const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        // Has to be dynamic because of User Interaction
        style: "padding-left: 56px; padding-right: 56px;",
        class:
          "focus:outline-none print:border-0 bg-white border border-border flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({ nested: true }),
      TableKit.configure({
        table: { resizable: true },
      }),
    ],
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });
  return (
    <div className="size-full overflow-x-auto bg-antonio-white px-4 print:p-0 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
