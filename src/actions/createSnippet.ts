'use server';

import { createSnippet } from '@/data/snippet-dto';
import { SnippetCreateSchemaType } from '@/schemas/snippet';
import { buildErrorMessage } from './helpers';

const createSnippetAction = async (snippet: SnippetCreateSchemaType) => {
  try {
    await createSnippet(snippet)
  } catch (error) {
    return {
      error: buildErrorMessage(error),
    };
  }
};

export default createSnippetAction;
