"use server";

import { deleteSnippet } from "@/data/snippet-dto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteSnippetAction(id: string) {
  await deleteSnippet(id);
  revalidatePath("/"); // Revalidate the home page to reflect the updated snippet list
  redirect("/");
}
