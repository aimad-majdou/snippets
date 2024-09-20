'use server';

import { db } from '@/db';
import { snippetSchema, SnippetSchemaType } from '@/schemas/snippet';

const createSnippet = async (data: SnippetSchemaType) => {
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
    // Create a new record in the database
    await db.snippet.create({ data });
  } catch (error) {
    return {
      error: 'An error occurred while creating the snippet.',
    };
  }
};

export default createSnippet;
