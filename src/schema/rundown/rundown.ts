import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  time,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { getNow, createId } from '../../drizzle-schema-util';

export const activities = pgTable('activities', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  day: integer('day').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  location: text('location'),
  lat: real('lat'),
  lng: real('lng'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});
