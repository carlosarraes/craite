import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import elements from 'typed-html'
import { db } from './db'
import { apiRoutes, viewRoutes } from './handlers'
import { Layout } from './components/layout'

const app = new Elysia()
  .use(html())
  .state('db', db)
  .get('/', ({ html }) =>
    html(
      <Layout>
        <body
          class="flex w-full h-screen justify-center items-center"
          hx-get="/dashboard"
          hx-trigger="load"
          hx-swap="innerHTML"
        ></body>
      </Layout>,
    ),
  )
  .use(apiRoutes)
  .use(viewRoutes)

export default app
