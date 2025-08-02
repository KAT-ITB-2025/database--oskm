ALTER TABLE "stages" ALTER COLUMN "quiz_weight" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "stages" ALTER COLUMN "quiz_weight" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profil_kats" ADD COLUMN "profil_number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "profil_kats" ADD CONSTRAINT "profil_kats_profil_number_unique" UNIQUE("profil_number");--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."user_ranking_view" AS (
  WITH user_assignment_scores AS (
    SELECT 
      u.id as user_id,
      pk.profil_number,
      COALESCE(AVG(sp.score), 0) as avg_assignment_score,
      MAX(sp.created_at) as last_assignment_at
    FROM users u
    CROSS JOIN profil_kats pk 
    LEFT JOIN assignments_profil ap ON ap.profil_kat_id = pk.id
    LEFT JOIN submissions_profil sp ON sp.assignment_id = ap.id AND sp.user_id = u.id
    WHERE pk.profil_number IN (1, 2, 3, 4, 5)
    GROUP BY u.id, pk.profil_number
  ),
  user_quiz_scores AS (
    SELECT 
      u.id as user_id,
      pk.profil_number,
      COALESCE(s.quiz_weight, 0.0) as quiz_weight,
      COALESCE(usp.quiz_score, 0) as quiz_score,
      usp.completed_at as quiz_completed_at
    FROM users u
    CROSS JOIN profil_kats pk 
    LEFT JOIN stages s ON s.profil_id = pk.id
    LEFT JOIN user_stage_progress usp ON usp.user_id = u.id AND usp.stage_id = s.id AND usp.status = 'completed'
    WHERE pk.profil_number IN (1, 2, 3, 4, 5)
  ),
  user_scores AS (
    SELECT 
      u.id as user_id,
      u.nim,
      u.full_name,
      u.fakultas,
      u.keluarga,
      u.bata,
      u.rumpun,
      u.foto_media_id,
      
      -- Profil 1 scores (all with COALESCE to ensure NOT NULL)
      COALESCE(MAX(CASE WHEN uqs.profil_number = 1 THEN uqs.quiz_weight END), 0.0) as profil1_quiz_weight,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 1 THEN uqs.quiz_score END), 0) as profil1_quiz_score,
      COALESCE(MAX(CASE WHEN uas.profil_number = 1 THEN uas.avg_assignment_score END), 0.0) as profil1_avg_assignment_score,
      
      -- Profil 2 scores  
      COALESCE(MAX(CASE WHEN uqs.profil_number = 2 THEN uqs.quiz_weight END), 0.0) as profil2_quiz_weight,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 2 THEN uqs.quiz_score END), 0) as profil2_quiz_score,
      COALESCE(MAX(CASE WHEN uas.profil_number = 2 THEN uas.avg_assignment_score END), 0.0) as profil2_avg_assignment_score,
      
      -- Profil 3 scores
      COALESCE(MAX(CASE WHEN uqs.profil_number = 3 THEN uqs.quiz_weight END), 0.0) as profil3_quiz_weight,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 3 THEN uqs.quiz_score END), 0) as profil3_quiz_score,
      COALESCE(MAX(CASE WHEN uas.profil_number = 3 THEN uas.avg_assignment_score END), 0.0) as profil3_avg_assignment_score,
      
      -- Profil 4 scores
      COALESCE(MAX(CASE WHEN uqs.profil_number = 4 THEN uqs.quiz_weight END), 0.0) as profil4_quiz_weight,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 4 THEN uqs.quiz_score END), 0) as profil4_quiz_score,
      COALESCE(MAX(CASE WHEN uas.profil_number = 4 THEN uas.avg_assignment_score END), 0.0) as profil4_avg_assignment_score,
      
      -- Profil 5 scores
      COALESCE(MAX(CASE WHEN uqs.profil_number = 5 THEN uqs.quiz_weight END), 0.0) as profil5_quiz_weight,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 5 THEN uqs.quiz_score END), 0) as profil5_quiz_score,
      COALESCE(MAX(CASE WHEN uas.profil_number = 5 THEN uas.avg_assignment_score END), 0.0) as profil5_avg_assignment_score,

      -- Last activity timestamps
      MAX(CASE WHEN uqs.profil_number = 1 THEN GREATEST(COALESCE(uqs.quiz_completed_at, '1970-01-01'::timestamp), COALESCE(uas.last_assignment_at, '1970-01-01'::timestamp)) END) as profil1_last_activity,
      MAX(CASE WHEN uqs.profil_number = 2 THEN GREATEST(COALESCE(uqs.quiz_completed_at, '1970-01-01'::timestamp), COALESCE(uas.last_assignment_at, '1970-01-01'::timestamp)) END) as profil2_last_activity,
      MAX(CASE WHEN uqs.profil_number = 3 THEN GREATEST(COALESCE(uqs.quiz_completed_at, '1970-01-01'::timestamp), COALESCE(uas.last_assignment_at, '1970-01-01'::timestamp)) END) as profil3_last_activity,
      MAX(CASE WHEN uqs.profil_number = 4 THEN GREATEST(COALESCE(uqs.quiz_completed_at, '1970-01-01'::timestamp), COALESCE(uas.last_assignment_at, '1970-01-01'::timestamp)) END) as profil4_last_activity,
      MAX(CASE WHEN uqs.profil_number = 5 THEN GREATEST(COALESCE(uqs.quiz_completed_at, '1970-01-01'::timestamp), COALESCE(uas.last_assignment_at, '1970-01-01'::timestamp)) END) as profil5_last_activity

    FROM users u
    LEFT JOIN user_quiz_scores uqs ON uqs.user_id = u.id
    LEFT JOIN user_assignment_scores uas ON uas.user_id = u.id AND uas.profil_number = uqs.profil_number
    GROUP BY u.id, u.nim, u.full_name, u.fakultas, u.keluarga, u.bata, u.rumpun, u.foto_media_id
  )
  SELECT 
    user_id,
    nim,
    full_name,
    fakultas,
    keluarga,
    bata,
    rumpun,
    foto_media_id,
    profil1_quiz_weight,
    profil1_quiz_score,
    profil1_avg_assignment_score,
    (profil1_quiz_weight * profil1_quiz_score) + ((1 - profil1_quiz_weight) * profil1_avg_assignment_score) as profil1_total_score,
    
    profil2_quiz_weight,
    profil2_quiz_score,
    profil2_avg_assignment_score,
    (profil2_quiz_weight * profil2_quiz_score) + ((1 - profil2_quiz_weight) * profil2_avg_assignment_score) as profil2_total_score,
    
    profil3_quiz_weight,
    profil3_quiz_score,
    profil3_avg_assignment_score,
    (profil3_quiz_weight * profil3_quiz_score) + ((1 - profil3_quiz_weight) * profil3_avg_assignment_score) as profil3_total_score,
    
    profil4_quiz_weight,
    profil4_quiz_score,
    profil4_avg_assignment_score,
    (profil4_quiz_weight * profil4_quiz_score) + ((1 - profil4_quiz_weight) * profil4_avg_assignment_score) as profil4_total_score,
    
    profil5_quiz_weight,
    profil5_quiz_score,
    profil5_avg_assignment_score,
    (profil5_quiz_weight * profil5_quiz_score) + ((1 - profil5_quiz_weight) * profil5_avg_assignment_score) as profil5_total_score,
    
    -- Total score across all profils
    (profil1_quiz_weight * profil1_quiz_score) + ((1 - profil1_quiz_weight) * profil1_avg_assignment_score) + 
    (profil2_quiz_weight * profil2_quiz_score) + ((1 - profil2_quiz_weight) * profil2_avg_assignment_score) + 
    (profil3_quiz_weight * profil3_quiz_score) + ((1 - profil3_quiz_weight) * profil3_avg_assignment_score) + 
    (profil4_quiz_weight * profil4_quiz_score) + ((1 - profil4_quiz_weight) * profil4_avg_assignment_score) + 
    (profil5_quiz_weight * profil5_quiz_score) + ((1 - profil5_quiz_weight) * profil5_avg_assignment_score) as total_score,
    
    -- Latest activity timestamp
    GREATEST(
      COALESCE(profil1_last_activity, '1970-01-01'::timestamp),
      COALESCE(profil2_last_activity, '1970-01-01'::timestamp),
      COALESCE(profil3_last_activity, '1970-01-01'::timestamp),
      COALESCE(profil4_last_activity, '1970-01-01'::timestamp),
      COALESCE(profil5_last_activity, '1970-01-01'::timestamp)
    ) as last_activity_at,
    
    ROW_NUMBER() OVER (ORDER BY 
      (profil1_quiz_weight * profil1_quiz_score) + ((1 - profil1_quiz_weight) * profil1_avg_assignment_score) + 
      (profil2_quiz_weight * profil2_quiz_score) + ((1 - profil2_quiz_weight) * profil2_avg_assignment_score) + 
      (profil3_quiz_weight * profil3_quiz_score) + ((1 - profil3_quiz_weight) * profil3_avg_assignment_score) + 
      (profil4_quiz_weight * profil4_quiz_score) + ((1 - profil4_quiz_weight) * profil4_avg_assignment_score) + 
      (profil5_quiz_weight * profil5_quiz_score) + ((1 - profil5_quiz_weight) * profil5_avg_assignment_score) DESC, 
      GREATEST(
        COALESCE(profil1_last_activity, '1970-01-01'::timestamp),
        COALESCE(profil2_last_activity, '1970-01-01'::timestamp),
        COALESCE(profil3_last_activity, '1970-01-01'::timestamp),
        COALESCE(profil4_last_activity, '1970-01-01'::timestamp),
        COALESCE(profil5_last_activity, '1970-01-01'::timestamp)
      ) DESC
    ) as ranking
  FROM user_scores
  ORDER BY ranking
);