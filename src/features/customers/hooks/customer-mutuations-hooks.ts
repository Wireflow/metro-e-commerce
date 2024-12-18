import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateCustomer } from '../server/updateCustomer';

type ApproveParams = {
  id: string;
  approved: boolean;
};

type BlockParams = {
  id: string;
  blocked: boolean;
};

export const useApproveCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['approve-customer'],
    mutationFn: (params: ApproveParams) =>
      updateCustomer({ id: params.id, approved: params.approved }),
    onSuccess: (data, ctx) => {
      if (data?.success) {
        toast.success(ctx.approved ? 'Customer approved!' : 'Customer rejected!');
      } else {
        toast.error(data.error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

export const useBlockCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['block-customer'],
    mutationFn: (params: BlockParams) => updateCustomer({ id: params.id, blocked: params.blocked }),
    onSuccess: (data, ctx) => {
      if (data?.success) {
        toast.success(ctx.blocked ? 'Customer blocked!' : 'Customer unblocked!');
      } else {
        toast.error(data.error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

export const useApproveCustomerTobacco = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['approve-customer-tobacco'],
    mutationFn: (params: ApproveParams) =>
      updateCustomer({ id: params.id, approved_tobacco: params.approved }),
    onSuccess: (data, ctx) => {
      if (data?.success) {
        toast.success(ctx.approved ? 'Customer Approved!' : 'Customer Rejected!');
      } else {
        toast.error(data.error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};

export const useResetApprovalDocuments = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['reset-approval-documents'],
    mutationFn: ({ id }: { id: string }) =>
      updateCustomer({
        id: id,
        approved_tobacco: false,
        approved: false,
        tobacco_license: null,
        tax_id: null,
        tobacco_license_image_url: null,
        tax_id_image_url: null,
      }),
    onSuccess: (data, ctx) => {
      if (data?.success) {
        toast.success('Reset approval documents!');
      } else {
        toast.error(data.error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};
