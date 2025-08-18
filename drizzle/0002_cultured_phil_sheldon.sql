ALTER TABLE "itb_guesser_options" DROP CONSTRAINT "itb_guesser_options_foto_media_id_media_id_fk";
--> statement-breakpoint
ALTER TABLE "itb_guesser_options" ADD COLUMN "public_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "itb_guesser_options" DROP COLUMN "foto_media_id";