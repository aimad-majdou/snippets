"use server";

import { updateSnippet } from "@/data/snippet-dto";
import { SnippetUpdateSchemaType } from "@/schemas/snippet";

const editSnippetAction = async (data: SnippetUpdateSchemaType) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    await updateSnippet(data);
  } catch (error) {
    return {
      error: "An error occurred while updating the snippet.",
    };
  }
};

export default editSnippetAction;
