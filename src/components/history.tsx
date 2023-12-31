import type { Image } from '@/db/schema'
import elements from 'typed-html'
import ShowImage from './show-image'

type HistoryProps = {
  images: Image[]
  off: number
  hasNext: boolean
}

const History = ({ images, off, hasNext }: HistoryProps) => {
  const next = off + 10
  const prev = off <= 0 ? 0 : off - 10

  const hasPrev = off > 0

  return (
    <section
      id="history"
      class="w-full sm:w-96 h-[600px] flex flex-col justify-center items-center gap-2"
    >
      <div class="flex justify-between w-full items-center border-b mb-4 text-black dark:text-white">
        <h2>History</h2>
        <p class="text-xs hidden sm:block self-center">All the images that have been generated.</p>
      </div>
      <section id="images" class="flex flex-col overflow-auto max-h-[600px] space-y-4">
        {images.map((image) => (
          <ShowImage image={image} />
        ))}
      </section>
      <nav class="flex justify-around w-full items-center mt-4 text-black dark:text-white">
        <button
          hx-get={`/history/${prev}`}
          hx-target="#history"
          hx-swap="outerHTML"
          hx-trigger="click"
          {...(!hasPrev && { disabled: '' })}
          class="text-xs cursor-pointer enabled:hover:underline self-start disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <div>
          <span class="text-xs self-center flex justify-center items-center">
            Showing {off + 1} - {off + images.length}
          </span>
        </div>
        <button
          hx-get={`/history/${next}`}
          hx-target="#history"
          hx-swap="outerHTML"
          hx-trigger="click"
          class="text-xs cursor-pointer enabled:hover:underline self-start disabled:opacity-50 disabled:cursor-not-allowed"
          {...(!hasNext && { disabled: '' })}
        >
          Next
        </button>
      </nav>
    </section>
  )
}

export default History
