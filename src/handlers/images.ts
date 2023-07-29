import { setup } from '@/db/setup'
import { Elysia } from 'elysia'

export const apiRoutes = (app: Elysia) =>
  app.use(setup).group('/images', (app) =>
    app
      .get('/', () => 'Hello, world!')
      .get('/test', () => 'Hello, test!')
      .get('/test2', () => 'Hello, test2!'),
  )
