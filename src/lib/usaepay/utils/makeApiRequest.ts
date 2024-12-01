import axios, { AxiosResponse } from 'axios';
import crypto from 'crypto';

import { config } from '@/config';

const apiKey = config.usaepay.apiKey;
const apiPin = config.usaepay.pin;
const apiUrl = config.usaepay.apiUrl;

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

const makeApiRequest = async <T>(
  method: Method,
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): Promise<AxiosResponse<T>> => {
  const url = `${apiUrl}${endpoint}`;
  const headers = generateAuthHeaders();

  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      data,
      headers,
    });

    return response;
  } catch (error) {
    console.error('Error making API request:', error);
    throw error;
  }
};

const generateAuthHeaders = (): {
  Authorization: string;
  'Content-Type': string;
} => {
  const seed = randomSeed(10);
  const hash = crypto.createHash('sha256').update(`${apiKey}:${apiPin}:${seed}`).digest('hex');

  const authString = Buffer.from(`${apiKey}:s2/${seed}/${hash}`).toString('base64');

  return {
    Authorization: `Basic ${authString}`,
    'Content-Type': 'application/json',
  };
};

const randomSeed = (len: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join(
    ''
  );
};

export { generateAuthHeaders, makeApiRequest, randomSeed };
