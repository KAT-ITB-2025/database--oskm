CREATE TYPE "public"."personality" AS ENUM('Direwolf', 'Gigantopithecus', 'Jeholornis', 'Brontothere', 'Saber Tooth', 'Mammoth', 'Deinonychus', 'T-Rex', 'Diplodocus', 'Troodon', 'Quetzalcoatlus', 'Parasaurolophus', 'Velociraptor', 'Ankylosaurus', 'Megaloceros', 'Argentavis Magnificens');--> statement-breakpoint
CREATE TABLE "user_personality" (
	"user_id" text NOT NULL,
	"personality" "personality" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "user_personality" ADD CONSTRAINT "user_personality_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;