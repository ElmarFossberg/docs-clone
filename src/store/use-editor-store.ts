import {create} from 'zustand';
import {type Editor} from "@tiptap/react";

type EditorState = {
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
      content: string;
  setContent: (html: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
    editor: null,
    setEditor: (editor) => set({editor}),
    content: "",
    setContent: (html) => set({ content: html }),
}))