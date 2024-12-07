import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddressesList from '@/features/checkout/components/addresses/AddressesList';
import { Row } from '@/types/supabase/table';

type Props = {
  address: Row<'addresses'>[];
  title: string;
  showForm?: boolean;
  showOptions?: boolean;
};

const AddressesCardContainer = ({ address, title, showForm = true, showOptions = true }: Props) => {
  return (
    <Card className="flex flex-col gap-5 shadow-none">
      <CardHeader className="border-b">
        <CardTitle className="font-medium capitalize">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <AddressesList
          showForm={showForm}
          cardOptions={{ showAction: false, showTitle: false, showOptions: showOptions }}
          addresses={address}
        />
      </CardContent>
    </Card>
  );
};

export default AddressesCardContainer;
