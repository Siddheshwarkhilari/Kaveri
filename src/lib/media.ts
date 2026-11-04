/** A responsive photograph with optimised copies (see scripts/optimize-images.ps1). */
export interface Photo {
  large: string;
  medium: string;
  width: number;
  height: number;
  alt: string;
}

export const photoSrcSet = (photo: Photo) => `${photo.medium} 900w, ${photo.large} 1600w`;
