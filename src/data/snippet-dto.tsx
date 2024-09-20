import { db } from '@/db';
import 'server-only';

export async function getSnippet(id: string) {
  // TODO: remove this after
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Fetch snippet from the database
  return db.snippet.findFirst({
    where: { id },
  });
}
