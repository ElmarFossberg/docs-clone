"use client";

import React from "react";
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
  Code2Icon,
  CodeIcon,
  CodeSquareIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { BsBlockquoteLeft, BsFilePdf } from "react-icons/bs";
import { getOSFromUA } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";

const NavBar = () => {
  // Check Operating System
  const userAgent = navigator.userAgent;
  const os = getOSFromUA(userAgent);

  const { editor } = useEditorStore();

  // TODO: WHEN CREATING A TABLE ACTIVATE MORE TOOLS IN THE TOOLBAR (ADDING/REMOVING ROWS/COLS, MERGE CELLS, ETC)
  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  return (
    <header>
      <nav className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link href={"/"}>
            <Image src="/logo.svg" alt="Logo" width={36} height={46} />
          </Link>
          <div className="flex flex-col">
            <DocumentInput />
            <div className="flex">
              <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                <MenubarMenu>
                  <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    File
                  </MenubarTrigger>
                  <MenubarContent className="print:hidden">
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <FileIcon className="size-4 mr-2" />
                        Save
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>
                          <BsFilePdf className="size-4" />
                          PDF
                        </MenubarItem>
                        <MenubarItem>
                          <FileTextIcon className="size-4" />
                          Text
                        </MenubarItem>
                        <MenubarItem>
                          <FileJsonIcon className="size-4" />
                          JSON
                        </MenubarItem>
                        <MenubarItem>
                          <GlobeIcon className="size-4" />
                          HTML
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem>
                      <FilePlusIcon className="size-4" />
                      New Document
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <FilePenIcon className="size-4" />
                      Rename
                    </MenubarItem>
                    <MenubarItem>
                      <TrashIcon className="size-4" />
                      Remove
                    </MenubarItem>
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
                  <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
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
                  <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
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
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
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
                    <MenubarItem>
                      <RemoveFormattingIcon className="size-4 " />
                      Clear Formatting
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
