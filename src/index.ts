import app from './app'

const port = process.env.PORT || 8080

app.listen(port)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${port}`)
