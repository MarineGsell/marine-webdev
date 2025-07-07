import { drizzle } from 'drizzle-orm/d1'
export { sql, eq, and, or } from 'drizzle-orm'

import * as schema from '../database/schema'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export type Competences = typeof schema.competences.$inferSelect
export type Works = typeof schema.works.$inferSelect
export type Opinions = typeof schema.opinions.$inferSelect
