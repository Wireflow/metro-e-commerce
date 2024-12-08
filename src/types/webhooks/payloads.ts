import { Row, TableName } from '../supabase/table';

// Base interface for common webhook properties
interface BaseWebhook {
  table: string;
  schema: string;
}

// Type-safe webhook payloads for each operation
interface InsertWebhook<T extends TableName> extends BaseWebhook {
  type: 'INSERT';
  record: Row<T>;
  old_record: null;
}

interface UpdateWebhook<T extends TableName> extends BaseWebhook {
  type: 'UPDATE';
  record: Row<T>;
  old_record: Row<T>;
}

interface DeleteWebhook<T extends TableName> extends BaseWebhook {
  type: 'DELETE';
  record: null;
  old_record: Row<T>;
}

// Combined type that can be used with operation and table type parameters
export type WebhookPayload<
  Operation extends 'INSERT' | 'UPDATE' | 'DELETE',
  T extends TableName,
> = Operation extends 'INSERT'
  ? InsertWebhook<T>
  : Operation extends 'UPDATE'
    ? UpdateWebhook<T>
    : DeleteWebhook<T>;

// Usage:
