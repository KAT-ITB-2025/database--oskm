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

export const mediaBucketEnum = pgEnum('media_bucket_enum', [
  'profile',
  'content',
  'documents',
  'uploads',
  'assignment'
]);

export const media = pgTable('media', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  creatorId: text('creator_id')
    .notNull()
    .references((): AnyPgColumn => users.id),
  name: text('name').notNull(),
  bucket: mediaBucketEnum('bucket').notNull(),
  type: text('type').notNull(),
  url: text('url').notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
  createdAt: timestamp('created_at').defaultNow(),
});
