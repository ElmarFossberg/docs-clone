"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PasteImageDialogProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (dialog: boolean) => void;
  onChange: (src: string) => void;
};

const PasteImageDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  onChange,
}: PasteImageDialogProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert image URL</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="https://example.com"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleImageUrlSubmit();
            }
          }}
        />
        <DialogFooter>
          <Button onClick={handleImageUrlSubmit}>Insert</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PasteImageDialog;
