// src/services/usaepayService.ts

import { chargeCard } from './use-cases/chargeCard';
import { chargeToken } from './use-cases/chargeToken';
import { refundAmount } from './use-cases/refundAmount';
import { tokenizeCard } from './use-cases/tokenizeCard';

const usaepay = {
  payment: {
    chargeToken,
    chargeCard,
  },
  token: {
    tokenizeCard,
  },
  refund: {
    refundAmount,
  },
};

export default usaepay;
