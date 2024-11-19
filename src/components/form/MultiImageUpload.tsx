import Image from 'next/image';

import { ChevronLeft, ChevronRight, Upload, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export type ImageFile = {
  file?: File;
  preview: string;
  id: string;
};

type Props = {
  onImagesSelect: (files: ImageFile[]) => void;
  onRemoveImage?: (imageId: string) => void;
  images: ImageFile[];
  className?: string;
  fileExtension?: string;
};

const MultiImageUpload = ({
  onImagesSelect,
  images,
  onRemoveImage,
  className,
  fileExtension,
}: Props) => {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>(images);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previousUrlsRef = useRef<string[]>([]);

  const handleRemoveImage = (index: number) => {
    const imgToRemove = selectedImages[index];
    const newImages = selectedImages.filter((_, i) => i !== index);

    if (imgToRemove && onRemoveImage) {
      onRemoveImage(imgToRemove.id);
      // Only revoke if it's a local preview URL
      if (imgToRemove.file) {
        URL.revokeObjectURL(imgToRemove.preview);
      }
    }

    setSelectedImages(newImages);
    onImagesSelect(newImages);

    if (mainImageIndex >= newImages.length) {
      setMainImageIndex(newImages.length - 1);
    } else if (mainImageIndex === index && newImages.length > 0) {
      setMainImageIndex(0);
    }
  };

  const handleFiles = (files: FileList) => {
    // Validate file extension if specified
    const invalidFiles = Array.from(files).filter(
      file => fileExtension && !file.name.toLowerCase().endsWith(`.${fileExtension.toLowerCase()}`)
    );

    if (invalidFiles.length > 0) {
      setError(`Invalid file type. Expected: .${fileExtension}`);
      return;
    }

    const newFiles = Array.from(files).map(file => ({
      id: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      file,
      preview: URL.createObjectURL(file),
    }));

    const updatedImages = [...selectedImages, ...newFiles];
    setSelectedImages(updatedImages);
    onImagesSelect(updatedImages);
    // Set the main image index to show the last uploaded image
    setMainImageIndex(updatedImages.length - 1);
    setError(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFiles(event.target.files);
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

  // Handle initial images and updates from props
  useEffect(() => {
    // Revoke any URLs that are no longer in use
    previousUrlsRef.current.forEach(url => {
      if (!images.some(img => img.preview === url)) {
        URL.revokeObjectURL(url);
      }
    });

    // Store current URLs for next cleanup
    previousUrlsRef.current = images
      .filter(img => img.file) // Only store URLs for local files
      .map(img => img.preview);

    setSelectedImages(images);
  }, [images]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Only revoke URLs for local file previews
      selectedImages
        .filter(img => img.file)
        .forEach(img => {
          URL.revokeObjectURL(img.preview);
        });
    };
  }, [selectedImages]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full">
        <div className="relative h-[200px] w-full md:h-[300px]" {...handlers}>
          {selectedImages.length > 0 ? (
            <Image
              key={selectedImages[mainImageIndex]?.id}
              src={selectedImages[mainImageIndex]?.preview}
              alt={`Main preview ${mainImageIndex + 1}`}
              layout="fill"
              objectFit="contain"
              className="rounded-lg object-contain p-4 mix-blend-multiply"
              style={{
                maskImage: 'linear-gradient(to bottom, black, black)',
                WebkitMaskImage: 'linear-gradient(to bottom, black, black)',
              }}
            />
          ) : (
            <Card
              className={`h-full border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50 ${className}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <CardContent className="flex h-full flex-col items-center justify-center space-y-2 px-2 py-4 text-xs">
                <div className="flex items-center justify-center text-muted-foreground">
                  <span className="font-medium">Drag Files to Upload or</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto flex h-8 space-x-2 px-0 pl-1 text-xs"
                    type="button"
                  >
                    Click Here
                  </Button>
                </div>
                {error && <span className="text-red-500">{error}</span>}
              </CardContent>
            </Card>
          )}
          {selectedImages.length > 1 && (
            <>
              <Button
                type="button"
                className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full px-3 opacity-75"
                onClick={prevImage}
                variant={'outline'}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full px-3 opacity-75"
                onClick={nextImage}
                variant={'outline'}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedImages.map((img, index) => (
          <div key={img.id} className="relative h-20 w-20 flex-shrink-0">
            <Image
              src={img.preview}
              alt={`Thumbnail ${index + 1}`}
              layout="fill"
              objectFit="contain"
              className={`cursor-pointer rounded-lg object-contain p-4 mix-blend-multiply ${
                mainImageIndex === index ? 'border-2 border-blue-500' : ''
              }`}
              onClick={() => setMainImageIndex(index)}
              style={{
                maskImage: 'linear-gradient(to bottom, black, black)',
                WebkitMaskImage: 'linear-gradient(to bottom, black, black)',
              }}
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
        <Card
          className={`flex h-20 w-20 flex-shrink-0 border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50 ${className}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="full flex w-full items-center justify-center p-0">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={fileExtension ? `.${fileExtension}` : 'image/*'}
        multiple
        className="hidden"
      />
    </div>
  );
};

export default MultiImageUpload;
