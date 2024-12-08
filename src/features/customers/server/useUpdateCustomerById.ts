import { useMutation } from '@tanstack/react-query';

import { updateCustomerInfo } from './UpdateCustomerInfo';

export const useUpdateCustomerById = () => {
  return useMutation({
    mutationKey: ['update-customer'],
    mutationFn: updateCustomerInfo,
  });
};
