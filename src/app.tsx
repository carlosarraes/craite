import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import elements from 'typed-html'
import { db } from './db'
import { apiRoutes, viewRoutes } from './handlers'
import { Layout } from './components/layout'
import { staticPlugin } from '@elysiajs/static'
import Header from './components/header'
import { cors } from '@elysiajs/cors'

const app = new Elysia()
  .use(cors())
  .use(html())
  .use(staticPlugin())
  .state('db', db)
  .get('/', ({ html }) =>
    html(
      <Layout>
        <body class="flex w-full h-screen justify-center items-center bg-white dark:bg-gray-800">
          <main class="flex flex-col items-center justify-center w-full max-w-lg">
            <Header />
            <section
              id="section-content"
              hx-get="/dashboard"
              hx-trigger="load"
              hx-swap="outerHTML"
              class="flex flex-col items-center justify-center w-full bg-transparent"
            />
          </main>
        </body>
      </Layout>,
    ),
  )
  .use(apiRoutes)
  .use(viewRoutes)

export default app
