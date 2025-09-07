"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  BoldIcon,
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

import { UserButton } from "@clerk/nextjs";

const FakeNavbar = () => {
  return (
    <header className="mt-0.5">
      <nav className="flex items-center justify-between px-4">
        <div className="flex gap-2 items-center">
          <Link href={"/"}>
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
          </Link>
          <div className="flex flex-col">
            <span className="px-1.5 cursor-pointer truncate tracking-tight">
              Document
            </span>
            <div className="flex">
              <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                <MenubarMenu>
                  <MenubarTrigger className="text-xs font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    File
                  </MenubarTrigger>
                  <MenubarContent className="print:hidden">
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <FileIcon className="size-4 mr-2" />
                        Save As
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

                    <MenubarItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <FilePenIcon className="size-4" />
                      Rename
                    </MenubarItem>
                    <MenubarItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <TrashIcon className="size-4" />
                      Remove
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <PrinterIcon className="size-4" />
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="text-xs font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                    Edit
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <Undo2Icon className="size-4" />
                      Undo
                    </MenubarItem>
                    <MenubarItem>
                      <Redo2Icon className="size-4" />
                      Redo
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
                        <MenubarItem>2 x 2</MenubarItem>
                        <MenubarItem>2 x 3</MenubarItem>
                        <MenubarItem>2 x 4</MenubarItem>
                        <MenubarItem>2 x 5</MenubarItem>
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
                        <MenubarItem>
                          <BoldIcon className="size-4" />
                          Bold
                        </MenubarItem>
                        <MenubarItem>
                          <ItalicIcon className="size-4" />
                          Italic
                        </MenubarItem>
                        <MenubarItem>
                          <UnderlineIcon className="size-4" />
                          Underline
                        </MenubarItem>
                        <MenubarItem>
                          <StrikethroughIcon className="size-4" />
                          Strikethrough
                        </MenubarItem>
                        <MenubarItem>
                          <CodeIcon className="size-4" />
                          Code
                        </MenubarItem>
                        <MenubarItem>
                          <CodeSquareIcon className="size-4" />
                          Code Block
                        </MenubarItem>
                        <MenubarItem>
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
                <Link
                  href={"https://github.com/ElmarFossberg/docs-clone"}
                  target="_blank"
                  className="text-xs font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto"
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

export default FakeNavbar;
