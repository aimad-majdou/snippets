"use client";

import { CodeEditor } from "./code-editor";

interface CodeViewerProps {
  title?: string;
  code?: string;
}

export function CodeViewer({ title, code }: CodeViewerProps) {
  return (
    <div className="tw-pt-4">
      <CodeEditor
        title={title}
        defaultValue={code}
        ariaLabel="Code"
        options={{
          readOnly: true,
        }}
      />
    </div>
  );
}
