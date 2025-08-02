import { relations } from 'drizzle-orm';
import {
  AnyPgColumn,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { getNow, createId } from '../../drizzle-schema-util';
import { users } from '../auth/users';

export const attendanceStatusEnum = pgEnum('attendance_status', [
  'hadir',
  'tidak_hadir',
]);

export const attendances = pgTable('attendances', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  dayNumber: integer('day_number').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  startTime: timestamp('start_time').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});

export const userAttendance = pgTable('user_attendance', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  scheduleId: text('schedule_id')
    .notNull()
    .references(() => attendances.id),
  userId: text('user_id')
    .notNull()
    .references((): AnyPgColumn => users.id),
  status: attendanceStatusEnum('status').default('tidak_hadir').notNull(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});
