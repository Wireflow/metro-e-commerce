import { ChevronRight, Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PLACEHOLDER_IMG_URL } from '@/data/constants';
import WithAuth from '@/features/auth/components/WithAuth';
import EditCustomPromoForm from '@/features/promotions/components/forms/EditCustomPromoForm';
import { useIsEditMode } from '@/features/promotions/hooks/useIsEditMode';
import { CustomPromotion } from '@/features/promotions/schemas/custom-promotions';

type HeroCardProps = {
  promotion: CustomPromotion;
};

const HeroCard = ({ promotion }: HeroCardProps) => {
  const isInEditMode = useIsEditMode();

  return (
    <div className="relative grid h-full min-h-[420px] flex-1 place-items-center overflow-hidden rounded-lg bg-gray-100">
      <div className="flex w-full flex-col md:flex-row">
        {/* Content Section */}
        <div className="flex-1 p-8">
          {promotion?.label && <span className="font-medium text-primary">{promotion?.label}</span>}
          <h1 className="mb-4 mt-2 text-4xl font-bold">{promotion?.title}</h1>
          {promotion?.description && (
            <p className="mb-6 whitespace-pre-line text-gray-600 sm:max-w-[500px]">
              {promotion?.description}
            </p>
          )}
          <Link href={'/shop'}>
            <Button size="lg" className="uppercase">
              {promotion?.call_to_action ?? 'SHOP NOW'}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Image Section with Background Removal */}
        <div className="relative mr-10 h-[300px] w-full md:h-auto md:w-1/2">
          {promotion?.image_url && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-full w-full">
                {/* Main Image with Mix Blend Mode */}
                <div className="absolute inset-0 mix-blend-multiply">
                  <Image
                    src={promotion.image_url ?? PLACEHOLDER_IMG_URL}
                    alt={promotion.title || 'Promotion image'}
                    priority
                    fill
                    className="max-w-[700px] object-contain mix-blend-multiply"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black, black)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black, black)',
                    }}
                  />
                </div>

                {/* Overlay for better blending */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Overlay */}
      {isInEditMode && (
        <WithAuth rules={{ requiredRole: 'admin' }}>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity">
            <EditCustomPromoForm
              promotion={promotion}
              trigger={
                <Button variant="secondary" size="lg" className="w-fit gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Promo
                </Button>
              }
            />
          </div>
        </WithAuth>
      )}
    </div>
  );
};

export default HeroCard;
