import { formatDate } from 'date-fns';

type Props = {
  expectedDate: Date;
  className?: string;
};

const ExpectedDelivery = ({ expectedDate, className }: Props) => {
  return (
    <div className={className}>
      <p className="text-sm text-neutral-600">
        Order expected arrival{' '}
        <span className="font-semibold">{formatDate(expectedDate, 'MMMM d, yyyy')}</span>
      </p>
    </div>
  );
};

export default ExpectedDelivery;
