import * as schema from './schema';
import { pgGenerate } from 'drizzle-dbml-generator'; // Using Postgres for this example

const out = './schema.dbml';
const relational = false;

pgGenerate({ schema, out, relational });
