CREATE TABLE "handbook" (
	"media_id" text PRIMARY KEY NOT NULL,
	"title" text
);
--> statement-breakpoint
ALTER TABLE "handbook" ADD CONSTRAINT "handbook_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE no action ON UPDATE no action;