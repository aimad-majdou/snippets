"use server";

import { deleteSnippet } from "@/data/snippet-dto";
import { redirect } from "next/navigation";

export default async function deleteSnippetAction(id: string) {
  await deleteSnippet(id);
  redirect("/");
}
