import { PrismaClient } from '@prisma/client'
import { SnippetCreateSchema, SnippetUpdateSchema } from '../schemas/snippet'

/**
 * https://www.prisma.io/docs/orm/prisma-client/queries/custom-validation#input-validation-with-prisma-client-extensions
 */
export const db = new PrismaClient().$extends({
    query: {
      snippet: {
        create({ args, query }) {
          args.data = SnippetCreateSchema.parse(args.data)
          return query(args)
        },
        update({ args, query }) {
          args.data = SnippetUpdateSchema.partial().parse(args.data)
          return query(args)
        },
        updateMany({ args, query }) {
          args.data = SnippetUpdateSchema.partial().parse(args.data)
          return query(args)
        },
        upsert({ args, query }) {
          args.create = SnippetCreateSchema.parse(args.create)
          args.update = SnippetUpdateSchema.partial().parse(args.update)
          return query(args)
        },
      },
    },
  })
