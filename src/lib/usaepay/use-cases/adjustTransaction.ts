import { AxiosResponse } from 'axios';

import { ChargeResponse } from '../types';
import { makeApiRequest } from '../utils/makeApiRequest';

/**
 * Adjusts the amount of an existing authorization before capture.
 * Can be used to increase or decrease the authorized amount.
 */

export interface AdjustRequest {
  tranKey: string;
  amount: string;
}

export interface AdjustResponse {
  status: string;
  refnum?: string;
  key?: string;
  amount?: string;
}

export const adjustTransaction = async (params: AdjustRequest): Promise<AdjustResponse> => {
  try {
    const response: AxiosResponse<ChargeResponse> = await makeApiRequest('POST', '/transactions', {
      command: 'cc:adjust',
      trankey: params.tranKey,
      amount: params.amount,
    });

    if (response.data && response.data.result === 'Approved') {
      return {
        status: 'success',
        refnum: response.data.refnum,
        key: response.data.key,
        amount: response.data.auth_amount,
      };
    } else {
      throw new Error('Adjustment failed');
    }
  } catch (error) {
    console.error('Error adjusting transaction:', error);
    throw error;
  }
};
