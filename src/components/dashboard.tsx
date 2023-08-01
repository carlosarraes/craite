import elements from 'typed-html'

// Dashboard component
export const Dashboard = () => {
  return (
    <section
      id="section-content"
      class="flex flex-col p-6 w-full rounded-lg shadow-lg items-center justify-center space-y-10 bg-transparent"
    >
      <div
        hx-get="/show"
        hx-swap="innerHTML"
        hx-trigger="load delay:2s"
        class="w-full sm:w-96 h-96 flex justify-center items-center gap-2"
      >
        <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse self-center"></div>
        <span class="text-xs self-center">Loading...</span>
      </div>
      <form
        class="w-full max-w-md flex flex-col justify-center items-center"
        hx-post="/images/create"
        hx-trigger="submit"
        hx-target="#image-id"
        hx-swap="outerHTML"
        _="on htmx:afterRequest reset() me"
      >
        <input
          class="w-full px-4 py-2 text-black bg-gray-100 rounded dark:bg-gray-600 dark:placeholder:text-gray-300 dark:text-white"
          type="text"
          name="content"
          id="content"
          placeholder="Type your prompt here and press enter"
        />
        <div
          id="image-id"
          class="flex justify-between items-center text-xs mt-2 text-dark dark:text-white"
        >
          Your image ID will show up here :)
        </div>
      </form>
    </section>
  )
}
