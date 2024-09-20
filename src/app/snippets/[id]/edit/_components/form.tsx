'use client';

import { Snippet } from '@prisma/client';

interface SnippetEditForm {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditForm) {
  return (
    <div>
      Client component has snippet with id: {snippet.id} and title:
      {snippet.title}
    </div>
  );
}
