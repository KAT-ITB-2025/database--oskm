ALTER TABLE "itb_guesser_submissions" DROP CONSTRAINT "itb_guesser_submissions_option_id_itb_guesser_options_id_fk";
--> statement-breakpoint
ALTER TABLE "itb_guesser_submissions" DROP COLUMN "option_id";--> statement-breakpoint
ALTER TABLE "itb_guesser_submissions" DROP COLUMN "answer_lat";--> statement-breakpoint
ALTER TABLE "itb_guesser_submissions" DROP COLUMN "answer_lng";