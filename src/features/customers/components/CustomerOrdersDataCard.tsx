import { ReactNode } from 'react';

type Props = {
  count: number;
  icon: ReactNode;
  title: string;
} & React.HTMLAttributes<HTMLDivElement>;

const CustomerOrdersDataCard = ({ count, icon, title, className, ...rest }: Props) => {
  return (
    <div className={`flex items-center gap-3 ${className || ''}`} {...rest}>
      <div className="m-2 bg-white p-5">{icon}</div>
      <div className="flex-flex-col gap-2">
        <p className="text-xl font-semibold">{count}</p>
        <p className="text-sm text-neutral-700">{title}</p>
      </div>
    </div>
  );
};

export default CustomerOrdersDataCard;
