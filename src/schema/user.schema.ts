import { date, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { getNow } from '../drizzle-schema-util';

import { account } from './auth.schema';

export const user = pgTable('user', {
  id: text('id')
    .primaryKey()
    .references(() => account.id),
  nim: text('nim').notNull().unique(),
  email: text('email').unique(),
  fullName: text('full_name'),
  birthDate: date('birth_date'),
  phoneNumber: text('phone_number'),
  idLine: text('id_line'),
  idDiscord: text('id_discord'),
  idInstagram: text('id_instagram'),
  fakultas: text('fakultas'),
  prodi: text('prodi'),
  kelompok: text('kelompok'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});
