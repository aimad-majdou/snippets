import Editor, { EditorProps, OnMount } from "@monaco-editor/react";
import React from "react";

interface CodeEditorProps extends EditorProps {
  readonly?: boolean;
  title?: string;
  id?: string;
  ariaLabel?: string;
}

export const CodeEditor = React.forwardRef<any, CodeEditorProps>(
  (
    {
      theme = "vs-dark",
      height = "40vh",
      language = "typescript",
      options: optionsProp,
      ariaLabel = "Code editor",
      ...rest
    },
    ref
  ) => {
    const options: EditorProps["options"] = {
      minimap: {
        enabled: false,
      },
      ariaLabel,
      ...optionsProp,
    };

    const handleEditorDidMount: OnMount = (editor) => {
      if (ref && typeof ref === "function") {
        ref(editor); // Call ref callback if it's a function
      } else if (ref && "current" in ref) {
        ref.current = editor; // Set ref current if it's an object ref
      }
    };

    return (
      <Editor
        height={height}
        theme={theme}
        language={language}
        options={options}
        {...rest}
        onMount={handleEditorDidMount}
      />
    );
  }
);

// Set display name for easier debugging (optional)
CodeEditor.displayName = "CodeEditor";
