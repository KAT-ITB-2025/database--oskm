ALTER TABLE "activities" ADD COLUMN "lat" integer;--> statement-breakpoint
ALTER TABLE "activities" ADD COLUMN "lng" integer;--> statement-breakpoint
ALTER TABLE "activities" DROP COLUMN "geolocation";