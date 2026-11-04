import { useCallback, useState } from "react";
import { gallerySrcSet, type GalleryPhoto } from "@/data/gallery";
import { cn } from "@/lib/utils";

interface GalleryImageProps {
  photo: GalleryPhoto;
  sizes: string;
  /** Load straight away (the first photo on screen) instead of when scrolled near. */
  priority?: boolean;
  alt?: string;
  className?: string;
}

/**
 * A gallery photo that fills its (positioned) parent. A tiny blurred copy is shown at once
 * and the full photo fades in over it when it has loaded, so frames are never blank.
 */
export default function GalleryImage({ photo, sizes, priority, alt = photo.alt, className }: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false);
  // A cached photo can finish loading before React attaches onLoad.
  const imageRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <span className={cn("absolute inset-0 overflow-hidden", className)}>
      <img
        src={photo.image.placeholder}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
        style={{ objectPosition: photo.focus }}
      />
      <img
        ref={imageRef}
        src={photo.image.medium}
        srcSet={gallerySrcSet(photo)}
        sizes={sizes}
        width={photo.image.width}
        height={photo.image.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        // React 18 only passes the lowercase attribute through.
        {...{ fetchpriority: priority ? "high" : undefined }}
        decoding="async"
        draggable={false}
        onLoad={() => setLoaded(true)}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
          loaded ? "opacity-100" : "opacity-0",
        )}
        style={{ objectPosition: photo.focus }}
      />
    </span>
  );
}
