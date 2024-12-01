export interface TokenResponse {
  savedcard: {
    type: string;
    key: string;
    cardnumber: string;
  };
}

export interface ChargeResponse {
  result: string;
  refnum: string;
  key: string;
  auth_amount: string;
  creditcard: {
    number: string;
  };
}
