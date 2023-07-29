import { InferModel, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const images = sqliteTable('images', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  imageId: text('image_id').notNull(),
  content: text('content').notNull(),
  url: text('url'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
})

export type Image = InferModel<typeof images>
