import { PromotedProduct } from '../hooks/queries/usePromotedProducts';

const placeholderProduct: PromotedProduct = {
  id: 1,
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
  product_id: '11111111-1111-1111-1111-111111111111',
  label: 'Featured Item',
  branch_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  product: {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Sample Product 1',
    unit: 'piece',
    images: [],
    barcodes: [],
    discount: 0,
    in_stock: true,
    is_taxed: false,
    branch_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    published: true,
    cost_price: 10.0,
    created_at: '2024-01-01T00:00:00.000Z',
    is_tobacco: false,
    updated_at: '2024-01-01T00:00:00.000Z',
    category_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
    description: 'A sample product description',
    is_featured: true,
    manufacturer: 'Sample Brand',
    retail_price: 19.99,
    wholesale_price: 15.0,
    discounted_until: null,
  },
};

const placeholderProduct2: PromotedProduct = {
  id: 2,
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
  product_id: '22222222-2222-2222-2222-222222222222',
  label: 'New Arrival',
  branch_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  product: {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Sample Product 2',
    unit: 'piece',
    images: [],
    barcodes: [],
    discount: 0,
    in_stock: true,
    is_taxed: false,
    branch_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    published: true,
    cost_price: 20.0,
    created_at: '2024-01-01T00:00:00.000Z',
    is_tobacco: false,
    updated_at: '2024-01-01T00:00:00.000Z',
    category_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
    description: 'Another sample product description',
    is_featured: true,
    manufacturer: 'Sample Brand',
    retail_price: 29.99,
    wholesale_price: 25.0,
    discounted_until: null,
  },
};

export const mockPromotedProducts = [placeholderProduct, placeholderProduct2];