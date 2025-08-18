import {
  boolean,
  pgTable,
  bigserial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from '../auth';

export const userMatches = pgTable('user_matches', {
  id: text('id').primaryKey().$defaultFn(createId),
  topic: text('topic').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  isAnonymous: boolean('is_anonymous').notNull().default(true),
  isRevealed: boolean('is_revealed').notNull().default(false),
  firstUserId: text('first_user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  secondUserId: text('second_user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  lastMessage: text('last_message'),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export const messages = pgTable('messages', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  userMatchId: text('user_match_id').notNull().references(() => userMatches.id, { onDelete: "cascade" }),
  senderId: text('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true
  }).notNull().defaultNow()
});
