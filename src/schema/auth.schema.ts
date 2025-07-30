import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { user } from './user.schema';
import { getNow } from '../drizzle-schema-util';

export const accountRoleEnum = pgEnum('account_role_enum', [
  'admin',
  'mamet',
  'mentor',
  'user',
  'guest',
]);

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  nim: text('nim').notNull().unique(),
  password: text('password').notNull(),
  role: accountRoleEnum('role').default('user').notNull(),
  lastLoggedIn: timestamp('last_logged_in'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});

export const accountRelation = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.id],
    references: [user.id],
  }),
}));
