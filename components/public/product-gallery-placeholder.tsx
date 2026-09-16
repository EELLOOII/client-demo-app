"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useState } from "react";

interface ProductGalleryPlaceholderProps {
  images?: string[];
  productName: string;
}

export function ProductGalleryPlaceholder({ images = [], productName }: ProductGalleryPlaceholderProps) {
  const usableImages = images.filter((image) => image && !image.includes("placeholder-product.svg"));
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section aria-labelledby="product-image-heading" className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      {usableImages.length ? <>
        <div className="relative aspect-[4/3] bg-background">
          <Image alt={`${productName} image ${selectedImage + 1}`} className="object-cover" fill priority src={usableImages[selectedImage]} unoptimized />
        </div>
        {usableImages.length > 1 ? <div className="flex gap-3 overflow-x-auto border-t p-3">{usableImages.map((image, index) => <button aria-label={`Show image ${index + 1}`} aria-pressed={selectedImage === index} className={`relative size-16 shrink-0 overflow-hidden rounded-lg border-2 ${selectedImage === index ? "border-primary" : "border-transparent"}`} key={`${image}-${index}`} onClick={() => setSelectedImage(index)} type="button"><Image alt="" className="object-cover" fill src={image} unoptimized /></button>)}</div> : null}
      </> : <>
        <div className="flex aspect-[4/3] items-center justify-center bg-muted px-6 text-center">
          <div>
            <ImageOff aria-hidden="true" className="mx-auto size-12 text-primary" />
            <h2 id="product-image-heading" className="mt-4 text-lg font-semibold">Product image unavailable</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Images for {productName} are not currently available.</p>
          </div>
        </div>
        <p className="border-t px-5 py-3 text-sm text-muted-foreground">Product image unavailable</p>
      </>}
    </section>
  );
}
