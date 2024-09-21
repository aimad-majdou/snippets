"use client";

import { CodeEditor } from "./code-editor";

interface CodeViewerProps {
  title?: string;
  code?: string;
  ariaLabel?: string;
}

export function CodeViewer({ title, code, ariaLabel }: CodeViewerProps) {
  return (
    <div className="tw-pt-4">
      <CodeEditor
        title={title}
        defaultValue={code}
        options={{
          readOnly: true,
          ariaLabel,
        }}
      />
    </div>
  );
}
