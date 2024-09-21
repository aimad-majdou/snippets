"use server";

import { createSnippet } from "@/data/snippet-dto";
import { SnippetCreateSchemaType } from "@/schemas/snippet";
import { buildErrorMessage } from "./helpers";

const createSnippetAction = async (data: SnippetCreateSchemaType) => {
  try {
    await createSnippet(data)
  } catch (error) {
    return {
      error: buildErrorMessage(error),
    };
  }
};

export default createSnippetAction;
