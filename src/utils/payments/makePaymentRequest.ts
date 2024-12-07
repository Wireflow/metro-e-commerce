import axios, { AxiosInstance } from 'axios';

import { AdjustRequest, AdjustResponse } from '@/lib/usaepay/use-cases/adjustTransaction';
import {
  AuthorizeResponse,
  AuthorizeTokenRequest,
} from '@/lib/usaepay/use-cases/authorizeTransaction';
import { CaptureRequest, CaptureResponse } from '@/lib/usaepay/use-cases/captureTransaction';
import { RefundRequest, RefundResponse } from '@/lib/usaepay/use-cases/refundAmount';
import { TokenizeResponse } from '@/lib/usaepay/use-cases/tokenizeCard';
import { VoidRequest, VoidResponse } from '@/lib/usaepay/use-cases/voidTransaction';
import { CardDetails } from '@/types/card';

import { createClient } from '../supabase/client';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

interface PaymentRequestOptions<T> {
  endpoint: string;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
  data?: T;
}

// Create Supabase client
const supabase = createClient();

// Create base axios instance
const api: AxiosInstance = axios.create({
  baseURL: '/api/payments',
});

// Request interceptor to automatically get and add token
api.interceptors.request.use(
  async config => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers['Content-Type'] = 'application/json';
      return config;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  response => ({
    data: response.data,
    error: null,
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
    config: response.config,
  }),
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized error - could trigger a refresh here
        console.error('Unauthorized request - token may be expired');
      }
      return Promise.resolve({
        data: null,
        error: error.response.data.error || 'Payment request failed',
      });
    } else if (error.request) {
      return Promise.resolve({
        data: null,
        error: 'No response from payment server',
      });
    } else {
      return Promise.resolve({
        data: null,
        error: 'Error making payment request',
      });
    }
  }
);

async function makeRequest<TRequest, TResponse>({
  endpoint,
  method = 'POST',
  data,
}: PaymentRequestOptions<TRequest>): Promise<ApiResponse<TResponse>> {
  return api({
    method,
    url: endpoint,
    data,
  }) as Promise<ApiResponse<TResponse>>;
}

// Payment API functions
export function createPaymentApi() {
  async function tokenizeCard(data: CardDetails): Promise<ApiResponse<TokenizeResponse>> {
    return makeRequest<CardDetails, TokenizeResponse>({
      endpoint: '/tokenize',
      data,
    });
  }

  // Example of additional payment function
  async function authorizeToken(
    data: AuthorizeTokenRequest
  ): Promise<ApiResponse<AuthorizeResponse>> {
    return makeRequest<AuthorizeTokenRequest, AuthorizeResponse>({
      endpoint: '/authorize',
      data,
    });
  }

  async function voidTransaction(data: VoidRequest): Promise<ApiResponse<VoidResponse>> {
    return makeRequest<VoidRequest, VoidResponse>({
      endpoint: '/void',
      data,
    });
  }

  async function captureTransaction(data: CaptureRequest): Promise<ApiResponse<CaptureResponse>> {
    return makeRequest<CaptureRequest, CaptureResponse>({
      endpoint: '/capture',
      data,
    });
  }

  async function refundAmount(data: RefundRequest): Promise<ApiResponse<RefundResponse>> {
    return makeRequest<RefundRequest, RefundResponse>({
      endpoint: '/refund',
      data,
    });
  }

  async function adjustTransaction(data: AdjustRequest): Promise<ApiResponse<AdjustResponse>> {
    return makeRequest<AdjustRequest, AdjustResponse>({
      endpoint: '/adjust',
      data,
    });
  }

  return {
    tokenizeCard,
    authorizeToken,
    voidTransaction,
    captureTransaction,
    adjustTransaction,
    refundAmount,
  } as const;
}

export type PaymentApi = ReturnType<typeof createPaymentApi>;
export type { ApiResponse };
