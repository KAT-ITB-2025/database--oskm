import {
  AnyPgColumn,
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { getNow, createId } from '../../drizzle-schema-util';

import { users } from '../auth/users';

// enum class: sesi_1, sesi_2
export const classEnum = pgEnum('class_enum', ['sesi_1', 'sesi_2']);

export const classes = pgTable('classes', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  className: text('class_name').notNull(),
  room: text('room').notNull(),
  totalQuota: integer('total_quota').notNull(),
  mentorId: text('mentor_id').references((): AnyPgColumn => users.id),
  classType: classEnum('class_type').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});

export const classRegistrations = pgTable('class_registrations', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text('user_id')
    .notNull()
    .references((): AnyPgColumn => users.id),
  classId: text('class_id')
    .notNull()
    .references(() => classes.id),
  registeredAt: timestamp('registered_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});
