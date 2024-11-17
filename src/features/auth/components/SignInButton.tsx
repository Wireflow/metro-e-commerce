import Link from 'next/link';

import { Button, ButtonProps } from '@/components/ui/button';

type Props = ButtonProps & {
  text?: string;
};

const SignInButton = ({ text = 'Sign in', ...props }: Props) => {
  return (
    <Link href={'/customers/sign-in'}>
      <Button {...props}>{text}</Button>
    </Link>
  );
};

export default SignInButton;
