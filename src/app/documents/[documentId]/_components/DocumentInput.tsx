"use client";

import React, { useState, useRef, useEffect } from "react";
import { BsCloudCheck } from "react-icons/bs";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";

type DocumentInputProps = {
  title: string;
  id: Id<"documents">;
};

function DocumentInput({ title, id }: DocumentInputProps) {
  const [value, setValue] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [, setIsLoading] = useState(false);

  useEffect(() => {
    setValue(title);
  }, [title]);

  const inputRef = useRef<HTMLInputElement>(null);
  const updateDocumentTitle = useMutation(api.documents.updateDocumentTitle);

  const debouncedUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;
    setIsLoading(true);
    updateDocumentTitle({ id, title: newValue })
      .catch((e) => {
        toast.error("Failed to update document title", e.message);
      })
      .finally(() => setIsLoading(false));
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedUpdate(newValue);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    updateDocumentTitle({ id, title: value })
      .then(() => {
        setIsEditing(false);
      })
      .catch((e) => {
        toast.error("Failed to update document title", e.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form className="relative inline-block" onSubmit={handleSubmit}>
          {/* Invisible span to set the width */}
          <span className="invisible whitespace-pre px-1.5 tracking-tight">
            {value || " "}
          </span>

          {/* Input positioned over the span */}
          <input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onBlur={() => setIsEditing(false)}
            className="absolute left-0 top-0 px-1.5 tracking-tight border-none focus:outline-none focus:ring-0 focus:ring-offset-0 bg-transparent"
            autoFocus
          />
        </form>
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className="px-1.5 cursor-pointer truncate tracking-tight"
        >
          {value}
        </span>
      )}

      <BsCloudCheck />
    </div>
  );
}

export default DocumentInput;
