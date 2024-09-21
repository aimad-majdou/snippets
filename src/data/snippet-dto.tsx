import { db } from "@/db";
import {
  SnippetCreateSchemaType,
  SnippetUpdateSchemaType,
} from "@/schemas/snippet";
import "server-only";

export async function getSnippet(id: string) {
  // Fetch snippet from the database
  return db.snippet.findFirst({
    where: { id },
  });
}

export async function getSnippetList() {
  // Fetch all snippets from the database
  return db.snippet.findMany();
}

export async function createSnippet(data: SnippetCreateSchemaType) {
  // Create snippet in the database
  return db.snippet.create({
    data,
  });
}

export async function updateSnippet({
  id,
  title,
  code,
}: SnippetUpdateSchemaType) {
  // Update snippet in the database
  return db.snippet.update({
    where: { id },
    data: {
      title,
      code,
    },
  });
}

export async function deleteSnippet(id: string) {
  // Delete snippet from the database
  return db.snippet.delete({
    where: { id },
  });
}
