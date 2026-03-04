import Image from 'next/image'

interface MosaicStripProps {
  height?: number
  className?: string
}

export function MosaicStrip({ height = 100, className = '' }: MosaicStripProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <Image
        src="/assets/mosaic.png"
        alt=""
        fill
        className="object-cover object-center"
        priority={false}
        sizes="100vw"
      />
    </div>
  )
}
