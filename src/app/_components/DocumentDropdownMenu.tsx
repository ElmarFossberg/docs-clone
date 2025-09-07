import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react";
import React from "react";
import { Id } from "../../../convex/_generated/dataModel";
import Link from "next/link";
import RemoveDialog from "./RemoveDialog";
import RenameDialog from "./RenameDialog";

type DocumentDropdownMenuProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  documentId: Id<"documents">;
  title: string;
};

const DocumentDropdownMenu = ({
  documentId,
  title,
  isOpen,
  setIsOpen,
}: DocumentDropdownMenuProps) => {
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <MoreVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RenameDialog documentId={documentId} initialTitle={title}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <FilePenIcon className="size-4" />
            Rename
          </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <TrashIcon className="size-4" />
            Delete
          </DropdownMenuItem>
        </RemoveDialog>

        <DropdownMenuItem>
          <Link
            className="flex items-center gap-2"
            href={`/documents/${documentId}`}
          >
            <ExternalLinkIcon className="size-4" />
            Open
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocumentDropdownMenu;
