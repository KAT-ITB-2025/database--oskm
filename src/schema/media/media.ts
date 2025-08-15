import { relations } from 'drizzle-orm';
import {
  AnyPgColumn,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { getNow, createId } from '../../drizzle-schema-util';
import { users } from '../auth/users';

export const media = pgTable('media', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  creatorId: text('creator_id').references((): AnyPgColumn => users.id),
  name: text('name').notNull(),
  bucket: text('bucket').notNull(),
  type: text('type').notNull(),
  url: text('url').notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
  createdAt: timestamp('created_at').defaultNow(),
});
