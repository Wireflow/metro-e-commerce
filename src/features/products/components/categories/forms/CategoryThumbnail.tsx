import ImageDropzone from '@/components/form/ImageUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  onImageSelect: (file: File | null) => void;
  image: File | null;
};

const CategoryThumbnail = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-2xl">Thumbnail</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-2">Photo</CardDescription>
        <ImageDropzone {...props} height={244} />
      </CardContent>
    </Card>
  );
};

export default CategoryThumbnail;
