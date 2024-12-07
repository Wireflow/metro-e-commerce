'use client';

import { useRouter } from 'next/navigation';

import { Button, ButtonProps } from './ui/button';

type Props = ButtonProps & {
  href?: string;
};

const BackButton = ({ href, ...props }: Props) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button onClick={handleGoBack} {...props} variant={'ghost'}>
      {props.children ?? 'Back'}
    </Button>
  );
};

export default BackButton;
