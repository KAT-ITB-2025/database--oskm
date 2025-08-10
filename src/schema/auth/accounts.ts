import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { getNow, createId } from '../../drizzle-schema-util';

export const accountsRoleEnum = pgEnum('accounts_role_enum', [
  'admin',
  'mamet',
  'mentor',
  'user',
  'guest',
  'hr'
]);

export const accounts = pgTable('accounts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  nim: text('nim').notNull().unique(),
  password: text('password').notNull(),
  role: accountsRoleEnum('role').default('user').notNull(),
  lastLoggedIn: timestamp('last_logged_in'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});

// Relations will be defined in a separate relations file to avoid circular imports
