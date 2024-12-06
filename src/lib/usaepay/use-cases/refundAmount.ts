import { AxiosResponse } from 'axios';

import { ChargeResponse } from '../types';
import { makeApiRequest } from '../utils/makeApiRequest';

/**
 * Processes a refund for a transaction that has already been settled.
 * For unsettled transactions, use voidTransaction instead.
 */

export interface RefundRequest {
  tranKey: string;
  amount: string;
}

export interface RefundResponse {
  status: string;
  refnum?: string;
  key?: string;
  amount?: string;
}

export const refundTransaction = async (params: RefundRequest): Promise<RefundResponse> => {
  try {
    const response: AxiosResponse<ChargeResponse> = await makeApiRequest('POST', '/transactions', {
      command: 'refund',
      trankey: params.tranKey,
      amount: params.amount,
    });

    if (response.data && response.data.result === 'Approved') {
      return {
        status: 'success',
        refnum: response.data.refnum,
        key: response.data.key,
        amount: params.amount,
      };
    } else {
      throw new Error('Refund failed');
    }
  } catch (error) {
    console.error('Error refunding transaction:', error);
    throw error;
  }
};
