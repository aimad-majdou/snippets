"use client";
import { CopyIcon } from "lucide-react";
import { useState } from "react";

export default function CopyToClipboard({ code }: { code: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      console.log("Copied to clipboard");
    } catch (error) {
      console.error("Error copying to clipboard", error);
    } finally {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <button disabled={isCopied} onClick={copyToClipboard}>
      {isCopied ? "Copied" : "Copy"}
      <CopyIcon />
    </button>
  );
}
