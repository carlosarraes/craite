import { setup } from '@/db/setup'
import axios from 'axios'
import { Elysia, t } from 'elysia'

export const apiRoutes = (app: Elysia) =>
  app.use(setup).group('/images', (app) =>
    app
      .post(
        '/create',
        async ({ body: { content } }) => {
          console.log(content)
          const response = await axios.post(
            'https://api.runpod.ai/v2/sd-anything-v4/run',
            {
              input: {
                prompt: content,
                negative_prompt:
                  'blurry, side looking, duplication, lowres, cropped, worst quality, low quality, jpeg artifacts, out of frame, watermark, signature',
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

          console.log(response.data)
        },
        { body: t.Object({ content: t.String({ minLength: 1 }) }) },
      )
      .post('/webhook', (ctx) => {
        console.log(ctx)
      }),
  )
