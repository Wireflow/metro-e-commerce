import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return <div className={cn('px-4 py-4 lg:mx-auto lg:max-w-[1400px]', className)}>{children}</div>;
};

export default Container;
