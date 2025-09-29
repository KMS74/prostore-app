"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
};

const ProductImages = ({ images }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image
        className="min-h-[300px] object-cover object-center"
        src={images[currentImage]}
        alt="product image"
        height={1000}
        width={1000}
      />

      <div className="flex gap-2">
        {images.map((image, index) => (
          <div key={image}>
            <Image
              className={cn(
                "mr-2 cursor-pointer rounded-md border transition-transform hover:scale-105 hover:border-orange-600",
                index === currentImage && "border-orange-500 shadow-md",
              )}
              src={image}
              width={100}
              height={100}
              alt="product image"
              onClick={() => setCurrentImage(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
