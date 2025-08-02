import { relations } from 'drizzle-orm';
import {
  AnyPgColumn,
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { getNow, createId } from '../../drizzle-schema-util';
import { users } from '../auth/users';
import { media } from '../media/media';

export const profilKATs = pgTable('profil_kats', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  profilNumber: integer('profil_number').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
});

export const assignmentsProfil = pgTable('assignments_profil', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  profilKATId: text('profil_kat_id')
    .notNull()
    .references(() => profilKATs.id),
  title: text('title').notNull(),
  description: text('description'),
  dueDate: timestamp('due_date').notNull(),
  isOpen: boolean('is_open').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});

export const submissionsProfil = pgTable('submissions_profil', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  assignmentId: text('assignment_id')
    .notNull()
    .references(() => assignmentsProfil.id),
  userId: text('user_id')
    .notNull()
    .references((): AnyPgColumn => users.id),
  submissionMediaId: text('submission_media_id')
    .notNull()
    .references((): AnyPgColumn => media.id),
  score: integer('score').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});
