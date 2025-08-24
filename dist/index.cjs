'use strict';var pgCore=require('drizzle-orm/pg-core'),cuid2=require('@paralleldrive/cuid2'),drizzleOrm=require('drizzle-orm');var a=cuid2.init({length:8}),r=()=>new Date;var Oe=pgCore.pgEnum("accounts_role_enum",["admin","mamet","mentor","user","guest","hr"]),h=pgCore.pgTable("accounts",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),nim:pgCore.text("nim").notNull().unique(),password:pgCore.text("password").notNull(),role:Oe("role").default("user").notNull(),lastLoggedIn:pgCore.timestamp("last_logged_in"),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var n=pgCore.pgTable("media",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),creatorId:pgCore.text("creator_id").references(()=>t.id),name:pgCore.text("name").notNull(),bucket:pgCore.text("bucket").notNull(),type:pgCore.text("type").notNull(),url:pgCore.text("url").notNull(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r),createdAt:pgCore.timestamp("created_at").defaultNow()});var t=pgCore.pgTable("users",{id:pgCore.text("id").references(()=>h.id).primaryKey(),nim:pgCore.text("nim").notNull().unique(),email:pgCore.text("email").unique(),emailVerified:pgCore.boolean("email_verified").notNull().default(false),fullName:pgCore.text("full_name").notNull(),fakultas:pgCore.text("fakultas").notNull(),keluarga:pgCore.text("keluarga").notNull(),bata:pgCore.text("bata").notNull(),rumpun:pgCore.text("rumpun"),fotoMediaId:pgCore.text("foto_media_id").references(()=>n.id),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),Q=pgCore.pgTable("email_verification_otps",{userId:pgCore.text("user_id").notNull().references(()=>t.id,{onDelete:"cascade"}),otp:pgCore.text("otp").notNull(),expiresAt:pgCore.timestamp("expires_at",{mode:"date",withTimezone:true}).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow()});var R=pgCore.pgTable("endpoint_analytics",{id:pgCore.serial("id").primaryKey(),userId:pgCore.text("user_id").references(()=>t.id,{onDelete:"set null"}),endpoint:pgCore.text("endpoint").notNull(),method:pgCore.text("method").notNull(),statusCode:pgCore.integer("status_code").notNull(),responseTimeMs:pgCore.integer("response_time_ms"),urlQuery:pgCore.text("url_query"),requestBody:pgCore.text("request_body"),errorMessage:pgCore.text("error_message"),createdAt:pgCore.timestamp("created_at").defaultNow()});var V=pgCore.pgTable("verification_token",{identifier:pgCore.text("identifier").notNull().references(()=>t.email),token:pgCore.text("token").notNull(),expiredAt:pgCore.timestamp("expired_at",{mode:"date",withTimezone:true})},e=>[pgCore.primaryKey({columns:[e.identifier,e.token]})]);var Me=pgCore.pgEnum("class_enum",["sesi_1","sesi_2"]),k=pgCore.pgTable("classes",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),className:pgCore.text("class_name").notNull(),room:pgCore.text("room").notNull(),totalQuota:pgCore.integer("total_quota").notNull(),mentorName:pgCore.text("mentor_name").notNull(),description:pgCore.text("description").notNull(),classType:Me("class_type").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),T=pgCore.pgTable("class_registrations",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),userId:pgCore.text("user_id").notNull().references(()=>t.id),classId:pgCore.text("class_id").notNull().references(()=>k.id),registeredAt:pgCore.timestamp("registered_at").defaultNow(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var _=pgCore.pgTable("profil_kats",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),profilNumber:pgCore.integer("profil_number").notNull().unique(),stageWeight:pgCore.real("stage_weight").notNull().default(0),quizWeight:pgCore.real("quiz_weight").notNull().default(0),assignmentWeight:pgCore.real("assignment_weight").notNull().default(0),attendanceWeight:pgCore.real("attendance_weight").notNull().default(0),title:pgCore.text("title").notNull(),description:pgCore.text("description")}),w=pgCore.pgTable("assignments_profil",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),profilKATId:pgCore.text("profil_kat_id").notNull().references(()=>_.id),title:pgCore.text("title").notNull(),assignmentMediaId:pgCore.text("assignment_media_id").references(()=>n.id),description:pgCore.text("description"),dueDate:pgCore.timestamp("due_date",{mode:"date",withTimezone:true}).notNull(),isOpen:pgCore.boolean("is_open").default(false).notNull(),startDate:pgCore.timestamp("start_date",{mode:"date",withTimezone:true}).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),d=pgCore.pgTable("submissions_profil",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),assignmentId:pgCore.text("assignment_id").notNull().references(()=>w.id),userId:pgCore.text("user_id").notNull().references(()=>t.id),submissionMediaId:pgCore.text("submission_media_id").notNull().references(()=>n.id),score:pgCore.integer("score").default(0).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var Ue=pgCore.pgEnum("status",["completed","not_completed"]),u=pgCore.pgTable("stages",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),profilId:pgCore.text("profil_id").notNull().references(()=>_.id),stageNumber:pgCore.integer("stage_number").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),O=pgCore.pgTable("user_stage_progress",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),userId:pgCore.text("user_id").notNull().references(()=>t.id),stageId:pgCore.text("stage_id").notNull().references(()=>u.id),status:Ue("status").notNull(),completedAt:pgCore.timestamp("completed_at"),quizScore:pgCore.integer("quiz_score"),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var Ke=pgCore.pgEnum("question_type_enum",["multiple_choice","short_answer"]),A=pgCore.pgTable("questions",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),stageId:pgCore.text("stage_id").notNull().references(()=>u.id),questionText:pgCore.text("question_text").notNull(),questionType:Ke("question_type").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),P=pgCore.pgTable("question_answer_options",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),questionId:pgCore.text("question_id").notNull().references(()=>A.id),answerText:pgCore.text("answer_text").notNull(),isCorrect:pgCore.boolean("is_correct").default(false).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var di=pgCore.pgMaterializedView("user_ranking_view",{userId:pgCore.text("user_id").primaryKey(),nim:pgCore.text("nim"),fullName:pgCore.text("full_name"),fakultas:pgCore.text("fakultas"),keluarga:pgCore.text("keluarga"),bata:pgCore.text("bata"),rumpun:pgCore.text("rumpun"),fotoMediaId:pgCore.text("foto_media_id"),profil1QuizWeight:pgCore.real("profil1_quiz_weight").notNull().default(0),profil1QuizScore:pgCore.integer("profil1_quiz_score").notNull().default(0),profil1AssignmentWeight:pgCore.real("profil1_assignment_weight").notNull().default(0),profil1AvgAssignmentScore:pgCore.real("profil1_avg_assignment_score").notNull().default(0),profil1AttendanceWeight:pgCore.real("profil1_attendance_weight").notNull().default(0),profil1AvgAttendanceScore:pgCore.real("profil1_avg_attendance_score").notNull().default(0),profil1TotalScore:pgCore.real("profil1_total_score").notNull().default(0),profil2QuizWeight:pgCore.real("profil2_quiz_weight").notNull().default(0),profil2QuizScore:pgCore.integer("profil2_quiz_score").notNull().default(0),profil2AssignmentWeight:pgCore.real("profil2_assignment_weight").notNull().default(0),profil2AvgAssignmentScore:pgCore.real("profil2_avg_assignment_score").notNull().default(0),profil2AttendanceWeight:pgCore.real("profil2_attendance_weight").notNull().default(0),profil2AvgAttendanceScore:pgCore.real("profil2_avg_attendance_score").notNull().default(0),profil2TotalScore:pgCore.real("profil2_total_score").notNull().default(0),profil3QuizWeight:pgCore.real("profil3_quiz_weight").notNull().default(0),profil3QuizScore:pgCore.integer("profil3_quiz_score").notNull().default(0),profil3AssignmentWeight:pgCore.real("profil3_assignment_weight").notNull().default(0),profil3AvgAssignmentScore:pgCore.real("profil3_avg_assignment_score").notNull().default(0),profil3AttendanceWeight:pgCore.real("profil3_attendance_weight").notNull().default(0),profil3AvgAttendanceScore:pgCore.real("profil3_avg_attendance_score").notNull().default(0),profil3TotalScore:pgCore.real("profil3_total_score").notNull().default(0),profil4QuizWeight:pgCore.real("profil4_quiz_weight").notNull().default(0),profil4QuizScore:pgCore.integer("profil4_quiz_score").notNull().default(0),profil4AssignmentWeight:pgCore.real("profil4_assignment_weight").notNull().default(0),profil4AvgAssignmentScore:pgCore.real("profil4_avg_assignment_score").notNull().default(0),profil4AttendanceWeight:pgCore.real("profil4_attendance_weight").notNull().default(0),profil4AvgAttendanceScore:pgCore.real("profil4_avg_attendance_score").notNull().default(0),profil4TotalScore:pgCore.real("profil4_total_score").notNull().default(0),profil5QuizWeight:pgCore.real("profil5_quiz_weight").notNull().default(0),profil5QuizScore:pgCore.integer("profil5_quiz_score").notNull().default(0),profil5AssignmentWeight:pgCore.real("profil5_assignment_weight").notNull().default(0),profil5AvgAssignmentScore:pgCore.real("profil5_avg_assignment_score").notNull().default(0),profil5AttendanceWeight:pgCore.real("profil5_attendance_weight").notNull().default(0),profil5AvgAttendanceScore:pgCore.real("profil5_avg_attendance_score").notNull().default(0),profil5TotalScore:pgCore.real("profil5_total_score").notNull().default(0),itbGuesserMaxScore:pgCore.real("itb_guesser_max_score").notNull().default(0),memoryGameScore:pgCore.integer("memory_game_score").notNull().default(0),totalScore:pgCore.real("total_score").notNull().default(0),totalWeightedScore:pgCore.real("total_weighted_score").notNull().default(0),tiebreakerScore:pgCore.real("tiebreaker_score").notNull().default(0),lastActivityAt:pgCore.timestamp("last_activity_at"),attendanceTotal:pgCore.integer("attendance_total").notNull().default(0),ranking:pgCore.integer("ranking").notNull()}).as(drizzleOrm.sql`
  WITH user_assignment_scores AS (
    SELECT 
      u.id as user_id,
      pk.profil_number,
      COALESCE(AVG(sp.score), 0) as avg_assignment_score,
      MAX(sp.created_at) as last_assignment_at,
      -- Tiebreaker: sum of milliseconds from due date to submission (earlier = higher score)
      COALESCE(SUM(EXTRACT(EPOCH FROM (ap.due_date - sp.created_at)) * 1000), 0) as assignment_timing_score
    FROM users u
    INNER JOIN accounts a ON a.id = u.id
    CROSS JOIN profil_kats pk 
    LEFT JOIN assignments_profil ap ON ap.profil_kat_id = pk.id
    LEFT JOIN submissions_profil sp ON sp.assignment_id = ap.id AND sp.user_id = u.id
    WHERE pk.profil_number IN (1, 2, 3, 4, 5)
      AND a.role = 'user'
    GROUP BY u.id, pk.profil_number
  ),
  user_quiz_scores AS (
    SELECT 
      u.id as user_id,
      pk.profil_number,
      COALESCE(pk.quiz_weight, 0.0) as quiz_weight,
      COALESCE(pk.assignment_weight, 0.0) as assignment_weight,
      COALESCE(pk.attendance_weight, 0.0) as attendance_weight,
      COALESCE(pk.stage_weight, 0.0) as stage_weight,
      COALESCE(usp.quiz_score, 0) as quiz_score,
      usp.completed_at as quiz_completed_at,
      -- Tiebreaker: use quiz completion timing if available
      CASE WHEN usp.completed_at IS NOT NULL THEN
        EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - usp.completed_at)) * 1000
      ELSE 0 END as quiz_timing_score
    FROM users u
    INNER JOIN accounts a ON a.id = u.id
    CROSS JOIN profil_kats pk 
    LEFT JOIN stages s ON s.profil_id = pk.id
    LEFT JOIN user_stage_progress usp ON usp.user_id = u.id AND usp.stage_id = s.id AND usp.status = 'completed'
    WHERE pk.profil_number IN (1, 2, 3, 4, 5)
      AND a.role = 'user'
  ),
  user_attendance_scores AS (
    SELECT 
      u.id as user_id,
      pk.profil_number,
      COALESCE(AVG(CASE WHEN ua.status = 'hadir' THEN 100.0 ELSE 0.0 END), 0.0) as avg_attendance_score,
      MAX(ua.updated_at) as last_attendance_at,
      -- Tiebreaker: sum of milliseconds from attendance deadline to check-in (earlier = higher score)
      COALESCE(SUM(
        CASE WHEN ua.status = 'hadir' THEN
          EXTRACT(EPOCH FROM ((a.start_time + INTERVAL '1 minute' * a.duration_minutes) - ua.updated_at)) * 1000
        ELSE 0 END
      ), 0) as attendance_timing_score
    FROM users u
    INNER JOIN accounts acc ON acc.id = u.id
    CROSS JOIN profil_kats pk
    LEFT JOIN profil_kat_attendance pka ON pka.profil_kat_id = pk.id
    LEFT JOIN attendances a ON a.id = pka.attendance_id
    LEFT JOIN user_attendance ua ON ua.schedule_id = a.id AND ua.user_id = u.id
    WHERE pk.profil_number IN (1, 2, 3, 4, 5)
      AND a.start_time <= NOW()
      AND acc.role = 'user'
    GROUP BY u.id, pk.profil_number
  ),
  user_attendance_total AS (
    SELECT
      ua.user_id,
      COUNT(*) AS attendance_total
    FROM user_attendance ua
    INNER JOIN attendances a ON a.id = ua.schedule_id
    INNER JOIN users u ON u.id = ua.user_id
    INNER JOIN accounts acc ON acc.id = u.id
    WHERE ua.status = 'hadir'
      AND a.start_time <= NOW()
      AND acc.role = 'user'
    GROUP BY ua.user_id
  ),
  itb_guesser_max_score AS (
    SELECT 
      user_id, 
      COALESCE(MAX(score), 0.0) AS itb_guesser_max_score
    FROM itb_guesser_submissions
    GROUP BY user_id
  ),
  memory_game_score AS (
    SELECT 
      user_id, 
      COALESCE(score, 0) AS memory_game_score
    FROM memory_game_scores
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
      COALESCE(MAX(CASE WHEN uqs.profil_number = 1 THEN uqs.assignment_weight END), 0.0) as profil1_assignment_weight,
      COALESCE(MAX(CASE WHEN uas.profil_number = 1 THEN uas.avg_assignment_score END), 0.0) as profil1_avg_assignment_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 1 THEN uqs.attendance_weight END), 0.0) as profil1_attendance_weight,
      COALESCE(MAX(CASE WHEN uats.profil_number = 1 THEN uats.avg_attendance_score END), 0.0) as profil1_avg_attendance_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 1 THEN uqs.stage_weight END), 0.0) as profil1_stage_weight,
      
      -- Profil 2 scores  
      COALESCE(MAX(CASE WHEN uqs.profil_number = 2 THEN uqs.quiz_weight END), 0.0) as profil2_quiz_weight,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 2 THEN uqs.quiz_score END), 0) as profil2_quiz_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 2 THEN uqs.assignment_weight END), 0.0) as profil2_assignment_weight,
      COALESCE(MAX(CASE WHEN uas.profil_number = 2 THEN uas.avg_assignment_score END), 0.0) as profil2_avg_assignment_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 2 THEN uqs.attendance_weight END), 0.0) as profil2_attendance_weight,
      COALESCE(MAX(CASE WHEN uats.profil_number = 2 THEN uats.avg_attendance_score END), 0.0) as profil2_avg_attendance_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 2 THEN uqs.stage_weight END), 0.0) as profil2_stage_weight,
      
      -- Profil 3 scores
      COALESCE(MAX(CASE WHEN uqs.profil_number = 3 THEN uqs.quiz_weight END), 0.0) as profil3_quiz_weight,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 3 THEN uqs.quiz_score END), 0) as profil3_quiz_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 3 THEN uqs.assignment_weight END), 0.0) as profil3_assignment_weight,
      COALESCE(MAX(CASE WHEN uas.profil_number = 3 THEN uas.avg_assignment_score END), 0.0) as profil3_avg_assignment_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 3 THEN uqs.attendance_weight END), 0.0) as profil3_attendance_weight,
      COALESCE(MAX(CASE WHEN uats.profil_number = 3 THEN uats.avg_attendance_score END), 0.0) as profil3_avg_attendance_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 3 THEN uqs.stage_weight END), 0.0) as profil3_stage_weight,

      -- Profil 4 scores
      COALESCE(MAX(CASE WHEN uqs.profil_number = 4 THEN uqs.quiz_weight END), 0.0) as profil4_quiz_weight,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 4 THEN uqs.quiz_score END), 0) as profil4_quiz_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 4 THEN uqs.assignment_weight END), 0.0) as profil4_assignment_weight,
      COALESCE(MAX(CASE WHEN uas.profil_number = 4 THEN uas.avg_assignment_score END), 0.0) as profil4_avg_assignment_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 4 THEN uqs.attendance_weight END), 0.0) as profil4_attendance_weight,
      COALESCE(MAX(CASE WHEN uats.profil_number = 4 THEN uats.avg_attendance_score END), 0.0) as profil4_avg_attendance_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 4 THEN uqs.stage_weight END), 0.0) as profil4_stage_weight,

      -- Profil 5 scores
      COALESCE(MAX(CASE WHEN uqs.profil_number = 5 THEN uqs.quiz_weight END), 0.0) as profil5_quiz_weight,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 5 THEN uqs.quiz_score END), 0) as profil5_quiz_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 5 THEN uqs.assignment_weight END), 0.0) as profil5_assignment_weight,
      COALESCE(MAX(CASE WHEN uas.profil_number = 5 THEN uas.avg_assignment_score END), 0.0) as profil5_avg_assignment_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 5 THEN uqs.attendance_weight END), 0.0) as profil5_attendance_weight,
      COALESCE(MAX(CASE WHEN uats.profil_number = 5 THEN uats.avg_attendance_score END), 0.0) as profil5_avg_attendance_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 5 THEN uqs.stage_weight END), 0.0) as profil5_stage_weight,

      -- Last activity timestamps
      MAX(CASE WHEN uqs.profil_number = 1 THEN GREATEST(COALESCE(uqs.quiz_completed_at, '1970-01-01'::timestamp), COALESCE(uas.last_assignment_at, '1970-01-01'::timestamp), COALESCE(uats.last_attendance_at, '1970-01-01'::timestamp)) END) as profil1_last_activity,
      MAX(CASE WHEN uqs.profil_number = 2 THEN GREATEST(COALESCE(uqs.quiz_completed_at, '1970-01-01'::timestamp), COALESCE(uas.last_assignment_at, '1970-01-01'::timestamp), COALESCE(uats.last_attendance_at, '1970-01-01'::timestamp)) END) as profil2_last_activity,
      MAX(CASE WHEN uqs.profil_number = 3 THEN GREATEST(COALESCE(uqs.quiz_completed_at, '1970-01-01'::timestamp), COALESCE(uas.last_assignment_at, '1970-01-01'::timestamp), COALESCE(uats.last_attendance_at, '1970-01-01'::timestamp)) END) as profil3_last_activity,
      MAX(CASE WHEN uqs.profil_number = 4 THEN GREATEST(COALESCE(uqs.quiz_completed_at, '1970-01-01'::timestamp), COALESCE(uas.last_assignment_at, '1970-01-01'::timestamp), COALESCE(uats.last_attendance_at, '1970-01-01'::timestamp)) END) as profil4_last_activity,
      MAX(CASE WHEN uqs.profil_number = 5 THEN GREATEST(COALESCE(uqs.quiz_completed_at, '1970-01-01'::timestamp), COALESCE(uas.last_assignment_at, '1970-01-01'::timestamp), COALESCE(uats.last_attendance_at, '1970-01-01'::timestamp)) END) as profil5_last_activity,

      -- Tiebreaker timing scores (accumulation of milliseconds)
      COALESCE(SUM(CASE WHEN uqs.profil_number = 1 THEN uqs.quiz_timing_score END), 0) +
      COALESCE(SUM(CASE WHEN uas.profil_number = 1 THEN uas.assignment_timing_score END), 0) +
      COALESCE(SUM(CASE WHEN uats.profil_number = 1 THEN uats.attendance_timing_score END), 0) as profil1_timing_score,
      
      COALESCE(SUM(CASE WHEN uqs.profil_number = 2 THEN uqs.quiz_timing_score END), 0) +
      COALESCE(SUM(CASE WHEN uas.profil_number = 2 THEN uas.assignment_timing_score END), 0) +
      COALESCE(SUM(CASE WHEN uats.profil_number = 2 THEN uats.attendance_timing_score END), 0) as profil2_timing_score,
      
      COALESCE(SUM(CASE WHEN uqs.profil_number = 3 THEN uqs.quiz_timing_score END), 0) +
      COALESCE(SUM(CASE WHEN uas.profil_number = 3 THEN uas.assignment_timing_score END), 0) +
      COALESCE(SUM(CASE WHEN uats.profil_number = 3 THEN uats.attendance_timing_score END), 0) as profil3_timing_score,
      
      COALESCE(SUM(CASE WHEN uqs.profil_number = 4 THEN uqs.quiz_timing_score END), 0) +
      COALESCE(SUM(CASE WHEN uas.profil_number = 4 THEN uas.assignment_timing_score END), 0) +
      COALESCE(SUM(CASE WHEN uats.profil_number = 4 THEN uats.attendance_timing_score END), 0) as profil4_timing_score,
      
      COALESCE(SUM(CASE WHEN uqs.profil_number = 5 THEN uqs.quiz_timing_score END), 0) +
      COALESCE(SUM(CASE WHEN uas.profil_number = 5 THEN uas.assignment_timing_score END), 0) +
      COALESCE(SUM(CASE WHEN uats.profil_number = 5 THEN uats.attendance_timing_score END), 0) as profil5_timing_score,

      COALESCE(uat.attendance_total, 0) as attendance_total,
      
      -- Side Quest Scores
      COALESCE(igs.itb_guesser_max_score, 0.0) as itb_guesser_max_score,
      COALESCE(mgs.memory_game_score, 0) as memory_game_score

    FROM users u
    INNER JOIN accounts a ON a.id = u.id
    LEFT JOIN user_quiz_scores uqs ON uqs.user_id = u.id
    LEFT JOIN user_assignment_scores uas ON uas.user_id = u.id AND uas.profil_number = uqs.profil_number
    LEFT JOIN user_attendance_scores uats ON uats.user_id = u.id AND uats.profil_number = uqs.profil_number
    LEFT JOIN user_attendance_total uat ON uat.user_id = u.id
    LEFT JOIN itb_guesser_max_score igs ON igs.user_id = u.id
    LEFT JOIN memory_game_score mgs ON mgs.user_id = u.id
    WHERE a.role = 'user'
    GROUP BY u.id, u.nim, u.full_name, u.fakultas, u.keluarga, u.bata, u.rumpun, u.foto_media_id, uat.attendance_total, igs.itb_guesser_max_score, mgs.memory_game_score
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
    profil1_assignment_weight,
    profil1_avg_assignment_score,
    profil1_attendance_weight,
    profil1_avg_attendance_score,
    -- Normalized scoring for profil 1
    CASE 
      WHEN (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight) > 0 THEN
        ((profil1_quiz_weight / (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight)) * profil1_quiz_score) +
        ((profil1_assignment_weight / (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight)) * profil1_avg_assignment_score) +
        ((profil1_attendance_weight / (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight)) * profil1_avg_attendance_score)
      ELSE 0.0
    END as profil1_total_score,
    
    profil2_quiz_weight,
    profil2_quiz_score,
    profil2_assignment_weight,
    profil2_avg_assignment_score,
    profil2_attendance_weight,
    profil2_avg_attendance_score,
    -- Normalized scoring for profil 2
    CASE 
      WHEN (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight) > 0 THEN
        ((profil2_quiz_weight / (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight)) * profil2_quiz_score) +
        ((profil2_assignment_weight / (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight)) * profil2_avg_assignment_score) +
        ((profil2_attendance_weight / (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight)) * profil2_avg_attendance_score)
      ELSE 0.0
    END as profil2_total_score,
    
    profil3_quiz_weight,
    profil3_quiz_score,
    profil3_assignment_weight,
    profil3_avg_assignment_score,
    profil3_attendance_weight,
    profil3_avg_attendance_score,
    -- Normalized scoring for profil 3
    CASE 
      WHEN (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight) > 0 THEN
        ((profil3_quiz_weight / (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight)) * profil3_quiz_score) +
        ((profil3_assignment_weight / (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight)) * profil3_avg_assignment_score) +
        ((profil3_attendance_weight / (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight)) * profil3_avg_attendance_score)
      ELSE 0.0
    END as profil3_total_score,
    
    profil4_quiz_weight,
    profil4_quiz_score,
    profil4_assignment_weight,
    profil4_avg_assignment_score,
    profil4_attendance_weight,
    profil4_avg_attendance_score,
    -- Normalized scoring for profil 4
    CASE 
      WHEN (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight) > 0 THEN
        ((profil4_quiz_weight / (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight)) * profil4_quiz_score) +
        ((profil4_assignment_weight / (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight)) * profil4_avg_assignment_score) +
        ((profil4_attendance_weight / (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight)) * profil4_avg_attendance_score)
      ELSE 0.0
    END as profil4_total_score,
    
    profil5_quiz_weight,
    profil5_quiz_score,
    profil5_assignment_weight,
    profil5_avg_assignment_score,
    profil5_attendance_weight,
    profil5_avg_attendance_score,
    -- Normalized scoring for profil 5
    CASE 
      WHEN (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight) > 0 THEN
        ((profil5_quiz_weight / (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight)) * profil5_quiz_score) +
        ((profil5_assignment_weight / (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight)) * profil5_avg_assignment_score) +
        ((profil5_attendance_weight / (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight)) * profil5_avg_attendance_score)
      ELSE 0.0
    END as profil5_total_score,
    
    -- Side Quest Scores
    itb_guesser_max_score,
    memory_game_score,
    
    -- Total score across all profils with normalized weights plus side quest scores
    (((CASE 
      WHEN (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight) > 0 THEN
        ((profil1_quiz_weight / (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight)) * profil1_quiz_score) +
        ((profil1_assignment_weight / (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight)) * profil1_avg_assignment_score) +
        ((profil1_attendance_weight / (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight)) * profil1_avg_attendance_score)
      ELSE 0.0
    END) + 
    (CASE 
      WHEN (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight) > 0 THEN
        ((profil2_quiz_weight / (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight)) * profil2_quiz_score) +
        ((profil2_assignment_weight / (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight)) * profil2_avg_assignment_score) +
        ((profil2_attendance_weight / (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight)) * profil2_avg_attendance_score)
      ELSE 0.0
    END) + 
    (CASE 
      WHEN (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight) > 0 THEN
        ((profil3_quiz_weight / (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight)) * profil3_quiz_score) +
        ((profil3_assignment_weight / (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight)) * profil3_avg_assignment_score) +
        ((profil3_attendance_weight / (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight)) * profil3_avg_attendance_score)
      ELSE 0.0
    END) + 
    (CASE 
      WHEN (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight) > 0 THEN
        ((profil4_quiz_weight / (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight)) * profil4_quiz_score) +
        ((profil4_assignment_weight / (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight)) * profil4_avg_assignment_score) +
        ((profil4_attendance_weight / (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight)) * profil4_avg_attendance_score)
      ELSE 0.0
    END) + 
    (CASE 
      WHEN (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight) > 0 THEN
        ((profil5_quiz_weight / (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight)) * profil5_quiz_score) +
        ((profil5_assignment_weight / (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight)) * profil5_avg_assignment_score) +
        ((profil5_attendance_weight / (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight)) * profil5_avg_attendance_score)
      ELSE 0.0
    END)) + itb_guesser_max_score + memory_game_score) as total_score,

    ((CASE 
      WHEN (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight) > 0 THEN
        ((profil1_quiz_weight / (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight)) * profil1_quiz_score) +
        ((profil1_assignment_weight / (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight)) * profil1_avg_assignment_score) +
        ((profil1_attendance_weight / (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight)) * profil1_avg_attendance_score)
      ELSE 0.0
    END) * profil1_stage_weight + 
    (CASE 
      WHEN (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight) > 0 THEN
        ((profil2_quiz_weight / (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight)) * profil2_quiz_score) +
        ((profil2_assignment_weight / (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight)) * profil2_avg_assignment_score) +
        ((profil2_attendance_weight / (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight)) * profil2_avg_attendance_score)
      ELSE 0.0
    END) * profil2_stage_weight + 
    (CASE 
      WHEN (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight) > 0 THEN
        ((profil3_quiz_weight / (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight)) * profil3_quiz_score) +
        ((profil3_assignment_weight / (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight)) * profil3_avg_assignment_score) +
        ((profil3_attendance_weight / (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight)) * profil3_avg_attendance_score)
      ELSE 0.0
    END) * profil3_stage_weight + 
    (CASE 
      WHEN (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight) > 0 THEN
        ((profil4_quiz_weight / (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight)) * profil4_quiz_score) +
        ((profil4_assignment_weight / (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight)) * profil4_avg_assignment_score) +
        ((profil4_attendance_weight / (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight)) * profil4_avg_attendance_score)
      ELSE 0.0
    END) * profil4_stage_weight + 
    (CASE 
      WHEN (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight) > 0 THEN
        ((profil5_quiz_weight / (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight)) * profil5_quiz_score) +
        ((profil5_assignment_weight / (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight)) * profil5_avg_assignment_score) +
        ((profil5_attendance_weight / (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight)) * profil5_avg_attendance_score)
      ELSE 0.0
    END) * profil5_stage_weight) as total_weighted_score,
    
    -- Tiebreaker score: total timing across all profils (higher = completed tasks earlier)
    ((profil1_timing_score + profil2_timing_score + profil3_timing_score + profil4_timing_score + profil5_timing_score) / 1000.0) as tiebreaker_score,
    
    attendance_total,

    -- Latest activity timestamp
    GREATEST(
      COALESCE(profil1_last_activity, '1970-01-01'::timestamp),
      COALESCE(profil2_last_activity, '1970-01-01'::timestamp),
      COALESCE(profil3_last_activity, '1970-01-01'::timestamp),
      COALESCE(profil4_last_activity, '1970-01-01'::timestamp),
      COALESCE(profil5_last_activity, '1970-01-01'::timestamp)
    ) as last_activity_at,
    
    ROW_NUMBER() OVER (ORDER BY 
      -- Primary sort: total score including side quests (higher is better)
      ((CASE 
        WHEN (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight) > 0 THEN
          ((profil1_quiz_weight / (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight)) * profil1_quiz_score) +
          ((profil1_assignment_weight / (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight)) * profil1_avg_assignment_score) +
          ((profil1_attendance_weight / (profil1_quiz_weight + profil1_assignment_weight + profil1_attendance_weight)) * profil1_avg_attendance_score)
        ELSE 0.0
      END) + 
      (CASE 
        WHEN (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight) > 0 THEN
          ((profil2_quiz_weight / (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight)) * profil2_quiz_score) +
          ((profil2_assignment_weight / (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight)) * profil2_avg_assignment_score) +
          ((profil2_attendance_weight / (profil2_quiz_weight + profil2_assignment_weight + profil2_attendance_weight)) * profil2_avg_attendance_score)
        ELSE 0.0
      END) + 
      (CASE 
        WHEN (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight) > 0 THEN
          ((profil3_quiz_weight / (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight)) * profil3_quiz_score) +
          ((profil3_assignment_weight / (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight)) * profil3_avg_assignment_score) +
          ((profil3_attendance_weight / (profil3_quiz_weight + profil3_assignment_weight + profil3_attendance_weight)) * profil3_avg_attendance_score)
        ELSE 0.0
      END) + 
      (CASE 
        WHEN (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight) > 0 THEN
          ((profil4_quiz_weight / (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight)) * profil4_quiz_score) +
          ((profil4_assignment_weight / (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight)) * profil4_avg_assignment_score) +
          ((profil4_attendance_weight / (profil4_quiz_weight + profil4_assignment_weight + profil4_attendance_weight)) * profil4_avg_attendance_score)
        ELSE 0.0
      END) + 
      (CASE 
        WHEN (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight) > 0 THEN
          ((profil5_quiz_weight / (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight)) * profil5_quiz_score) +
          ((profil5_assignment_weight / (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight)) * profil5_avg_assignment_score) +
          ((profil5_attendance_weight / (profil5_quiz_weight + profil5_assignment_weight + profil5_attendance_weight)) * profil5_avg_attendance_score)
        ELSE 0.0
      END) + itb_guesser_max_score + memory_game_score) DESC,
      -- Tiebreaker: timing score (higher = completed tasks earlier)
      (profil1_timing_score + profil2_timing_score + profil3_timing_score + profil4_timing_score + profil5_timing_score) DESC,
      -- Final tiebreaker: latest activity
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
`);async function ci(e){await e.execute(drizzleOrm.sql`REFRESH MATERIALIZED VIEW CONCURRENTLY user_ranking_view`);}var mi=drizzleOrm.sql`
-- Primary key index (automatically created, but explicit for clarity)
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_ranking_view_user_id ON user_ranking_view(user_id);

-- Most important: ranking index for leaderboards
CREATE INDEX IF NOT EXISTS idx_user_ranking_view_ranking ON user_ranking_view(ranking);

-- Total score index for sorting and filtering
CREATE INDEX IF NOT EXISTS idx_user_ranking_view_total_score ON user_ranking_view(total_score DESC);

-- Combined index for ranking queries with tie-breaking
CREATE INDEX IF NOT EXISTS idx_user_ranking_view_score_activity ON user_ranking_view(total_score DESC, last_activity_at DESC);

-- Fakultas filtering
CREATE INDEX IF NOT EXISTS idx_user_ranking_view_fakultas ON user_ranking_view(fakultas);

-- Combined fakultas + ranking for filtered leaderboards
CREATE INDEX IF NOT EXISTS idx_user_ranking_view_fakultas_ranking ON user_ranking_view(fakultas, ranking);

-- NIM lookup (if you search by NIM)
CREATE INDEX IF NOT EXISTS idx_user_ranking_view_nim ON user_ranking_view(nim);

-- Keluarga filtering
CREATE INDEX IF NOT EXISTS idx_user_ranking_view_keluarga ON user_ranking_view(keluarga);
`;var Je=pgCore.pgEnum("attendance_status",["hadir","tidak_hadir"]),Qe=pgCore.pgEnum("attendance_type",["opening","closing"]),E=pgCore.pgTable("attendances",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),attendanceType:Qe("attendance_type").notNull(),dayNumber:pgCore.integer("day_number").notNull(),startTime:pgCore.timestamp("start_time",{mode:"date",withTimezone:true}).notNull(),durationMinutes:pgCore.integer("duration_minutes").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),v=pgCore.pgTable("profil_kat_attendance",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),profilKATId:pgCore.text("profil_kat_id").notNull().references(()=>_.id),attendanceId:pgCore.text("attendance_id").notNull().references(()=>E.id),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),L=pgCore.pgTable("user_attendance",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),scheduleId:pgCore.text("schedule_id").notNull().references(()=>E.id),userId:pgCore.text("user_id").notNull().references(()=>t.id),status:Je("status").default("tidak_hadir").notNull(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var Ye=pgCore.pgEnum("itb_guesser_tempat",["Ganesha","Jatinangor","Cirebon"]),de=pgCore.pgTable("itb_guesser_options",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),tempat:Ye("tempat").notNull(),publicUrl:pgCore.text("public_url").notNull(),lat:pgCore.real("lat").notNull(),lng:pgCore.real("lng").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),K=pgCore.pgTable("itb_guesser_submissions",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),userId:pgCore.text("user_id").notNull().references(()=>t.id),score:pgCore.real("score").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),ce=pgCore.pgTable("memory_game_scores",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),userId:pgCore.text("user_id").notNull().unique().references(()=>t.id),score:pgCore.integer("score").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var tt=pgCore.pgEnum("personality",["Direwolf","Gigantopithecus","Jeholornis","Brontothere","Saber Tooth","Mammoth","Deinonychus","T-Rex","Diplodocus","Troodon","Quetzalcoatlus","Parasaurolophus","Velociraptor","Ankylosaurus","Megaloceros","Argentavis Magnificens"]),Ee=pgCore.pgTable("user_personality",{userId:pgCore.text("user_id").notNull().references(()=>t.id),personality:tt("personality").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var te=pgCore.pgTable("handbook",{mediaId:pgCore.text("media_id").primaryKey().references(()=>n.id),title:pgCore.text("title")});var er=pgCore.pgTable("activities",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),day:pgCore.integer("day").notNull(),title:pgCore.text("title").notNull(),description:pgCore.text("description"),startTime:pgCore.time("start_time").notNull(),endTime:pgCore.time("end_time").notNull(),location:pgCore.text("location"),lat:pgCore.real("lat"),lng:pgCore.real("lng"),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var f=pgCore.pgTable("user_matches",{id:pgCore.text("id").primaryKey().$defaultFn(cuid2.createId),topic:pgCore.text("topic").notNull(),isActive:pgCore.boolean("is_active").notNull().default(true),isAnonymous:pgCore.boolean("is_anonymous").notNull().default(true),isRevealed:pgCore.boolean("is_revealed").notNull().default(false),firstUserId:pgCore.text("first_user_id").notNull().references(()=>t.id,{onDelete:"cascade"}),secondUserId:pgCore.text("second_user_id").notNull().references(()=>t.id,{onDelete:"cascade"}),lastMessage:pgCore.text("last_message"),createdAt:pgCore.timestamp("created_at").notNull().defaultNow()}),x=pgCore.pgTable("messages",{id:pgCore.bigserial("id",{mode:"number"}).primaryKey(),userMatchId:pgCore.text("user_match_id").notNull().references(()=>f.id,{onDelete:"cascade"}),senderId:pgCore.text("sender_id").notNull().references(()=>t.id,{onDelete:"cascade"}),content:pgCore.text("content").notNull(),createdAt:pgCore.timestamp("created_at",{mode:"date",withTimezone:true}).notNull().defaultNow()});var hr=drizzleOrm.relations(h,({one:e})=>({user:e(t,{fields:[h.id],references:[t.id]})})),wr=drizzleOrm.relations(t,({one:e,many:s})=>({account:e(h,{fields:[t.id],references:[h.id]}),fotoMedia:e(n,{fields:[t.fotoMediaId],references:[n.id]}),stageProgress:s(O),attendance:s(L),submissions:s(d),createdMedia:s(n),analytics:s(R),classRegistrations:s(T),userMatchesAsFirstUser:s(f,{relationName:"first_user"}),userMatchesAsSecondUser:s(f,{relationName:"second_user"}),messages:s(x,{relationName:"sender"}),itbGuesserSubmissions:s(K),memoryGameScore:e(ce),personality:e(Ee)})),Ar=drizzleOrm.relations(Q,({one:e})=>({user:e(t,{fields:[Q.userId],references:[t.id]})})),Cr=drizzleOrm.relations(V,({one:e})=>({user:e(t,{fields:[V.identifier],references:[t.email]})})),Sr=drizzleOrm.relations(n,({one:e,many:s})=>({creator:e(t,{fields:[n.creatorId],references:[t.id]}),handbook:e(te,{fields:[n.id],references:[te.mediaId]}),submissions:s(d),itbGuesserOptions:s(de)})),qr=drizzleOrm.relations(E,({many:e})=>({userAttendance:e(L),profilKATAttendances:e(v)})),Tr=drizzleOrm.relations(L,({one:e})=>({attendance:e(E,{fields:[L.scheduleId],references:[E.id]}),user:e(t,{fields:[L.userId],references:[t.id]})})),zr=drizzleOrm.relations(v,({one:e})=>({profilKAT:e(_,{fields:[v.profilKATId],references:[_.id]}),attendance:e(E,{fields:[v.attendanceId],references:[E.id]})})),Or=drizzleOrm.relations(u,({many:e,one:s})=>({userProgress:e(O),questions:e(A),profil:s(_,{fields:[u.profilId],references:[_.id]})})),br=drizzleOrm.relations(O,({one:e})=>({user:e(t,{fields:[O.userId],references:[t.id]}),stage:e(u,{fields:[O.stageId],references:[u.id]})})),Hr=drizzleOrm.relations(A,({one:e,many:s})=>({stage:e(u,{fields:[A.stageId],references:[u.id]}),answerOptions:s(P)})),vr=drizzleOrm.relations(P,({one:e})=>({question:e(A,{fields:[P.questionId],references:[A.id]})})),Lr=drizzleOrm.relations(_,({many:e,one:s})=>({assignments:e(w),attendances:e(v),stage:s(u,{fields:[_.id],references:[u.profilId]})})),yr=drizzleOrm.relations(w,({many:e,one:s})=>({submissions:e(d),profil:s(_,{fields:[w.profilKATId],references:[_.id]})})),Ir=drizzleOrm.relations(d,({one:e})=>({assignment:e(w,{fields:[d.assignmentId],references:[w.id]}),user:e(t,{fields:[d.userId],references:[t.id]}),media:e(n,{fields:[d.submissionMediaId],references:[n.id]})})),xr=drizzleOrm.relations(k,({one:e,many:s})=>({registrations:s(T)})),Dr=drizzleOrm.relations(T,({one:e})=>({user:e(t,{fields:[T.userId],references:[t.id]}),class:e(k,{fields:[T.classId],references:[k.id]})})),kr=drizzleOrm.relations(R,({one:e})=>({user:e(t,{fields:[R.userId],references:[t.id]})})),Wr=drizzleOrm.relations(f,({many:e,one:s})=>({firstUser:s(t,{fields:[f.firstUserId],references:[t.id],relationName:"first_user"}),secondUser:s(t,{fields:[f.secondUserId],references:[t.id],relationName:"second_user"}),messages:e(x)})),Mr=drizzleOrm.relations(x,({one:e})=>({senderId:e(t,{fields:[x.senderId],references:[t.id],relationName:"sender"}),userMatch:e(f,{fields:[x.userMatchId],references:[f.id]})})),Rr=drizzleOrm.relations(K,({one:e})=>({user:e(t,{fields:[K.userId],references:[t.id]})}));exports.accounts=h;exports.accountsRelation=hr;exports.accountsRoleEnum=Oe;exports.activities=er;exports.assignmentsProfil=w;exports.assignmentsProfilRelation=yr;exports.attendanceStatusEnum=Je;exports.attendanceTypeEnum=Qe;exports.attendances=E;exports.attendancesRelation=qr;exports.classEnum=Me;exports.classRegistrations=T;exports.classRegistrationsRelation=Dr;exports.classes=k;exports.classesRelation=xr;exports.createUserRankingViewIndexes=mi;exports.emailVerificationOtps=Q;exports.emailVerificationOtpsRelations=Ar;exports.endpointAnalytics=R;exports.endpointAnalyticsRelation=kr;exports.handbook=te;exports.itbGuesserOptions=de;exports.itbGuesserSubmissions=K;exports.itbGuesserSubmissionsRelations=Rr;exports.itbGuesserTempatEnum=Ye;exports.media=n;exports.mediaRelation=Sr;exports.memoryGameScores=ce;exports.messages=x;exports.messagesRelations=Mr;exports.personalityEnum=tt;exports.profilKATAttendances=v;exports.profilKATAttendancesRelation=zr;exports.profilKATs=_;exports.profilKATsRelation=Lr;exports.questionAnswerOptions=P;exports.questionAnswerOptionsRelation=vr;exports.questionTypeEnum=Ke;exports.questions=A;exports.questionsRelation=Hr;exports.refreshUserRankingView=ci;exports.stageStatusEnum=Ue;exports.stages=u;exports.stagesRelation=Or;exports.submissionsProfil=d;exports.submissionsProfilRelation=Ir;exports.userAttendance=L;exports.userAttendanceRelation=Tr;exports.userMatches=f;exports.userMatchesRelations=Wr;exports.userPersonality=Ee;exports.userRankingView=di;exports.userStageProgress=O;exports.userStageProgressRelation=br;exports.users=t;exports.usersRelation=wr;exports.verificationToken=V;exports.verificationTokenRelations=Cr;