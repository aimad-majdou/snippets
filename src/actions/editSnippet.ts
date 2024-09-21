"use server";

import { updateSnippet } from "@/data/snippet-dto";
import { SnippetUpdateSchemaType } from "@/schemas/snippet";

const editSnippetAction = async (data: SnippetUpdateSchemaType) => {
  try {
    await updateSnippet(data);
  } catch (error) {
    console.log(error);
    return {
      error: "An error occurred while updating the snippet.",
    };
  }
};

export default editSnippetAction;
