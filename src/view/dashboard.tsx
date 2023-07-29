import elements from 'typed-html'

export const Dashboard = () => {
  return (
    <main class="flex flex-col items-center justify-center w-full max-w-lg">
      <header class="w-full mb-4 p-4">
        <h1 class="text-4xl text-sky-600 font-medium tracking-wide">CrAIte</h1>
      </header>
      <section class="flex flex-col p-10 w-full bg-white rounded-lg shadow-lg items-center justify-center space-y-10">
        <img
          class="w-96 h-96"
          id="show-image"
          src="https://14068d66ba387efac9ce5e4b1741bcf2.r2.cloudflarestorage.com/ai-api/07-23/3983781f-d9e1-4ec4-a45e-713cb66fa980_0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=16b502c87564788383d52ec498a61a24%2F20230729%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230729T200804Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=7bd2845a7b068c89ccd0aa59c9e888f39e3cc7cd65acf421b9d6bf1566d8ecaa"
        />
        <form
          class="w-full"
          hx-post="/images/create"
          hx-trigger="submit"
          hx-target="#content"
          _="on htmx:afterRequest reset() me"
        >
          <input
            class="w-full px-4 py-2 text-black bg-gray-100 rounded"
            type="text"
            name="content"
            id="content"
            placeholder="Search"
          />
        </form>
      </section>
    </main>
  )
}
