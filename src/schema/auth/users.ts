import { relations } from 'drizzle-orm';
import {
  AnyPgColumn,
  date,
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
  fullName: text('full_name'),
  fakultas: text('fakultas'),
  keluarga: text('keluarga'),
  bata: text('bata'),
  rumpun: text('rumpun'),
  fotoMediaId: text('foto_media_id').references((): AnyPgColumn => media.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});
