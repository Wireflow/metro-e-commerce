import { AxiosResponse } from 'axios';

import { ChargeResponse } from '../types';
import { makeApiRequest } from '../utils/makeApiRequest';

/**
 * Voids a transaction that has not yet been settled. This cancels the transaction
 * and releases the authorization hold on the customer's card.
 */
export interface VoidRequest {
  tranKey: string;
}

export interface VoidResponse {
  status: string;
  refnum?: string;
  key?: string;
}

export const voidTransaction = async (params: VoidRequest): Promise<VoidResponse> => {
  try {
    const response: AxiosResponse<ChargeResponse> = await makeApiRequest('POST', '/transactions', {
      command: 'void',
      trankey: params.tranKey,
    });

    if (response.data && response.data.result === 'Approved') {
      return {
        status: 'success',
        refnum: response.data.refnum,
        key: response.data.key,
      };
    } else {
      throw new Error('Void failed');
    }
  } catch (error) {
    console.error('Error voiding transaction:', error);
    throw error;
  }
};
