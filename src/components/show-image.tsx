import elements from 'typed-html'
import dayjs from 'dayjs'
import type { Image } from '@/db/schema'

type ShowImageProps = {
  image: Image
}

const ShowImage = ({ image }: ShowImageProps) => {
  return (
    <div class="flex flex-col max-w-md border-b">
      <div class="relative mx-auto">
        <img src={image.url!} alt={image.content} class="w-96 h-96 rounded" />
        <span class="absolute top-0 right-0 text-xs text-white p-2 bg-black/40 w-full rounded-t">
          Seed: {image.seed} -
          <span class="font-bold">Expires at: {dayjs(image.expiresAt).format('DD/MM/YYYY')}</span>
        </span>
        <span class="absolute bottom-0 right-0 text-xs font-bold text-red-500 p-2 ">
          {image.imageId}
        </span>
      </div>
      <span class="text-xs text-black dark:text-white p-2 my-2">{image.content}</span>
    </div>
  )
}

export default ShowImage
