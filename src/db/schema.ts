import { InferModel, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const images = sqliteTable('images', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  seed: integer('seed').notNull(),
  imageId: text('image_id').notNull(),
  content: text('content').notNull(),
  url: text('url'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  expiresAt: text('expires_at'),
})

export type Image = InferModel<typeof images>
