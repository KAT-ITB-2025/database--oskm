import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  real,
} from 'drizzle-orm/pg-core';
import { getNow, createId } from '../../drizzle-schema-util';
import { profilKATs } from '../profil-kat';
import { media } from '../media';
import { users } from '../auth';

export const itbGuesserTempatEnum = pgEnum('itb_guesser_tempat', [
  'Ganesha',
  'Jatinangor',
  'Cirebon',
]);

export const itbGuesserOptions = pgTable('itb_guesser_options', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  tempat: itbGuesserTempatEnum('tempat').notNull(),
  publicUrl: text('public_url').notNull(),
  lat: real('lat').notNull(),
  lng: real('lng').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});

export const itbGuesserSubmissions = pgTable('itb_guesser_submissions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  score: real('score').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});

export const memoryGameScores = pgTable('memory_game_scores', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  // Unique per user id
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => users.id),
  score: integer('score').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});
