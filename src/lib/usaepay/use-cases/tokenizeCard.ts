'use server';

import { AxiosResponse } from 'axios';

import { CardDetails } from '@/types/card';

import { TokenResponse } from '../types';
import { makeApiRequest } from '../utils/makeApiRequest';

export const tokenizeCard = async (cardDetails: CardDetails): Promise<TokenResponse> => {
  try {
    const response: AxiosResponse<TokenResponse> = await makeApiRequest('POST', '/transactions', {
      command: 'cc:save',
      creditcard: {
        cardholder: cardDetails.cardholder,
        number: cardDetails.number,
        expiration: cardDetails.expiration,
        cvc: cardDetails.cvc,
        avs_street: cardDetails.avs_street,
        avs_postalcode: cardDetails.avs_postalcode,
      },
    });

    if (response.data && response.data.savedcard) {
      return response.data;
    } else {
      throw new Error('Failed to tokenize card');
    }
  } catch (error) {
    console.error('Error tokenizing card:', error);
    throw error;
  }
};
