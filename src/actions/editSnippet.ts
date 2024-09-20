'use server';

import { db } from '@/db';
import { snippetSchema, SnippetSchemaType } from '@/schemas/snippet';

const editSnippetAction = async (id: string, data: SnippetSchemaType) => {
  const result = snippetSchema.safeParse(data);

  if (!result.success) {
    const errorMessages = result.error.issues.reduce((acc, issue) => {
      return acc + issue.message + '\n';
    }, '');

    return {
      error: errorMessages,
    };
  }

  try {
    // Update snippet in the database
    await db.snippet.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        code: data.code,
      },
    });
  } catch (error) {
    return {
      error: 'An error occurred while creating the snippet.',
    };
  }
};

export default editSnippetAction;
