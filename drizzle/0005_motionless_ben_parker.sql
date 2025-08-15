ALTER TABLE "media" ALTER COLUMN "bucket" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."media_bucket_enum";