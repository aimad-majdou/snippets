import { Prisma } from "@prisma/client";
import * as z from "zod";

export const SnippetCreateSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  code: z.string(),
}) satisfies z.Schema<Prisma.SnippetUncheckedCreateInput>;

export const SnippetUpdateSchema = z.object({
  id: z.string(),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  code: z.string(),
}) satisfies z.Schema<Prisma.SnippetUncheckedUpdateInput>;

export type SnippetCreateSchemaType = z.infer<typeof SnippetCreateSchema>;
export type SnippetUpdateSchemaType = z.infer<typeof SnippetUpdateSchema>;
