import { AxiosResponse } from 'axios';

import { ChargeResponse } from '../types';
import { makeApiRequest } from '../utils/makeApiRequest';

/**
 * Captures a previously authorized transaction. Used to capture funds from a credit/debit card
 * after an authorization has been obtained. Can capture full or partial amounts.
 */
export interface CaptureRequest {
  tranKey: string;
  amount?: string;
}

export interface CaptureResponse {
  status: string;
  refnum?: string;
  key?: string;
  amount?: string;
}

export const captureTransaction = async (params: CaptureRequest): Promise<CaptureResponse> => {
  try {
    const response: AxiosResponse<ChargeResponse> = await makeApiRequest('POST', '/transactions', {
      command: 'cc:capture',
      trankey: params.tranKey,
      ...(params.amount && { amount: params.amount }),
    });

    if (response.data && response.data.result === 'Approved') {
      return {
        status: 'success',
        refnum: response.data.refnum,
        key: response.data.key,
        amount: response.data.auth_amount,
      };
    } else {
      throw new Error('Capture failed');
    }
  } catch (error) {
    console.error('Error capturing transaction:', error);
    throw error;
  }
};
