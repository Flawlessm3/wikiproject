import Image from 'next/image'

interface ImageBlockProps {
  src: string
  alt: string
  caption?: string
}

export function ImageBlock({ src, alt, caption }: ImageBlockProps) {
  if (!src) {
    return (
      <figure className="my-6 rounded-lg border border-dashed border-border bg-bg-elevated p-8 text-center">
        <span className="text-text-muted text-sm">Изображение не указано</span>
      </figure>
    )
  }
  return (
    <figure className="my-6">
      {/* Use a regular img to support external URLs */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="rounded-lg border border-border w-full object-cover"
      />
      {caption && (
        <figcaption className="text-xs text-text-muted text-center mt-2 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
