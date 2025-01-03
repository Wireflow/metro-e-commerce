import ImageDropzone from '@/components/form/ImageUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  onImageSelect: (file: File | null) => void;
  image: File | null;
  previewUrl?: string;
};

const CategoryThumbnail = ({ onImageSelect, image, previewUrl }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-2xl">Thumbnail</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-2">Photo</CardDescription>
        <ImageDropzone
          onImageSelect={onImageSelect}
          image={image}
          height={244}
          previewUrl={previewUrl}
        />
      </CardContent>
    </Card>
  );
};

export default CategoryThumbnail;
