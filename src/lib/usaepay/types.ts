export interface TokenResponse {
  type: string;
  key: string;
  refnum: string;
  result_code: string;
  result: string;
  authcode: string;
  creditcard: {
    number: string;
    cardholder: string;
  };
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
