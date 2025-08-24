import {
  AnyPgColumn,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from '../auth';
import { getNow } from '~/drizzle-schema-util';

export const personalityEnum = pgEnum('personality', [
  'Direwolf',
  'Gigantopithecus',
  'Jeholornis',
  'Brontothere',
  'Saber Tooth',
  'Mammoth',
  'Deinonychus',
  'T-Rex',
  'Diplodocus',
  'Troodon',
  'Quetzalcoatlus',
  'Parasaurolophus',
  'Velociraptor',
  'Ankylosaurus',
  'Megaloceros',
  'Argentavis Magnificens',
]);

export const userPersonality = pgTable('user_personality', {
  userId: text('user_id')
    .notNull()
    .references((): AnyPgColumn => users.id),
  personality: personalityEnum('personality').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(getNow),
});
