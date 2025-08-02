import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { stages } from './stages';
import { getNow, createId } from '../../drizzle-schema-util';

// enum for question types
export const questionTypeEnum = pgEnum('question_type_enum', [
  'multiple_choice',
  'short_answer',
]);

export const questions = pgTable('questions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  stageId: text('stage_id')
    .notNull()
    .references(() => stages.id),
  questionText: text('question_text').notNull(),
  questionType: questionTypeEnum('question_type').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});

export const questionAnswerOptions = pgTable('question_answer_options', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  questionId: text('question_id')
    .notNull()
    .references(() => questions.id),
  answerText: text('answer_text').notNull(),
  isCorrect: boolean('is_correct').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});
