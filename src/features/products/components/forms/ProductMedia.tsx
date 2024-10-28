import MultiImageUpload, { ImageFile } from '@/components/form/MultiImageUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  images: ImageFile[];
  onImagesSelect: (files: ImageFile[]) => void;
  onRemoveImage?: (imageId?: string) => void;
};

const ProductMedia = ({ images, onImagesSelect, onRemoveImage }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-2xl">Media</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-2">Photos</CardDescription>
        <MultiImageUpload
          images={images}
          onImagesSelect={onImagesSelect}
          onRemoveImage={onRemoveImage}
        />
      </CardContent>
    </Card>
  );
};

export default ProductMedia;
