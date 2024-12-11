import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Dialog, DialogContent } from '../ui/dialog';

type ImageViewerProps = {
  src: string;
  alt: string;
  className?: string;
};

const ImageViewer = ({ src, alt, className }: ImageViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={100}
        height={100}
        className={`cursor-pointer rounded-md border transition-opacity hover:opacity-90 ${className}`}
        onClick={() => setIsOpen(true)}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="h-[90vh] max-w-[95vw] border-none bg-transparent p-0 shadow-none md:max-w-[85vw]">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-50 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-background"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="relative h-full w-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 95vw, 85vw"
              priority
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageViewer;
