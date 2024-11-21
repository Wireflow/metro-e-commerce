import Image from 'next/image';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  imagesUrls: string[];
};

const MultiImageViewer = ({ imagesUrls }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex(prev => (prev === imagesUrls.length - 1 ? 0 : prev + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? imagesUrls.length - 1 : prev - 1));
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full">
      <div className="relative aspect-square w-full">
        <Image
          src={imagesUrls[currentIndex]}
          alt={`Product image ${currentIndex + 1}`}
          className="object-contain p-4"
          fill
        />

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={goToNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {imagesUrls.map((url, index) => (
          <button
            key={url}
            onClick={() => goToIndex(index)}
            className={cn(
              'relative aspect-square h-16 w-16 flex-shrink-0 overflow-hidden rounded border-2',
              currentIndex === index ? 'border-primary' : 'border-transparent'
            )}
          >
            <Image src={url} alt={`Thumbnail ${index + 1}`} className="object-contain p-1" fill />
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiImageViewer;
