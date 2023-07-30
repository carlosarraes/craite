import elements from 'typed-html'
import { Elysia } from 'elysia'
import { Dashboard } from '@/view/dashboard'
import { setup } from '@/db/setup'
import { images } from '@/db/schema'
import { desc, isNotNull } from 'drizzle-orm'

export const viewRoutes = (app: Elysia) =>
  app
    .use(setup)
    .get('/dashboard', () => <Dashboard />)
    .get('/show', async ({ store: { db } }) => {
      const image = await db
        .select()
        .from(images)
        .where(isNotNull(images.url))
        .orderBy(desc(images.id))
        .get()

      return (
        <div hx-get="/show" hx-swap="outerHTML" hx-trigger="load delay:10s" class="rounded shadow">
          <img src={image.url!} alt={image.content} class="w-96 h-96 rounded" />
        </div>
      )
    })
