// src/services/usaepayService.ts

import { adjustTransaction } from './use-cases/adjustTransaction';
import { authorizeCard, authorizeToken } from './use-cases/authorizeTransaction';
import { captureTransaction } from './use-cases/captureTransaction';
import { chargeCard } from './use-cases/chargeCard';
import { chargeToken } from './use-cases/chargeToken';
import { refundTransaction } from './use-cases/refundAmount';
import { tokenizeCard } from './use-cases/tokenizeCard';
import { voidTransaction } from './use-cases/voidTransaction';

const usaepay = {
  normalSale: {
    chargeToken,
    chargeCard,
    refundTransaction,
  },
  authorize: {
    chargeCard: authorizeCard,
    chargeToken: authorizeToken,
    adjust: adjustTransaction,
    void: voidTransaction,
    capture: captureTransaction,
  },
  tokenize: tokenizeCard,
};

export default usaepay;
