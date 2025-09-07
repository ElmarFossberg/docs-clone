"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Doc } from "../../../convex/_generated/dataModel";
import { SiGoogledocs } from "react-icons/si";
import { format, formatDistanceToNow } from "date-fns";
import DocumentDropdownMenu from "./DocumentDropdownMenu";

type DocumentRowProps = {
  doc: Doc<"documents">;
};

const DocumentRow = ({ doc }: DocumentRowProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TableRow
      className="cursor-pointer group"
      onClick={() => window.open(`/documents/${doc._id}`, "_self")}
      onContextMenu={(e) => {
        e.preventDefault();
        setIsOpen(true);
      }}
    >
      <TableCell className="w-[45px]">
        <SiGoogledocs className="size-4 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%] group-hover:underline ">
        {doc.title}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell text-sm">
        {formatDistanceToNow(new Date(doc.lastUpdated), { addSuffix: true })}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell text-sm">
        {format(new Date(doc._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex ml-auto justify-end">
        <DocumentDropdownMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          documentId={doc._id}
          title={doc.title}
        />
      </TableCell>
    </TableRow>
  );
};

export default DocumentRow;
