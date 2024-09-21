'use client';

import { CodeEditor } from '@/components/code-editor';
import { Snippet } from '@prisma/client';
import { useState } from 'react';

interface SnippetEditForm {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditForm) {
  const [code, setCode] = useState(snippet.code);
  const handleEditorChange = (value: string = '') => {
    setCode(value);
  };

  return (
    <div>
      <CodeEditor
        title={snippet.title}
        defaultValue={snippet.code}
        onChange={handleEditorChange}
      />
    </div>
  );
}
