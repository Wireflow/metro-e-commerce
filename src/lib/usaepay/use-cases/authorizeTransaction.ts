import { AxiosResponse } from 'axios';

import { ChargeResponse } from '../types';
import { makeApiRequest } from '../utils/makeApiRequest';

export interface AuthorizeRequest {
  cardholder: string;
  number: string;
  expiration: string;
  cvc: string;
  avs_street: string;
  avs_zip: string;
  amount: number;
}

export interface AuthorizeTokenRequest {
  token: string;
  cvc?: string;
  amount: number;
}

export interface AuthorizeResponse {
  refId: string;
  tranKey: string;
  amount: string;
  status: 'success' | 'error';
  lastFour: number;
  error?: string;
}

export const authorizeCard = async (params: AuthorizeRequest): Promise<AuthorizeResponse> => {
  try {
    const response: AxiosResponse<ChargeResponse> = await makeApiRequest('POST', '/transactions', {
      command: 'authonly',
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
      return {
        refId: response.data.refnum || '',
        amount: params.amount.toFixed(2),
        tranKey: response.data.key || '',
        status: 'error',
        lastFour: parseInt(response.data.creditcard?.number?.slice(-4) || '0'),
        error: response.data.result,
      };
    }
  } catch (error) {
    console.error('Error authorizing card:', error);
    return {
      refId: '',
      amount: params.amount.toFixed(2),
      tranKey: '',
      status: 'error',
      lastFour: 0,
    };
  }
};

export const authorizeToken = async (params: AuthorizeTokenRequest): Promise<AuthorizeResponse> => {
  try {
    const response: AxiosResponse<ChargeResponse> = await makeApiRequest('POST', '/transactions', {
      command: 'authonly',
      amount: params.amount.toFixed(2),
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
      return {
        refId: response.data.refnum || '',
        amount: params.amount.toFixed(2),
        tranKey: response.data.key || '',
        status: 'error',
        lastFour: parseInt(response.data.creditcard?.number?.slice(-4) || '0'),
        error: response.data.result,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      refId: '',
      amount: params.amount.toFixed(2),
      tranKey: '',
      status: 'error',
      lastFour: 0,
      error: 'Failed to authorize transaction',
    };
  }
};
