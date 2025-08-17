import { pgTable, text } from 'drizzle-orm/pg-core';
import { media } from './media';

export const handbook = pgTable('handbook', {
  mediaId: text('media_id')
    .primaryKey()
    .references(() => media.id),
  title: text('title'),
});
