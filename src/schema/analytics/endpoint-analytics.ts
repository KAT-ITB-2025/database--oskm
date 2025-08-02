import {
  AnyPgColumn,
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from '../auth/users';

export const endpointAnalytics = pgTable('endpoint_analytics', {
  id: serial('id').primaryKey(),

  userId: text('user_id').references((): AnyPgColumn => users.id, {
    onDelete: 'set null',
  }),

  endpoint: text('endpoint').notNull(),
  method: text('method').notNull(),
  statusCode: integer('status_code').notNull(),
  responseTimeMs: integer('response_time_ms'),

  urlQuery: text('url_query'), // Have to be sorted first if there are multiple query parameters
  requestBody: text('request_body'),

  errorMessage: text('error_message'),

  createdAt: timestamp('created_at').defaultNow(),
});
