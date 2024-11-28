import { METRO_BRANCH_ID } from '@/data/constants';

import { CustomPromotion } from '../schemas/custom-promotions';

export const mockCustomPromotion: CustomPromotion = {
  id: 1,
  label: 'THE BEST PRICES IN TOWN',
  branch_id: METRO_BRANCH_ID,
  title: 'Best Deals',
  description: 'Save up to 50% on select Xbox games.\nGet 3 months of PC Game Pass for $2 USD.',
  call_to_action: 'SHOP NOW',
  image_path: null,
  image_url: null,
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
};
