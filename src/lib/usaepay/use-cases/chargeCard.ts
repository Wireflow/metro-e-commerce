import { AxiosResponse } from 'axios';

import { ChargeResponse } from '../types';
import { makeApiRequest } from '../utils/makeApiRequest';
import { SuccessfulChargeResponse } from './chargeToken';

export interface CardChargeRequest {
  cardholder: string;
  number: string;
  expiration: string;
  cvc: string;
  avs_street: string;
  avs_zip: string;
  amount: number;
}

export const chargeCard = async (params: CardChargeRequest): Promise<SuccessfulChargeResponse> => {
  try {
    const response: AxiosResponse<ChargeResponse> = await makeApiRequest('POST', '/transactions', {
      command: 'cc:sale',
      amount: params.amount.toFixed(2),
      creditcard: {
        cardholder: params.cardholder,
        number: params.number,
        expiration: params.expiration,
        cvc: params.cvc,
        avs_street: params.avs_street,
        avs_zip: params.avs_zip,
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
    console.error('Error charging card:', error);
    throw error;
  }
};
