"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DocumentInput from "./_components/DocumentInput";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  BoldIcon,
  CodeIcon,
  CodeSquareIcon,
  CopyIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  Search,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from "lucide-react";
import { BsBlockquoteLeft, BsFilePdf } from "react-icons/bs";
import { getOSFromUA } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { UserButton } from "@clerk/nextjs";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import RemoveDialog from "@/app/_components/RemoveDialog";
import RenameDialog from "@/app/_components/RenameDialog";
import PasteImageDialog from "./_components/PasteImageDialog";

const NavBar = ({ data }: { data: Doc<"documents"> }) => {
  const [docTitle, setDocTitle] = useState("Untitled Document");
  useEffect(() => {
    setDocTitle(data?.title || "Untitled Document");
  }, [data]);
  const router = useRouter();
  // Check Operating System
  const userAgent = navigator.userAgent;
  const os = getOSFromUA(userAgent);

  const createDocument = useMutation(api.documents.createDocument);
  const handleCreateDocument = () => {
    createDocument({ title: "Untitled Document", initialContent: "" }).then(
      (id) => {
        router.push(`/documents/${id}`);
      }
    );
  };
  const { editor } = useEditorStore();
  const handleCreateCopyDocument = () => {
    createDocument({
      title: `Copy of ${data.title}`,
      initialContent: data.content,
    }).then((id) => {
      router.push(`/documents/${id}`);
    });
  };

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  // Saving Document
  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJSON = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, `${docTitle}.json`);
  };

  const onSaveHTML = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });
    onDownload(blob, `${docTitle}.html`);
  };
  // TODO: onSavePdf (insted of print)
  const onSaveText = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });
    onDownload(blob, `${docTitle}.txt`);
  };
  // Insert -> Image
  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };
  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };
    input.click();
  };
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  return (
    <header className="mt-0.5">
      <nav className="flex items-center justify-between px-4">
        <div className="flex gap-2 items-center">
          <Link href={"/"}>
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          </Link>
          <div className="flex flex-col">
            {data && <DocumentInput title={docTitle} id={data._id} />}
            <div className="flex">
              <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                <MenubarMenu>
                  <MenubarTrigger className="text-xs font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    File
                  </MenubarTrigger>
                  <MenubarContent className="print:hidden">
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <FileIcon className="size-4 mr-2 text-muted-foreground" />
                        Save As
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem onClick={() => window.print()}>
                          <BsFilePdf className="size-4" />
                          PDF
                        </MenubarItem>
                        <MenubarItem onClick={onSaveText}>
                          <FileTextIcon className="size-4" />
                          Text
                        </MenubarItem>
                        <MenubarItem onClick={onSaveJSON}>
                          <FileJsonIcon className="size-4" />
                          JSON
                        </MenubarItem>
                        <MenubarItem onClick={onSaveHTML}>
                          <GlobeIcon className="size-4" />
                          HTML
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem onClick={handleCreateDocument}>
                      <FilePlusIcon className="size-4" />
                      New Document
                    </MenubarItem>
                    <MenubarItem onClick={handleCreateCopyDocument}>
                      <CopyIcon className="size-4" />
                      Make a copy
                    </MenubarItem>
                    <MenubarSeparator />
                    <RenameDialog
                      documentId={data?._id}
                      initialTitle={data?.title}
                    >
                      <MenubarItem
                        onClick={(e) => e.stopPropagation()}
                        onSelect={(e) => e.preventDefault()}
                      >
                        <FilePenIcon className="size-4" />
                        Rename
                      </MenubarItem>
                    </RenameDialog>
                    <RemoveDialog redirect={true} documentId={data?._id}>
                      <MenubarItem
                        onClick={(e) => e.stopPropagation()}
                        onSelect={(e) => e.preventDefault()}
                      >
                        <TrashIcon className="size-4" />
                        Remove
                      </MenubarItem>
                    </RemoveDialog>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => window.print()}>
                      <PrinterIcon className="size-4" />
                      Print{" "}
                      <MenubarShortcut>
                        {os === "macOS" ? "⌘P" : "Ctrl + P"}
                      </MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="text-xs font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    Edit
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem onClick={() => editor?.commands.undo()}>
                      <Undo2Icon className="size-4" />
                      Undo
                      <MenubarShortcut>
                        {os === "macOS" ? "⌘Z" : "Ctrl + Z"}
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => editor?.commands.redo()}>
                      <Redo2Icon className="size-4" />
                      Redo
                      <MenubarShortcut>
                        {os === "macOS" ? "⌘Y" : "Ctrl + Y"}
                      </MenubarShortcut>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="text-xs font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    Insert
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                      <MenubarSubTrigger>Table</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem
                          onClick={() => insertTable({ rows: 2, cols: 2 })}
                        >
                          2 x 2
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => insertTable({ rows: 2, cols: 3 })}
                        >
                          2 x 3
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => insertTable({ rows: 2, cols: 4 })}
                        >
                          2 x 4
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => insertTable({ rows: 2, cols: 5 })}
                        >
                          2 x 5
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <ImageIcon className="size-4 mr-2 text-muted-foreground" />
                        Image
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem onClick={onUpload}>
                          <UploadIcon className="size-4" />
                          Upload
                        </MenubarItem>
                        <MenubarItem onClick={() => setIsImageDialogOpen(true)}>
                          <Search className="size-4" />
                          Paste from web
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="text-xs font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    Format
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <TextIcon className="size-4 mr-2" />
                        Text
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem
                          onClick={() => editor?.commands.toggleBold()}
                        >
                          <BoldIcon className="size-4" />
                          Bold
                          <MenubarShortcut>
                            {os === "macOS" ? "⌘B" : "Ctrl + B"}
                          </MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => editor?.commands.toggleItalic()}
                        >
                          <ItalicIcon className="size-4" />
                          Italic
                          <MenubarShortcut>
                            {os === "macOS" ? "⌘I" : "Ctrl + I"}
                          </MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => editor?.commands.toggleUnderline()}
                        >
                          <UnderlineIcon className="size-4" />
                          Underline
                          <MenubarShortcut>
                            {os === "macOS" ? "⌘U" : "Ctrl + U"}
                          </MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => editor?.commands.toggleStrike()}
                        >
                          <StrikethroughIcon className="size-4" />
                          Strikethrough
                          <MenubarShortcut>
                            {os === "macOS" ? "⌘S" : "Ctrl + S"}
                          </MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => editor?.commands.toggleCode()}
                        >
                          <CodeIcon className="size-4" />
                          Code
                          <MenubarShortcut>
                            {os === "macOS" ? "⌘E" : "Ctrl + E"}
                          </MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => editor?.commands.toggleCodeBlock()}
                        >
                          <CodeSquareIcon className="size-4" />
                          Code Block
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => editor?.commands.toggleBlockquote()}
                        >
                          <BsBlockquoteLeft className="size-4" />
                          Block Quote
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem
                      onClick={() => editor?.commands.unsetAllMarks()}
                    >
                      <RemoveFormattingIcon className="size-4 " />
                      Clear Formatting
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <PasteImageDialog
                  isDialogOpen={isImageDialogOpen}
                  setIsDialogOpen={setIsImageDialogOpen}
                  onChange={onChange}
                />
                <Link
                  href={"https://github.com/ElmarFossberg/docs-clone"}
                  target="_blank"
                  className="bg-neutral-200/60 text-xs font-normal py-0.5 px-[7px] rounded-sm hover:bg-neutral-200 h-auto"
                >
                  Github
                </Link>
              </Menubar>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center pl-6">
          <UserButton />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
