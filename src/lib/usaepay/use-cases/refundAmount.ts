'use server';

import { AxiosResponse } from 'axios';

import { ChargeResponse } from '../types';
import { makeApiRequest } from '../utils/makeApiRequest';

export interface CardChargeRequest {
  tranKey: string;
  amount: string;
}

export const refundAmount = async (
  params: CardChargeRequest
): Promise<{
  status: string;
  amount?: string;
  errorMessage?: string;
  errorCode?: string;
}> => {
  try {
    const response: AxiosResponse<ChargeResponse> = await makeApiRequest('POST', '/transactions', {
      command: 'refund',
      trankey: params.tranKey,
      amount: params.amount,
    });

    if (response.data && response.data.result === 'Approved') {
      return {
        status: 'success',
        amount: params.amount,
      };
    } else {
      return {
        status: 'error',
        errorMessage: 'Refund failed',
        errorCode: 'unknown',
      };
    }
  } catch (error) {
    console.error('Error refunding transaction:', error);
    throw error;
  }
};
