import { ReadonlyURLSearchParams } from 'next/navigation';

export const isEditMode = (searchParams: ReadonlyURLSearchParams): boolean => {
  return searchParams.get('edit') === 'true';
};

export const getEditModeUrl = (path: string, searchParams: ReadonlyURLSearchParams): string => {
  return `${path}${isEditMode(searchParams) ? '?edit=true' : ''}`;
};

export const getEditModePath = (path: string, searchParams: ReadonlyURLSearchParams): string => {
  return `${path}${isEditMode(searchParams) ? '?edit=true' : ''}`;
};
