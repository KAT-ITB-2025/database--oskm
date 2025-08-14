ALTER TABLE "classes" DROP CONSTRAINT "classes_mentor_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "classes" ADD COLUMN "mentor_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "classes" DROP COLUMN "mentor_id";