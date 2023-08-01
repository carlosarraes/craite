import elements from 'typed-html'
import { Elysia, t } from 'elysia'
import { setup } from '@/db/setup'
import { images } from '@/db/schema'
import { and, desc, eq, gt, isNotNull } from 'drizzle-orm'
import { Dashboard } from '@/components/dashboard'
import History from '@/components/history'

export const viewRoutes = (app: Elysia) =>
  app
    .use(setup)
    .get('/dashboard', () => <Dashboard />)
    .get(
      '/history/:off',
      async ({ store: { db }, params: { off } }) => {
        const currentTime = new Date().toISOString()

        const allImages = await db
          .select()
          .from(images)
          .where(and(isNotNull(images.url), gt(images.expiresAt, currentTime)))
          .orderBy(desc(images.expiresAt))
          .limit(11)
          .offset(off)
          .all()

        const hasNext = allImages.length > 10
        if (hasNext) allImages.pop()

        return <History images={allImages} off={off} hasNext={hasNext} />
      },
      {
        params: t.Object({ off: t.Numeric({ minimum: 0 }) }),
      },
    )
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
    .get(
      '/show/:id',
      async ({ store: { db }, params: { id } }) => {
        const image = await db.select().from(images).where(eq(images.imageId, id)).get()

        if (!image.url) {
          return (
            <div
              id="image-id"
              class="flex justify-between items-center w-full text-xs mt-2 pl-1"
              hx-get={`/show/${id}`}
              hx-trigger="every 4s"
              hx-swap="outerHTML"
            >
              <span class="text-xs">{id}</span>
              <div class="flex gap-2 items-center">
                <span class="text-sky-600 animate-pulse">Creating...</span>
                <div class="w-2 h-2 bg-yellow-600 opacity-20 rounded"></div>
                <div class="w-2 h-2 bg-sky-600 animate-pulse rounded"></div>
                <div class="w-2 h-2 bg-green-600 opacity-20 rounded"></div>
              </div>
            </div>
          )
        }

        return (
          <div id="image-id" class="flex justify-between items-center w-full text-xs mt-2 pl-1">
            <span class="text-xs">{id}</span>
            <div class="flex gap-2 items-center">
              <div>
                <span class="text-green-600">Done</span>
                <a href={image.url!} target="_blank">
                  <span class="text-green-600 underline font-bold">Link</span>
                </a>
              </div>
              <div class="w-2 h-2 bg-yellow-600 opacity-20 rounded"></div>
              <div class="w-2 h-2 bg-sky-600 opacity-20 rounded"></div>
              <div class="w-2 h-2 bg-green-600 rounded"></div>
            </div>
          </div>
        )
      },
      {
        params: t.Object({ id: t.String({ minLength: 1 }) }),
      },
    )
