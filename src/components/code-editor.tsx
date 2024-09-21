import Editor, { EditorProps } from "@monaco-editor/react";

interface CodeEditorProps extends EditorProps {
  readonly?: boolean;
  title: string;
}

export function CodeEditor({
  theme = "vs-dark",
  height = "40vh",
  language = "typescript",
  options: optionsProp,
  ...rest
}: CodeEditorProps) {
  const options = {
    minimap: {
      enabled: false,
    },
    ...optionsProp,
  };
  return (
    <Editor
      height={height}
      theme={theme}
      language={language}
      options={options}
      {...rest}
    />
  );
}
