import { ISOStringFormat } from 'date-fns';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

import { Enum } from '@/types/supabase/enum';

// Basic type utilities
export type StringOrNumber = string | number;

// Product related types
export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  product_id: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  manufacturer?: string;
  unit?: string;
  retail_price: number;
  wholesale_price: number;
  images: ProductImage[];
  discount?: number;
  discounted_until?: ISOStringFormat;
  rating?: number;
  rating_count?: number;
  created_at: string;
  updated_at: string;
}

// Customer types
export type CustomerType = Enum<'customer_type'>;

// Component Props Types
export interface ProductCardRootProps {
  children: ReactNode;
  className?: string;
}

export interface ProductCardImageProps {
  src?: string;
  alt: string;
  size?: 'small' | 'large';
}

export interface ProductCardContentProps {
  children: ReactNode;
  className?: string;
}

export interface ProductCardBadgeProps {
  isValid: boolean;
  children: ReactNode;
  variant?: 'default' | 'success' | 'destructive';
}

export interface ProductCardTitleProps {
  name: string;
  manufacturer?: string;
  unit?: string;
}

export interface ProductCardPriceSectionProps {
  type: CustomerType;
  price: number;
  label?: string;
}

export interface ProductCardActionsProps {
  children: ReactNode;
}

export interface ProductCardActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

// Variant Props Types
export interface SimpleProductCardProps {
  product: Product;
  className?: string;
}

export interface FeaturedProductCardProps {
  product: Product;
  className?: string;
  onAddToCart?: () => void;
  onWishlist?: () => void;
  onQuickView?: () => void;
}

export interface CompactProductCardProps {
  product: Product;
  className?: string;
}

// Compound Component Type
export interface ProductCardCompound {
  Root: React.FC<ProductCardRootProps>;
  Image: React.FC<ProductCardImageProps>;
  Content: React.FC<ProductCardContentProps>;
  Badge: React.FC<ProductCardBadgeProps>;
  Title: React.FC<ProductCardTitleProps>;
  PriceSection: React.FC<ProductCardPriceSectionProps>;
  Actions: React.FC<ProductCardActionsProps>;
  ActionButton: React.FC<ProductCardActionButtonProps>;
}
