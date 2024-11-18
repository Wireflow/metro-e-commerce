import { useSearchParams } from 'next/navigation';

export const useIsEditMode = () => {
  const params = useSearchParams();
  return params.get('edit') === 'true';
};
