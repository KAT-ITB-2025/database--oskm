import {
  pgTable,
  primaryKey,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const verificationToken = pgTable('verification_token', {
  identifier: text('identifier')
    .notNull()
    .references(() => users.email),
  token: text('token'),
  expiredAt: timestamp('expired_at', {
    mode: 'date',
    withTimezone: true
  })
}, (table) => [
  primaryKey({
    columns: [table.identifier, table.token]
  })
]);