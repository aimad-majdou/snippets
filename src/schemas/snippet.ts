import * as z from 'zod'

export const snippetSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters.',
  }),
  code: z.string(),
})

export type SnippetSchemaType = z.infer<typeof snippetSchema>
