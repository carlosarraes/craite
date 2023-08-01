import type { Image } from '@/db/schema'
import elements from 'typed-html'
import ShowImage from './show-image'

type HistoryProps = {
  images: Image[]
}

const History = ({ images }: HistoryProps) => {
  return (
    <section class="flex flex-col w-full">
      <div class="flex justify-evenly items-center border-b mb-4">
        <h2>History</h2>
        <p class="text-xs">All the images that have been generated.</p>
      </div>
      <section id="images" class="flex flex-col overflow-auto max-h-[600px] space-y-4">
        {images.map((image) => (
          <ShowImage image={image} />
        ))}
      </section>
    </section>
  )
}

export default History
