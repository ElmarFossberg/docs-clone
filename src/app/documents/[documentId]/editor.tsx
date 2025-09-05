"use client";

import React from "react";
// Tiptap
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TableKit } from "@tiptap/extension-table";
import { TextStyleKit } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";

// Zustand
import { useEditorStore } from "@/store/use-editor-store";
import DocumentRuler from "./ruler";

const Editor = () => {
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    // Connecting the editor to our global variable (our store (Zustand))
    /* Might be bad practise (if performance issues we can store just the editor content insted of the editor itself or use another approach)*/
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
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
      ImageResize,
      TextStyleKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TaskItem.configure({ nested: true }),
      TableKit.configure({
        table: { resizable: true },
      }),
      Highlight.configure({ multicolor: true }),
    ],
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  if (!editor) {
    return (
      <div className="size-full overflow-x-auto bg-antonio-white px-4 print:p-0 print:bg-white print:overflow-visible">
        <DocumentRuler />
        <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
          <div className="w-full h-[1054px] bg-white opacity-40 border border-border rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="size-full overflow-x-auto bg-antonio-white px-4 print:p-0 print:bg-white print:overflow-visible">
      <DocumentRuler />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
