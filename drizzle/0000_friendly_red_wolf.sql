CREATE TYPE "public"."account_role_enum" AS ENUM('admin', 'mamet', 'mentor', 'user', 'guest');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"nim" text NOT NULL,
	"password" text NOT NULL,
	"role" "account_role_enum" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "account_nim_unique" UNIQUE("nim")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"nim" text NOT NULL,
	"email" text,
	"full_name" text,
	"birth_date" date,
	"phone_number" text,
	"id_line" text,
	"id_discord" text,
	"id_instagram" text,
	"fakultas" text,
	"prodi" text,
	"kelompok" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "user_nim_unique" UNIQUE("nim"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_account_id_fk" FOREIGN KEY ("id") REFERENCES "public"."account"("id") ON DELETE no action ON UPDATE no action;