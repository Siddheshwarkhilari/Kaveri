import GalleryCard from '../GalleryCard';

export default function GalleryCardExample() {
  const item = {
    id: "1",
    image: "/gallery/gallery-1.webp",
    description: "Manufacturing facility showcasing our state-of-the-art production line"
  };

  return (
    <div className="max-w-md">
      <GalleryCard 
        item={item} 
        onClick={() => console.log('Gallery item clicked')} 
      />
    </div>
  );
}
