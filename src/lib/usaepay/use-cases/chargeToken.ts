'use server';

import { AxiosResponse } from 'axios';

import { TokenType } from '@/types/payment';

import { ChargeResponse } from '../types';
import { makeApiRequest } from '../utils/makeApiRequest';

export interface SuccessfulChargeResponse {
  refId: string;
  tranKey: string;
  amount: string;
  status: string;
  lastFour: number;
}

export const chargeToken = async (params: TokenType): Promise<SuccessfulChargeResponse> => {
  try {
    const response: AxiosResponse<ChargeResponse> = await makeApiRequest('POST', '/transactions', {
      command: 'cc:sale',
      amount: parseFloat(params.amount).toFixed(2), // Convert cents to dollars and ensure 2 decimal places
      creditcard: {
        number: params.token,
        cvc: params.cvc,
      },
    });

    if (response.data && response.data.result === 'Approved') {
      return {
        refId: response.data.refnum,
        amount: response.data.auth_amount,
        tranKey: response.data.key,
        status: 'success',
        lastFour: parseInt(response.data.creditcard.number.slice(-4)),
      };
    } else {
      throw new Error('Transaction failed');
    }
  } catch (error) {
    console.error('Error charging token:', error);
    throw error;
  }
};
