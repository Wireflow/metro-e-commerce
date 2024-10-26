import Image from 'next/image';

import { ChevronLeft, ChevronRight, Upload, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { Button } from '../ui/button';

type ImageFile = {
  file: File;
  preview: string;
  id: number;
};

type Props = {
  onImagesSelect: (files: ImageFile[]) => void;
  onRemoveImage?: (imageId?: number) => void;
  images: ImageFile[];
};

const MultiImageUpload = ({ onImagesSelect, images, onRemoveImage }: Props) => {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>(images);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const img = selectedImages.find((_, i) => i === index);

    if (img && onRemoveImage) {
      onRemoveImage(img?.id);
    }

    setSelectedImages(newImages);
    onImagesSelect(newImages);

    if (mainImageIndex >= newImages.length) {
      setMainImageIndex(newImages.length - 1);
    } else if (mainImageIndex === index && newImages.length > 0) {
      setMainImageIndex(0);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        id: Math.floor(1000000000 + Math.random() * 9000000000),
        file,
        preview: URL.createObjectURL(file),
      }));

      const updatedImages = [...selectedImages, ...newFiles];
      setSelectedImages(updatedImages);
      onImagesSelect(updatedImages);
    }
  };

  const nextImage = () => {
    setMainImageIndex(prev => (prev < selectedImages.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    setMainImageIndex(prev => (prev > 0 ? prev - 1 : selectedImages.length - 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    trackMouse: true,
  });

  useEffect(() => {
    setSelectedImages(images);
  }, [images]);

  useEffect(() => {
    return () => {
      selectedImages.forEach(img => URL.revokeObjectURL(img.preview));
    };
  }, [selectedImages]);

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap">
      <div className="mb-4 w-full">
        <div className="relative h-[200px] w-full md:h-[300px]" {...handlers}>
          {selectedImages.length > 0 ? (
            <Image
              key={selectedImages[mainImageIndex]?.id}
              src={selectedImages[mainImageIndex]?.preview}
              alt={`Main preview ${mainImageIndex + 1}`}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">No image selected</p>
            </div>
          )}
          {selectedImages.length > 1 && (
            <>
              <Button
                type="button"
                className="absolute left-2 top-1/2 -translate-y-1/2 transform px-3 opacity-75"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 transform px-3 opacity-75"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedImages.map((img, index) => (
          <div key={img.id} className="relative h-[4.9rem] w-[4.9rem] flex-shrink-0">
            <Image
              src={img.preview}
              alt={`Thumbnail ${index + 1}`}
              layout="fill"
              objectFit="contain"
              className={`cursor-pointer rounded-lg ${
                mainImageIndex === index ? 'border-2 border-blue-500' : ''
              }`}
              onClick={() => setMainImageIndex(index)}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -right-1 -top-1 z-20 h-5 w-5"
              onClick={() => handleRemoveImage(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        <div
          className="flex h-20 w-20 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-6 w-6 text-gray-400" />
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
};

export default MultiImageUpload;
