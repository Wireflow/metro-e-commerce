'use client';

import Image from 'next/image';

import { Upload, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  onImageSelect: (file: File | null) => void;
  image: File | null;
  previewUrl?: string;
  height?: number;
  className?: string;
  fileExtension?: string;
};

const ImageDropzone = ({
  onImageSelect,
  image,
  previewUrl: defaultPreview,
  height = 200,
  className,
  fileExtension,
}: Props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(image || null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultPreview || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageSelect(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Validate file extension if specified
      if (fileExtension && !file.name.toLowerCase().endsWith(`.${fileExtension.toLowerCase()}`)) {
        setError(`Invalid file type. Expected: .${fileExtension}`);
        return;
      }

      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      // Validate file extension if specified
      if (fileExtension && !file.name.toLowerCase().endsWith(`.${fileExtension.toLowerCase()}`)) {
        setError(`Invalid file type. Expected: .${fileExtension}`);
        return;
      }

      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setError(null);
    }
  };

  useEffect(() => {
    onImageSelect(selectedImage);
  }, [selectedImage, onImageSelect]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="w-full">
      <Card
        style={{ height }}
        className={`relative flex w-full cursor-pointer items-center justify-center overflow-hidden border-2 border-dashed bg-muted hover:border-muted-foreground/50 ${className}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <>
            <Image
              src={previewUrl}
              alt="Preview"
              layout="fill"
              objectFit="contain"
              className="object-contain p-4 mix-blend-multiply"
              style={{
                maskImage: 'linear-gradient(to bottom, black, black)',
                WebkitMaskImage: 'linear-gradient(to bottom, black, black)',
              }}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 z-10"
              onClick={e => {
                e.stopPropagation();
                handleRemoveImage();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <CardContent className="flex h-full flex-col items-center justify-center space-y-2 px-2 py-4 text-xs">
            <div className="flex justify-center text-muted-foreground">
              <Upload className="mx-auto mr-2 mt-1 h-5 w-5" />
              <span className="mt-2 font-medium">Drag File to Upload or</span>
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
        )}
      </Card>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept={fileExtension ? `.${fileExtension}` : 'image/*'}
        className="hidden"
      />
    </div>
  );
};

export default ImageDropzone;
