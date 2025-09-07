"use client";

import React, { useState } from "react";
// Tiptap
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TableKit } from "@tiptap/extension-table";
import { TextStyleKit } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import Highlight from "@tiptap/extension-highlight";

// Zustand
import { useEditorStore } from "@/store/use-editor-store";
import DocumentRuler from "./ruler";
import { useDebounce } from "@/hooks/use-debounce";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import {
  LEFT_MARGIN_DEFAULT,
  RIGHT_MARGIN_DEFAULT,
  PAGE_WIDTH,
} from "@/constants/margins";
import Link from "@tiptap/extension-link";

type EditorProps = {
  initialContent?: string | undefined;
  id: Id<"documents">;
  content?: string | undefined;
};

const Editor = ({ initialContent, id, content }: EditorProps) => {
  const [leftMargin, setLeftMargin] = useState(LEFT_MARGIN_DEFAULT);
  const [rightMargin, setRightMargin] = useState(RIGHT_MARGIN_DEFAULT);

  const { setEditor, setContent } = useEditorStore();
  const updateDocumentContent = useMutation(api.documents.updateDocumentConent);

  const debouncedSave = useDebounce(() => {
    const html = useEditorStore.getState().content;
    updateDocumentContent({ id, content: html });
  }, 2000);

  const editor = useEditor({
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
      const html = editor.getHTML();
      setContent(html);
      debouncedSave();
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
        style: `padding-left: ${leftMargin ?? LEFT_MARGIN_DEFAULT}px; padding-right: ${rightMargin ?? RIGHT_MARGIN_DEFAULT}px;`,
        class: `focus:outline-none print:border-0 bg-white border border-border flex flex-col min-h-[1054px] w-[${PAGE_WIDTH}px] pt-10 pr-14 pb-10 cursor-text`,
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

    content: content ?? initialContent ?? "",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  if (!editor) {
    return (
      <div className="size-full overflow-x-auto bg-antonio-white px-4 print:p-0 print:bg-white print:overflow-visible">
        <DocumentRuler
          leftMargin={leftMargin}
          setLeftMargin={setLeftMargin}
          rightMargin={rightMargin}
          setRightMargin={setRightMargin}
        />
        <div
          className={`min-w-max flex justify-center w-[${PAGE_WIDTH}px] py-4 print:py-0 mx-auto print:w-full print:min-w-0`}
        >
          <div className="w-full h-[1054px] bg-white opacity-40 border border-border rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="size-full overflow-x-auto bg-antonio-white px-4 print:p-0 print:bg-white print:overflow-visible">
      <DocumentRuler
        leftMargin={leftMargin}
        setLeftMargin={setLeftMargin}
        rightMargin={rightMargin}
        setRightMargin={setRightMargin}
      />
      <div
        className={`min-w-max flex justify-center w-[${PAGE_WIDTH}px] h-[1056px] py-4 print:py-0 mx-auto print:w-full print:min-w-0`}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
