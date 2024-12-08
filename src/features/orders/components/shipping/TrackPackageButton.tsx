import { ExternalLink } from 'lucide-react';

import { Button, ButtonProps } from '@/components/ui/button';

type TrackPackageButtonProps = ButtonProps & {
  trackingUrl: string;
};

const TrackPackageButton = ({ trackingUrl, ...props }: TrackPackageButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-6 p-0"
      onClick={() => window.open(trackingUrl, '_blank')}
      {...props}
    >
      Track Package <ExternalLink className="ml-1 h-3 w-3" />
    </Button>
  );
};

export default TrackPackageButton;
