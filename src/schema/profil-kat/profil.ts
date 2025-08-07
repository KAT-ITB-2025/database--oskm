import { relations } from 'drizzle-orm';
import {
  AnyPgColumn,
  boolean,
  integer,
  pgTable,
  real,
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
  stageWeight: real('stage_weight').notNull().default(0.0),
  quizWeight: real('quiz_weight').notNull().default(0.0),
  assignmentWeight: real('assignment_weight').notNull().default(0.0),
  attendanceWeight: real('attendance_weight').notNull().default(0.0),
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
  assignmentMediaId: text('assignment_media_id')
    .notNull()
    .references(() => media.id),
  description: text('description'),
  dueDate: timestamp('due_date', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  isOpen: boolean('is_open').default(false).notNull(),
  startDate: timestamp('start_date', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
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
