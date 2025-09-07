"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Id } from "../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

type RemoveDialogProps = {
  documentId: Id<"documents">;
  children: React.ReactNode;
  redirect?: boolean;
};

const RemoveDialog = ({
  documentId,
  children,
  redirect = false,
}: RemoveDialogProps) => {
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState(false);
  const deleteDocument = useMutation(api.documents.deleteDocument);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-700 hover:bg-red-800"
            disabled={isRemoving}
            onClick={(e) => {
              e.stopPropagation();
              setIsRemoving(true);
              if (redirect) router.push("/");
              deleteDocument({ id: documentId }).finally(() =>
                setIsRemoving(false)
              );
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveDialog;
