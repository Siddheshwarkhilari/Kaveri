import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { AnimatePresence, m } from "motion/react";
import GalleryCollection from "@/components/gallery/GalleryCollection";
import GalleryFilters from "@/components/gallery/GalleryFilters";
import GalleryIntro from "@/components/gallery/GalleryIntro";
import PhotoViewer from "@/components/gallery/PhotoViewer";
import { filterGallery, galleryCategories, galleryPhotos, isGalleryFilter, type GalleryFilterId } from "@/data/gallery";
import { ease } from "@/lib/motion";

interface Selection {
  id: string;
  direction: number;
}

export default function Gallery() {
  const search = useSearch();
  const [, navigate] = useLocation();

  // The collection and the open photo live in the URL (?filter= and ?photo=) so both can be shared.
  const [filter, setFilter] = useState<GalleryFilterId>(() => {
    const value = new URLSearchParams(search).get("filter");
    return isGalleryFilter(value) ? value : "all";
  });
  const [selection, setSelection] = useState<Selection | null>(() => {
    const id = new URLSearchParams(search).get("photo");
    return id && galleryPhotos.some((item) => item.id === id) ? { id, direction: 1 } : null;
  });

  const photos = useMemo(() => filterGallery(galleryPhotos, filter), [filter]);
  const counts = useMemo(
    () =>
      Object.fromEntries([
        ["all", galleryPhotos.length],
        ...galleryCategories.map(({ id }) => [id, filterGallery(galleryPhotos, id).length]),
      ]) as Record<GalleryFilterId, number>,
    [],
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (filter !== "all") params.set("filter", filter);
    if (selection) params.set("photo", selection.id);
    const queryString = params.toString();
    const next = `/gallery${queryString ? `?${queryString}` : ""}`;
    if (next !== `${window.location.pathname}${window.location.search}`) navigate(next, { replace: true });
  }, [filter, selection, navigate]);

  // The viewer browses the collection on screen (or the whole gallery if the open photo isn't in it).
  const selected = selection ? galleryPhotos.find((item) => item.id === selection.id) ?? null : null;
  const browseList = selected && photos.includes(selected) ? photos : galleryPhotos;

  const open = useCallback((id: string) => setSelection({ id, direction: 1 }), []);
  const navigateTo = useCallback((id: string, direction: number) => setSelection({ id, direction }), []);
  const close = useCallback(() => setSelection(null), []);

  return (
    <div className="bg-white">
      <GalleryIntro total={galleryPhotos.length} />

      <section
        aria-label="Photographs"
        className="relative bg-steel-50 bg-[linear-gradient(to_bottom,#ffffff,#F5F7FA_8rem)]"
        data-testid="section-gallery"
      >
        <div
          aria-hidden="true"
          className="bg-blueprint-light pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_12rem,#000_85%,transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:px-10 lg:pb-32">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: ease.out }}
          >
            <GalleryFilters active={filter} counts={counts} onChange={setFilter} />
          </m.div>

          <AnimatePresence mode="wait">
            <m.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, y: 10, transition: { duration: 0.22, ease: ease.in } }}
              className="mt-10 lg:mt-14"
            >
              <GalleryCollection photos={photos} onOpen={open} />
            </m.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <PhotoViewer
            key="gallery-viewer"
            photos={browseList}
            index={browseList.indexOf(selected)}
            direction={selection?.direction ?? 1}
            onNavigate={navigateTo}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
