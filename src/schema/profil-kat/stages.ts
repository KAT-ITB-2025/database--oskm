import {
  AnyPgColumn,
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { profilKATs } from './profil';
import { getNow, createId } from '../../drizzle-schema-util';
import { users } from '../auth/users';

export const stageStatusEnum = pgEnum('status', ['completed', 'not_completed']);

export const stages = pgTable('stages', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  profilId: text('profil_id')
    .notNull()
    .references(() => profilKATs.id),
  stageNumber: integer('stage_number').notNull(),
  quizWeight: real('quiz_weight').notNull().default(0.0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});

export const userStageProgress = pgTable('user_stage_progress', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('user_id')
    .notNull()
    .references((): AnyPgColumn => users.id),
  stageId: text('stage_id')
    .notNull()
    .references(() => stages.id),
  status: stageStatusEnum('status').notNull(),
  completedAt: timestamp('completed_at'),
  quizScore: integer('quiz_score'),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});

// Relations will be defined in a separate relations file to avoid circular imports
