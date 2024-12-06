import { useQuery } from '@tanstack/react-query';

import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';

export const useBranchSettings = () => {
  const { metadata } = useUser();
  return useQuery({
    queryKey: ['branch_settings', metadata.branch_id],
    queryFn: async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('branch_settings')
        .select('*')
        .eq('branch_id', metadata?.branch_id)
        .single();

      if (error) {
        throw new Error('Failed to find branch settings');
      }
      if (!data) {
        throw new Error('Branch settings not found');
      }

      return data;
    },
  });
};
