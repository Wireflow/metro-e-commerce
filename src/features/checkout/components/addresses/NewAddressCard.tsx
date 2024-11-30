import { Plus } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type NewAddressCardProps = {
  onClick?: () => void;
};

const NewAddressCard = ({ onClick }: NewAddressCardProps) => {
  return (
    <Card
      onClick={() => onClick?.()}
      className="group relative cursor-pointer shadow-none transition-all duration-300 hover:border-primary hover:shadow-lg"
    >
      <CardHeader>
        <CardTitle className="text-center font-medium capitalize text-gray-700 group-hover:text-primary">
          New Billing Address
        </CardTitle>
      </CardHeader>
      <CardContent className="grid place-items-center pb-8">
        <div className="rounded-full bg-gray-100 p-3 transition-all duration-300 group-hover:bg-blue-100">
          <Plus className="h-7 w-7 text-gray-500 transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
        </div>
      </CardContent>
    </Card>
  );
};

export default NewAddressCard;
