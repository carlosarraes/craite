import elements from 'typed-html'
import { images } from '@/db/schema'
import { setup } from '@/db/setup'
import { generateSeed } from '@/helpers'
import { BodyFromRP } from '@/types/'
import axios from 'axios'
import { eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'

export const apiRoutes = (app: Elysia) =>
  app.use(setup).group('/images', (app) =>
    app
      .post(
        '/create',
        async ({ body: { content }, store: { db } }) => {
          const seed = generateSeed(-50, 50)
          const response = await axios.post(
            'https://api.runpod.ai/v2/kandinsky-v2/run',
            {
              input: {
                prompt: content,
                h: 512,
                w: 512,
                seed,
              },
              webhook: `${process.env.WEBHOOK_URL}/images/webhook`,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: process.env.RUNPOD_API_KEY,
              },
            },
          )

          const image = await db
            .insert(images)
            .values({
              content,
              seed,
              imageId: response.data.id,
            })
            .returning()
            .get()

          return (
            <div
              id="image-id"
              class="flex justify-between items-center w-full text-xs mt-2 pl-1"
              hx-get={`/show/${image.imageId}`}
              hx-trigger="load delay:2s"
              hx-swap="outerHTML"
            >
              <span>{image.imageId}</span>
              <div class="flex gap-2 items-center">
                <span class="text-yellow-600 animate-pulse">Processing...</span>
                <div class="w-2 h-2 bg-yellow-600 animate-pulse rounded"></div>
                <div class="w-2 h-2 bg-sky-600 opacity-20 rounded"></div>
                <div class="w-2 h-2 bg-green-600 opacity-20 rounded"></div>
              </div>
            </div>
          )
        },
        { body: t.Object({ content: t.String({ minLength: 1 }) }) },
      )
      .post('/webhook', async ({ store: { db }, body, set }) => {
        const {
          status,
          id,
          output: { image_url: imageUrl },
        } = body as BodyFromRP
        if (status !== 'COMPLETED') {
          set.status = 400
          throw new Error('Not completed')
        }

        const date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)

        await db
          .update(images)
          .set({
            url: imageUrl,
            expiresAt: date.toISOString().slice(0, 19).replace('T', ' '),
          })
          .where(eq(images.imageId, id))
          .returning()
          .get()
      }),
  )
