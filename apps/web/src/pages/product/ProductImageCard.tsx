import { useEffect, useState } from 'react';

interface ImagesProps {
  images: {
    imageId: string;
    imageUrl: string;
    mainImage: string | null;
  }[];
}

export default function ProductImageCard({ images }: ImagesProps) {
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (images.length > 0) {
      const newMainImage =
        images.find((img) => img.mainImage === '1')?.imageUrl || images[0]?.imageUrl || '';
      setMainImage(newMainImage);
    }
  }, [images]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full rounded-lg shadow-lg aspect-square">
        {mainImage && <img src={mainImage} alt="Product" className="w-full h-full object-cover" />}
      </div>
      <div className="w-full flex gap-2 mt-4">
        {images.map((img) => (
          <img
            key={img.imageId}
            src={img.imageUrl}
            alt={`Thumbnail ${img.imageId}`}
            className="w-[calc(25%-6px)] border rounded-md object-cover cursor-pointer aspect-square"
            onMouseEnter={() => setMainImage(img.imageUrl)}
          />
        ))}
      </div>
    </div>
  );
}
