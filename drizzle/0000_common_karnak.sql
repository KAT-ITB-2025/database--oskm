CREATE TYPE "public"."accounts_role_enum" AS ENUM('admin', 'mamet', 'mentor', 'user', 'guest');--> statement-breakpoint
CREATE TYPE "public"."class_enum" AS ENUM('sesi_1', 'sesi_2');--> statement-breakpoint
CREATE TYPE "public"."attendance_status" AS ENUM('hadir', 'tidak_hadir', 'izin', 'sakit');--> statement-breakpoint
CREATE TYPE "public"."media_bucket_enum" AS ENUM('profile', 'content', 'documents', 'uploads');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('completed', 'not_completed');--> statement-breakpoint
CREATE TYPE "public"."question_type_enum" AS ENUM('multiple_choice', 'short_answer');--> statement-breakpoint
CREATE TABLE "endpoint_analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"endpoint" text NOT NULL,
	"method" text NOT NULL,
	"status_code" integer NOT NULL,
	"response_time_ms" integer,
	"url_query" text,
	"request_body" text,
	"error_message" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"nim" text NOT NULL,
	"password" text NOT NULL,
	"role" "accounts_role_enum" DEFAULT 'user' NOT NULL,
	"last_logged_in" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "accounts_nim_unique" UNIQUE("nim")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"nim" text NOT NULL,
	"email" text,
	"full_name" text,
	"fakultas" text,
	"keluarga" text,
	"bata" text,
	"rumpun" text,
	"foto_media_id" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "users_nim_unique" UNIQUE("nim"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "class_registrations" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"class_id" text NOT NULL,
	"registered_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "classes" (
	"id" text PRIMARY KEY NOT NULL,
	"class_name" text NOT NULL,
	"room" text NOT NULL,
	"total_quota" integer NOT NULL,
	"mentor_id" text,
	"class_type" "class_enum" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "attendances" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"start_time" timestamp NOT NULL,
	"duration_minutes" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_attendance" (
	"id" text PRIMARY KEY NOT NULL,
	"schedule_id" text NOT NULL,
	"user_id" text NOT NULL,
	"status" "attendance_status" DEFAULT 'tidak_hadir' NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" text PRIMARY KEY NOT NULL,
	"creator_id" text NOT NULL,
	"name" text NOT NULL,
	"bucket" "media_bucket_enum" NOT NULL,
	"type" text NOT NULL,
	"url" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "assignments_profil" (
	"id" text PRIMARY KEY NOT NULL,
	"profil_kat_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"due_date" timestamp NOT NULL,
	"is_open" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "profil_kats" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "submissions_profil" (
	"id" text PRIMARY KEY NOT NULL,
	"assignment_id" text NOT NULL,
	"user_id" text NOT NULL,
	"submission_media_id" text NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "stages" (
	"id" text PRIMARY KEY NOT NULL,
	"profil_id" text NOT NULL,
	"stage_number" integer NOT NULL,
	"quiz_weight" real,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_stage_progress" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"stage_id" text NOT NULL,
	"status" "status" NOT NULL,
	"completed_at" timestamp,
	"quiz_score" integer,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "question_answer_options" (
	"id" text PRIMARY KEY NOT NULL,
	"question_id" text NOT NULL,
	"answer_text" text NOT NULL,
	"is_correct" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" text PRIMARY KEY NOT NULL,
	"stage_id" text NOT NULL,
	"question_text" text NOT NULL,
	"question_type" "question_type_enum" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "activities" (
	"id" text PRIMARY KEY NOT NULL,
	"day" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"location" text,
	"geolocation" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "endpoint_analytics" ADD CONSTRAINT "endpoint_analytics_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_id_accounts_id_fk" FOREIGN KEY ("id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_foto_media_id_media_id_fk" FOREIGN KEY ("foto_media_id") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class_registrations" ADD CONSTRAINT "class_registrations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class_registrations" ADD CONSTRAINT "class_registrations_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_mentor_id_users_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_attendance" ADD CONSTRAINT "user_attendance_schedule_id_attendances_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."attendances"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_attendance" ADD CONSTRAINT "user_attendance_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignments_profil" ADD CONSTRAINT "assignments_profil_profil_kat_id_profil_kats_id_fk" FOREIGN KEY ("profil_kat_id") REFERENCES "public"."profil_kats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions_profil" ADD CONSTRAINT "submissions_profil_assignment_id_assignments_profil_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "public"."assignments_profil"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions_profil" ADD CONSTRAINT "submissions_profil_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions_profil" ADD CONSTRAINT "submissions_profil_submission_media_id_media_id_fk" FOREIGN KEY ("submission_media_id") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stages" ADD CONSTRAINT "stages_profil_id_profil_kats_id_fk" FOREIGN KEY ("profil_id") REFERENCES "public"."profil_kats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stage_progress" ADD CONSTRAINT "user_stage_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stage_progress" ADD CONSTRAINT "user_stage_progress_stage_id_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_answer_options" ADD CONSTRAINT "question_answer_options_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_stage_id_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."stages"("id") ON DELETE no action ON UPDATE no action;