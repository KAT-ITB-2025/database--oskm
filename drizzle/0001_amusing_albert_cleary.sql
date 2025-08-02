ALTER TABLE "user_attendance" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_attendance" ALTER COLUMN "status" SET DEFAULT 'tidak_hadir'::text;--> statement-breakpoint
DROP TYPE "public"."attendance_status";--> statement-breakpoint
CREATE TYPE "public"."attendance_status" AS ENUM('hadir', 'tidak_hadir');--> statement-breakpoint
ALTER TABLE "user_attendance" ALTER COLUMN "status" SET DEFAULT 'tidak_hadir'::"public"."attendance_status";--> statement-breakpoint
ALTER TABLE "user_attendance" ALTER COLUMN "status" SET DATA TYPE "public"."attendance_status" USING "status"::"public"."attendance_status";--> statement-breakpoint
ALTER TABLE "attendances" ADD COLUMN "day_number" integer NOT NULL;