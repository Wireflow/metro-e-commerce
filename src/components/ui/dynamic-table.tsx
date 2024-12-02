/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

// Define available variants
export const tableVariants = {
  default: 'rounded-[4px] border border-gray-200 shadow-sm',
  bordered: 'rounded-none border-2 border-gray-300',
  minimal: 'border-0 shadow-none',
  striped: 'rounded-[4px] border border-gray-200 [&_tr:nth-child(even)]:bg-gray-50',
} as const;

export const tableHeaderVariants = {
  default: 'bg-gray-50',
  bordered: 'bg-gray-100 border-b-2 border-gray-300',
  minimal: 'bg-transparent border-b border-gray-200',
  striped: 'bg-white border-b border-gray-200',
} as const;

export const tableCellVariants = {
  default: 'px-2 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm',
  bordered: 'px-4 py-3 text-sm border',
  minimal: 'px-2 py-2 text-sm',
  striped: 'px-4 py-3 text-sm',
} as const;

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

export interface TableField<T> {
  key: NestedKeyOf<T> | ((item: T, index: number) => React.ReactNode);
  label: string | ((item: T) => React.ReactNode);
  transform?: (value: any, item: T) => React.ReactNode;
  className?: string;
  disabled?: boolean;
}

interface DynamicTableProps<T> {
  fields: TableField<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  variant?: keyof typeof tableVariants;
  className?: string;
  hover?: boolean;
  headerClassname?: string;
}

const getNestedValue = <T,>(obj: T, path: string): any => {
  return path.split('.').reduce((acc: any, part: string) => acc && acc[part], obj);
};

export function DynamicTable<T extends Record<string, any>>({
  fields,
  data,
  onRowClick,
  emptyMessage = 'No records found',
  variant = 'default',
  className,
  hover = true,
  headerClassname,
}: DynamicTableProps<T>) {
  const renderCellValue = (item: T, field: TableField<T>, index: number) => {
    let value: any;

    if (typeof field.key === 'function') {
      value = field.key(item, index);
    } else {
      value = getNestedValue(item, field.key as string);
    }

    if (field.transform) {
      return field.transform(value, item);
    }

    if (value instanceof Date) {
      return value.toLocaleString();
    }

    if (typeof value === 'number') {
      return value.toString();
    }

    return value ?? 'N/A';
  };

  const renderLabel = (field: TableField<T>) => {
    if (typeof field.label === 'function') {
      return field.label({} as T);
    }
    return field.label;
  };

  return (
    <div className={cn('custom-scrollbar', tableVariants[variant], className)}>
      <Table>
        <TableHeader className={cn({ 'bg-gray-100': variant === 'minimal' }, headerClassname)}>
          <TableRow className={tableHeaderVariants[variant]}>
            {fields.map(
              (field, index) =>
                !field?.disabled && (
                  <TableHead
                    key={
                      typeof field.key === 'function'
                        ? `${index}-${typeof field.label === 'function' ? index : field.label}`
                        : (field.key as string)
                    }
                    className={cn(
                      'whitespace-nowrap text-left text-xs font-medium uppercase tracking-wider text-gray-500',
                      tableCellVariants[variant],
                      field.className
                    )}
                  >
                    {renderLabel(field)}
                  </TableHead>
                )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(item)}
                className={cn(
                  onRowClick && 'cursor-pointer',
                  hover && 'hover:bg-gray-50',
                  variant === 'striped' && rowIndex % 2 === 0 && 'bg-gray-50'
                )}
              >
                {fields.map(
                  (field, cellIndex) =>
                    !field.disabled && (
                      <TableCell
                        key={
                          typeof field.key === 'function'
                            ? `${rowIndex}-${cellIndex}`
                            : (field.key as string)
                        }
                        className={cn(tableCellVariants[variant], field.className)}
                      >
                        {renderCellValue(item, field, rowIndex)}
                      </TableCell>
                    )
                )}
              </TableRow>
            ))
          ) : (
            <TableRow className="h-44">
              <TableCell
                colSpan={fields.filter(f => !f.disabled).length}
                className={cn('h-full', tableCellVariants[variant])}
              >
                <div className="flex h-full items-center justify-center">
                  <span className="text-center text-sm font-medium text-gray-500">
                    {emptyMessage}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DynamicTable;

export const useTableFields = <T,>(fields: TableField<T>[]) => {
  return fields;
};
