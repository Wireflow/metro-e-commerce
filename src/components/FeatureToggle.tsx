'use client';

import { LucideIcon } from 'lucide-react';

import { Switch } from '@/components/ui/switch';

type FeatureToggleProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  switchClassName?: string;
  badge?: React.ReactNode;
  IconComponent?: React.ComponentType<{ className?: string }>;
};

const FeatureToggle = ({
  icon: Icon,
  title,
  description,
  checked,
  onCheckedChange,
  disabled,
  switchClassName,
  IconComponent,
  badge,
}: FeatureToggleProps) => {
  return (
    <div className="flex items-start py-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        {IconComponent ? (
          <IconComponent className="h-6 w-6 text-gray-600" />
        ) : (
          <Icon className="h-6 w-6 text-gray-600" />
        )}
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="flex items-center gap-1 text-sm font-medium">
              {title} {badge}
            </h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <Switch
            disabled={disabled}
            checked={checked}
            onCheckedChange={onCheckedChange}
            className={switchClassName}
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureToggle;
