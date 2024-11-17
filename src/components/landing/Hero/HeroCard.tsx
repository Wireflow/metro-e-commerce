import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

// Main Hero Card Component
interface HeroCardProps {
  label?: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

const HeroCard = ({ label, title, description, image, imageAlt }: HeroCardProps) => {
  return (
    <div className="relative flex-1 rounded-lg bg-gray-100 p-8">
      {label && <span className="font-medium text-primary">{label}</span>}
      <h1 className="mb-4 mt-2 text-4xl font-bold">{title}</h1>
      {description && <p className="mb-6 whitespace-pre-line text-gray-600">{description}</p>}
      <Button size={'lg'}>
        SHOP NOW
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default HeroCard;
