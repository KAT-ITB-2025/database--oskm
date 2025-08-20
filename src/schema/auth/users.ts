import { relations } from 'drizzle-orm';
import {
  AnyPgColumn,
  boolean,
  date,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { getNow } from '../../drizzle-schema-util';

import { accounts } from './accounts';
import { media } from '../media/media';

export const users = pgTable('users', {
  id: text('id')
    .references((): AnyPgColumn => accounts.id)
    .primaryKey(),
  nim: text('nim').notNull().unique(),
  email: text('email').unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  fullName: text('full_name').notNull(),
  fakultas: text('fakultas').notNull(),
  keluarga: text('keluarga').notNull(),
  bata: text('bata').notNull(),
  rumpun: text('rumpun'),
  fotoMediaId: text('foto_media_id').references((): AnyPgColumn => media.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});

export const emailVerificationOtps = pgTable('email_verification_otps', {
  userId: text('user_id')
    .notNull()
    .references((): AnyPgColumn => users.id, { onDelete: 'cascade' }),
  otp: text('otp').notNull(),
  expiresAt: timestamp('expires_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
