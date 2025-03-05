import { useState } from 'react';

const images = [
  'https://fakeimg.pl/300/?text=1',
  'https://fakeimg.pl/300/?text=2',
  'https://fakeimg.pl/300/?text=3',
  'https://fakeimg.pl/300/?text=4',
];
export default function ProductImageCard() {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full rounded-lg shadow-lg aspect-square">
        <img src={mainImage} alt="Product" className="w-full h-full object-cover" />
      </div>

      <div className="w-full flex gap-2 mt-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className="w-[calc(25%-6px)] border rounded-md object-cover cursor-pointer aspect-square"
            onMouseEnter={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
