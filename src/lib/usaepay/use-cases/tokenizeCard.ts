import { AxiosResponse } from 'axios';

import { CardDetails } from '@/types/card';
import { Enum } from '@/types/supabase/enum';

import { TokenResponse } from '../types';
import { makeApiRequest } from '../utils/makeApiRequest';

const cardTypes: Record<string, Enum<'card_provider'>> = {
  AmEx: 'amex',
  Master: 'master',
  Visa: 'visa',
  Discover: 'discover',
};

export interface TokenizeResponse {
  status: 'success' | 'error';
  cardType?: Enum<'card_provider'>;
  token?: string;
  maskedNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  holderName?: string;
  userId?: string;
}

export const tokenizeCard = async (cardDetails: CardDetails): Promise<TokenizeResponse> => {
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
      const [expiryMonth, expiryYear] = cardDetails.expiration.split('/');

      const cardType = cardTypes[response.data.savedcard.type] || 'unknown';

      return {
        status: 'success',
        cardType: cardType ?? null,
        token: response.data.savedcard.key,
        maskedNumber: response.data.creditcard.number,
        expiryMonth,
        expiryYear,
        holderName: cardDetails.cardholder,
      };
    } else {
      throw new Error('Failed to tokenize card');
    }
  } catch (error) {
    console.error('Error tokenizing card:', error);
    return {
      status: 'error',
    };
  }
};
