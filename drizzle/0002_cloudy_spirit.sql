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
ALTER TABLE "endpoint_analytics" ADD CONSTRAINT "endpoint_analytics_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;