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
              webhook: `${process.env.NGROK_URL}/images/webhook`,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: process.env.RUNPOD_API_KEY,
              },
            },
          )

          await db
            .insert(images)
            .values({
              content,
              seed,
              imageId: response.data.id,
            })
            .returning()
            .get()
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
