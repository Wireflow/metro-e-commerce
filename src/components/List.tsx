import React, { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

type BaseItem = {
  id: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type ListProps<T extends BaseItem> = {
  // Required props
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;

  // Optional props
  keyExtractor?: (item: T) => string;
  ListEmptyComponent?: React.ReactNode | (() => React.ReactNode);
  ListHeaderComponent?: React.ReactNode | (() => React.ReactNode);
  ListFooterComponent?: React.ReactNode | (() => React.ReactNode);
  horizontal?: boolean;
  numColumns?: number;
  contentClassName?: string;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  itemSeparator?: React.ReactNode | (() => React.ReactNode);
  className?: string;
};

const List = <T extends BaseItem>({
  data,
  renderItem,
  keyExtractor,
  ListEmptyComponent,
  ListHeaderComponent,
  ListFooterComponent,
  horizontal = false,
  numColumns = 1,
  contentClassName,
  onEndReached,
  onEndReachedThreshold = 0.8,
  itemSeparator,
  className = '',
}: ListProps<T>) => {
  const listRef = useRef<HTMLDivElement>(null);

  // Handle scroll events for infinite loading
  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current || !onEndReached) return;

      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      const scrollPosition = scrollTop + clientHeight;
      const threshold = scrollHeight * onEndReachedThreshold;

      if (scrollPosition >= threshold) {
        onEndReached();
      }
    };

    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [onEndReached, onEndReachedThreshold]);

  // Render separator between items
  const renderSeparator = (index: number) => {
    if (!itemSeparator || index === data.length - 1) return null;
    return typeof itemSeparator === 'function' ? itemSeparator() : itemSeparator;
  };

  // Handle empty state
  if (data.length === 0 && ListEmptyComponent) {
    return (
      <div ref={listRef} className={className}>
        {typeof ListEmptyComponent === 'function' ? ListEmptyComponent() : ListEmptyComponent}
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className={cn('overflow-auto', horizontal ? 'flex' : '', className)}
      style={{ maxHeight: '100%' }}
    >
      <div
        className={cn(
          'grid gap-4',
          horizontal ? 'auto-cols-max grid-flow-col' : `grid-cols-${numColumns}`,
          contentClassName
        )}
      >
        {/* Header */}
        {ListHeaderComponent && (
          <div className="col-span-full">
            {typeof ListHeaderComponent === 'function'
              ? ListHeaderComponent()
              : ListHeaderComponent}
          </div>
        )}

        {/* Items */}
        {data.map((item, index) => (
          <React.Fragment key={keyExtractor ? keyExtractor(item) : item.id}>
            {renderItem(item, index)}
            {renderSeparator(index)}
          </React.Fragment>
        ))}

        {/* Footer */}
        {ListFooterComponent && (
          <div className="col-span-full">
            {typeof ListFooterComponent === 'function'
              ? ListFooterComponent()
              : ListFooterComponent}
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
