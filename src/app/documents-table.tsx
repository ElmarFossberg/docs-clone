"use client";

import React from "react";
import { Doc } from "../../convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";
import { LoaderIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import DocumentRow from "./_components/DocumentRow";
import { Button } from "@/components/ui/button";

type DocumentsTableProps = {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
};

const DocumentsTable = ({
  documents,
  loadMore,
  status,
}: DocumentsTableProps) => {
  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      {documents === undefined ? (
        <div className="flex justify-center items-center h-24">
          <LoaderIcon className="text-muted-foreground animate-spin size-5" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead colSpan={2} className="text-muted-foreground">
                Name
              </TableHead>
              <TableHead className="hidden md:table-cell text-muted-foreground">
                Last Updated
              </TableHead>
              <TableHead className="hidden md:table-cell text-muted-foreground">
                Created at
              </TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-transparent border-none">
                <TableCell
                  colSpan={2}
                  className="h-24 text-sm  text-muted-foreground"
                >
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((doc) => (
                <DocumentRow key={doc._id} doc={doc}></DocumentRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}

      <div className="flex items-center justify-center">
        {documents && documents.length > 0 ? (
          status === "CanLoadMore" ? (
            <Button
              className="text-muted-foreground"
              variant="ghost"
              size="sm"
              onClick={() => loadMore(5)}
            >
              Load More
            </Button>
          ) : (
            <p className="text-muted-foreground text-xs mb-10">
              End of results
            </p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default DocumentsTable;
