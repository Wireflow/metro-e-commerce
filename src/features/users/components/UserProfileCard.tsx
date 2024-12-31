import {
  CalendarClock,
  Car,
  Mail,
  Phone,
  Shield,
  ShieldAlert,
  Store,
  UserCircle,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Row } from '@/types/supabase/table';

import { useUpdateSalesStatus } from '../hooks/mutations/useUpdateSalesStatus';

type Props = {
  user: Row<'users'>;
};

const UserProfileCard = ({ user }: Props) => {
  const { mutate: updateUserStatus } = useUpdateSalesStatus();
  const [blocked, setBlocked] = useState(user.blocked);

  const handleBlockedChange = (value: boolean) => {
    if (blocked === value) return;
    setBlocked(value);
    updateUserStatus({
      blocked: value,
      sales_id: user.id,
    });
  };

  console.log(blocked);

  const roleConfig = {
    admin: {
      icon: Shield,
      color: 'bg-red-100 text-red-800 border-red-300',
      label: 'Administrator',
    },
    driver: {
      icon: Car,
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      label: 'Driver',
    },
    sales: {
      icon: Store,
      color: 'bg-green-100 text-green-800 border-green-300',
      label: 'Sales Representative',
    },
    independent_sales: {
      icon: UserCircle,
      color: 'bg-purple-100 text-purple-800 border-purple-300',
      label: 'Independent Sales',
    },
  };

  const RoleIcon = roleConfig[user.role]?.icon || UserCircle;
  const roleColor = roleConfig[user.role]?.color || 'bg-gray-100 text-gray-800 border-gray-300';
  const roleLabel = roleConfig[user.role]?.label || 'User';

  return (
    <Card className="shadow-none lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl font-bold">
                {user.first_name?.[0]?.toUpperCase()}
                {user.last_name?.[0]?.toUpperCase()}
              </span>
            </div>
            {blocked && (
              <div className="absolute -bottom-1 -right-1 rounded-full bg-red-100 p-1">
                <ShieldAlert className="h-4 w-4 text-red-600" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle>
                {user.first_name} {user.last_name}
              </CardTitle>
              <Badge variant="outline" className={`ml-2 ${roleColor}`}>
                <RoleIcon className="mr-1 h-3 w-3" />
                {roleLabel}
              </Badge>
            </div>
            <CardDescription className="mt-1">ID: {user.id.slice(0, 8)}</CardDescription>
          </div>
        </div>
        <Switch onCheckedChange={() => handleBlockedChange(!blocked)} checked={blocked} />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 opacity-70" />
            <span className="text-sm">{user.email}</span>
          </div>
          {user.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 opacity-70" />
              <span className="text-sm">{user.phone}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 opacity-70" />
            <span className="text-sm">Joined {new Date(user.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="mt-4 flex flex-wrap gap-2">
          {blocked && (
            <Badge variant="outline" className="bg-red-50 text-red-700">
              <ShieldAlert className="mr-1 h-3 w-3" />
              Account Blocked
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
