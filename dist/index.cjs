'use strict';var pgCore=require('drizzle-orm/pg-core'),cuid2=require('@paralleldrive/cuid2'),drizzleOrm=require('drizzle-orm');var s=cuid2.init({length:8}),a=()=>new Date;var ce=pgCore.pgEnum("accounts_role_enum",["admin","mamet","mentor","user","guest","hr"]),E=pgCore.pgTable("accounts",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),nim:pgCore.text("nim").notNull().unique(),password:pgCore.text("password").notNull(),role:ce("role").default("user").notNull(),lastLoggedIn:pgCore.timestamp("last_logged_in"),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a)});var Ne=pgCore.pgEnum("media_bucket_enum",["profile","content","documents","uploads","assignment"]),_=pgCore.pgTable("media",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),creatorId:pgCore.text("creator_id").notNull().references(()=>t.id),name:pgCore.text("name").notNull(),bucket:Ne("bucket").notNull(),type:pgCore.text("type").notNull(),url:pgCore.text("url").notNull(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a),createdAt:pgCore.timestamp("created_at").defaultNow()});var t=pgCore.pgTable("users",{id:pgCore.text("id").references(()=>E.id).primaryKey(),nim:pgCore.text("nim").notNull().unique(),email:pgCore.text("email").unique(),emailVerified:pgCore.boolean("email_verified").notNull().default(false),fullName:pgCore.text("full_name"),fakultas:pgCore.text("fakultas"),keluarga:pgCore.text("keluarga"),bata:pgCore.text("bata"),rumpun:pgCore.text("rumpun"),fotoMediaId:pgCore.text("foto_media_id").references(()=>_.id),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a)}),$=pgCore.pgTable("email_verification_otps",{userId:pgCore.text("user_id").notNull().references(()=>t.id,{onDelete:"cascade"}),otp:pgCore.text("otp").notNull(),expiresAt:pgCore.timestamp("expires_at",{mode:"date",withTimezone:true}).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow()});var M=pgCore.pgTable("endpoint_analytics",{id:pgCore.serial("id").primaryKey(),userId:pgCore.text("user_id").references(()=>t.id,{onDelete:"set null"}),endpoint:pgCore.text("endpoint").notNull(),method:pgCore.text("method").notNull(),statusCode:pgCore.integer("status_code").notNull(),responseTimeMs:pgCore.integer("response_time_ms"),urlQuery:pgCore.text("url_query"),requestBody:pgCore.text("request_body"),errorMessage:pgCore.text("error_message"),createdAt:pgCore.timestamp("created_at").defaultNow()});var J=pgCore.pgTable("verification_token",{identifier:pgCore.text("identifier").notNull().references(()=>t.email),token:pgCore.text("token").notNull(),expiredAt:pgCore.timestamp("expired_at",{mode:"date",withTimezone:true})},e=>[pgCore.primaryKey({columns:[e.identifier,e.token]})]);var He=pgCore.pgEnum("class_enum",["sesi_1","sesi_2"]),S=pgCore.pgTable("classes",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),className:pgCore.text("class_name").notNull(),room:pgCore.text("room").notNull(),totalQuota:pgCore.integer("total_quota").notNull(),mentorName:pgCore.text("mentor_name").notNull(),classType:He("class_type").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a)}),T=pgCore.pgTable("class_registrations",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),userId:pgCore.text("user_id").notNull().references(()=>t.id),classId:pgCore.text("class_id").notNull().references(()=>S.id),registeredAt:pgCore.timestamp("registered_at").defaultNow(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a)});var n=pgCore.pgTable("profil_kats",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),profilNumber:pgCore.integer("profil_number").notNull().unique(),stageWeight:pgCore.real("stage_weight").notNull().default(0),quizWeight:pgCore.real("quiz_weight").notNull().default(0),assignmentWeight:pgCore.real("assignment_weight").notNull().default(0),attendanceWeight:pgCore.real("attendance_weight").notNull().default(0),title:pgCore.text("title").notNull(),description:pgCore.text("description")}),w=pgCore.pgTable("assignments_profil",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),profilKATId:pgCore.text("profil_kat_id").notNull().references(()=>n.id),title:pgCore.text("title").notNull(),assignmentMediaId:pgCore.text("assignment_media_id").references(()=>_.id),description:pgCore.text("description"),dueDate:pgCore.timestamp("due_date",{mode:"date",withTimezone:true}).notNull(),isOpen:pgCore.boolean("is_open").default(false).notNull(),startDate:pgCore.timestamp("start_date",{mode:"date",withTimezone:true}).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a)}),g=pgCore.pgTable("submissions_profil",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),assignmentId:pgCore.text("assignment_id").notNull().references(()=>w.id),userId:pgCore.text("user_id").notNull().references(()=>t.id),submissionMediaId:pgCore.text("submission_media_id").notNull().references(()=>_.id),score:pgCore.integer("score").default(0).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a)});var be=pgCore.pgEnum("status",["completed","not_completed"]),u=pgCore.pgTable("stages",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),profilId:pgCore.text("profil_id").notNull().references(()=>n.id),stageNumber:pgCore.integer("stage_number").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a)}),O=pgCore.pgTable("user_stage_progress",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),userId:pgCore.text("user_id").notNull().references(()=>t.id),stageId:pgCore.text("stage_id").notNull().references(()=>u.id),status:be("status").notNull(),completedAt:pgCore.timestamp("completed_at"),quizScore:pgCore.integer("quiz_score"),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a)});var ke=pgCore.pgEnum("question_type_enum",["multiple_choice","short_answer"]),h=pgCore.pgTable("questions",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),stageId:pgCore.text("stage_id").notNull().references(()=>u.id),questionText:pgCore.text("question_text").notNull(),questionType:ke("question_type").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a)}),F=pgCore.pgTable("question_answer_options",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),questionId:pgCore.text("question_id").notNull().references(()=>h.id),answerText:pgCore.text("answer_text").notNull(),isCorrect:pgCore.boolean("is_correct").default(false).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a)});var Qt=pgCore.pgMaterializedView("user_ranking_view",{userId:pgCore.text("user_id").primaryKey(),nim:pgCore.text("nim"),fullName:pgCore.text("full_name"),fakultas:pgCore.text("fakultas"),keluarga:pgCore.text("keluarga"),bata:pgCore.text("bata"),rumpun:pgCore.text("rumpun"),fotoMediaId:pgCore.text("foto_media_id"),profil1QuizWeight:pgCore.real("profil1_quiz_weight").notNull().default(0),profil1QuizScore:pgCore.integer("profil1_quiz_score").notNull().default(0),profil1AssignmentWeight:pgCore.real("profil1_assignment_weight").notNull().default(0),profil1AvgAssignmentScore:pgCore.real("profil1_avg_assignment_score").notNull().default(0),profil1AttendanceWeight:pgCore.real("profil1_attendance_weight").notNull().default(0),profil1AvgAttendanceScore:pgCore.real("profil1_avg_attendance_score").notNull().default(0),profil1TotalScore:pgCore.real("profil1_total_score").notNull().default(0),profil2QuizWeight:pgCore.real("profil2_quiz_weight").notNull().default(0),profil2QuizScore:pgCore.integer("profil2_quiz_score").notNull().default(0),profil2AssignmentWeight:pgCore.real("profil2_assignment_weight").notNull().default(0),profil2AvgAssignmentScore:pgCore.real("profil2_avg_assignment_score").notNull().default(0),profil2AttendanceWeight:pgCore.real("profil2_attendance_weight").notNull().default(0),profil2AvgAttendanceScore:pgCore.real("profil2_avg_attendance_score").notNull().default(0),profil2TotalScore:pgCore.real("profil2_total_score").notNull().default(0),profil3QuizWeight:pgCore.real("profil3_quiz_weight").notNull().default(0),profil3QuizScore:pgCore.integer("profil3_quiz_score").notNull().default(0),profil3AssignmentWeight:pgCore.real("profil3_assignment_weight").notNull().default(0),profil3AvgAssignmentScore:pgCore.real("profil3_avg_assignment_score").notNull().default(0),profil3AttendanceWeight:pgCore.real("profil3_attendance_weight").notNull().default(0),profil3AvgAttendanceScore:pgCore.real("profil3_avg_attendance_score").notNull().default(0),profil3TotalScore:pgCore.real("profil3_total_score").notNull().default(0),profil4QuizWeight:pgCore.real("profil4_quiz_weight").notNull().default(0),profil4QuizScore:pgCore.integer("profil4_quiz_score").notNull().default(0),profil4AssignmentWeight:pgCore.real("profil4_assignment_weight").notNull().default(0),profil4AvgAssignmentScore:pgCore.real("profil4_avg_assignment_score").notNull().default(0),profil4AttendanceWeight:pgCore.real("profil4_attendance_weight").notNull().default(0),profil4AvgAttendanceScore:pgCore.real("profil4_avg_attendance_score").notNull().default(0),profil4TotalScore:pgCore.real("profil4_total_score").notNull().default(0),profil5QuizWeight:pgCore.real("profil5_quiz_weight").notNull().default(0),profil5QuizScore:pgCore.integer("profil5_quiz_score").notNull().default(0),profil5AssignmentWeight:pgCore.real("profil5_assignment_weight").notNull().default(0),profil5AvgAssignmentScore:pgCore.real("profil5_avg_assignment_score").notNull().default(0),profil5AttendanceWeight:pgCore.real("profil5_attendance_weight").notNull().default(0),profil5AvgAttendanceScore:pgCore.real("profil5_avg_attendance_score").notNull().default(0),profil5TotalScore:pgCore.real("profil5_total_score").notNull().default(0),totalScore:pgCore.real("total_score").notNull().default(0),totalWeightedScore:pgCore.real("total_weighted_score").notNull().default(0),tiebreakerScore:pgCore.real("tiebreaker_score").notNull().default(0),lastActivityAt:pgCore.timestamp("last_activity_at"),attendanceTotal:pgCore.integer("attendance_total").notNull().default(0),ranking:pgCore.integer("ranking").notNull()}).as(drizzleOrm.sql`
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

      COALESCE(uat.attendance_total, 0) as attendance_total

    FROM users u
    INNER JOIN accounts a ON a.id = u.id
    LEFT JOIN user_quiz_scores uqs ON uqs.user_id = u.id
    LEFT JOIN user_assignment_scores uas ON uas.user_id = u.id AND uas.profil_number = uqs.profil_number
    LEFT JOIN user_attendance_scores uats ON uats.user_id = u.id AND uats.profil_number = uqs.profil_number
    LEFT JOIN user_attendance_total uat ON uat.user_id = u.id
    WHERE a.role = 'user'
    GROUP BY u.id, u.nim, u.full_name, u.fakultas, u.keluarga, u.bata, u.rumpun, u.foto_media_id, uat.attendance_total
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
    
    -- Total score across all profils with normalized weights
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
    END)) as total_score,

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
      -- Primary sort: total score (higher is better)
      (CASE 
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
      END) DESC,
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
`);async function Vt(e){await e.execute(drizzleOrm.sql`REFRESH MATERIALIZED VIEW CONCURRENTLY user_ranking_view`);}var Bt=drizzleOrm.sql`
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
`;var ye=pgCore.pgEnum("attendance_status",["hadir","tidak_hadir"]),Me=pgCore.pgEnum("attendance_type",["opening","closing"]),c=pgCore.pgTable("attendances",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),attendanceType:Me("attendance_type").notNull(),dayNumber:pgCore.integer("day_number").notNull(),startTime:pgCore.timestamp("start_time",{mode:"date",withTimezone:true}).notNull(),durationMinutes:pgCore.integer("duration_minutes").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a)}),L=pgCore.pgTable("profil_kat_attendance",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),profilKATId:pgCore.text("profil_kat_id").notNull().references(()=>n.id),attendanceId:pgCore.text("attendance_id").notNull().references(()=>c.id),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a)}),b=pgCore.pgTable("user_attendance",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),scheduleId:pgCore.text("schedule_id").notNull().references(()=>c.id),userId:pgCore.text("user_id").notNull().references(()=>t.id),status:ye("status").default("tidak_hadir").notNull(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a)});var wi=pgCore.pgTable("activities",{id:pgCore.text("id").primaryKey().$defaultFn(()=>s()),day:pgCore.integer("day").notNull(),title:pgCore.text("title").notNull(),description:pgCore.text("description"),startTime:pgCore.time("start_time").notNull(),endTime:pgCore.time("end_time").notNull(),location:pgCore.text("location"),geolocation:pgCore.text("geolocation"),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(a)});var f=pgCore.pgTable("user_matches",{id:pgCore.text("id").primaryKey().$defaultFn(cuid2.createId),topic:pgCore.text("topic").notNull(),isActive:pgCore.boolean("is_active").notNull().default(true),isAnonymous:pgCore.boolean("is_anonymous").notNull().default(true),isRevealed:pgCore.boolean("is_revealed").notNull().default(false),firstUserId:pgCore.text("first_user_id").notNull().references(()=>t.id,{onDelete:"cascade"}),secondUserId:pgCore.text("second_user_id").notNull().references(()=>t.id,{onDelete:"cascade"}),lastMessage:pgCore.text("last_message"),createdAt:pgCore.timestamp("created_at").defaultNow()}),I=pgCore.pgTable("messages",{id:pgCore.bigserial("id",{mode:"number"}).primaryKey(),userMatchId:pgCore.text("user_match_id").notNull().references(()=>f.id,{onDelete:"cascade"}),senderId:pgCore.text("sender_id").notNull().references(()=>t.id,{onDelete:"cascade"}),content:pgCore.text("content").notNull(),createdAt:pgCore.timestamp("created_at",{mode:"date",withTimezone:true})});var Mi=drizzleOrm.relations(E,({one:e})=>({user:e(t,{fields:[E.id],references:[t.id]})})),Ri=drizzleOrm.relations(t,({one:e,many:r})=>({account:e(E,{fields:[t.id],references:[E.id]}),fotoMedia:e(_,{fields:[t.fotoMediaId],references:[_.id]}),stageProgress:r(O),attendance:r(b),submissions:r(g),createdMedia:r(_),analytics:r(M),classRegistrations:r(T),mentorClasses:r(S),userMatchesAsFirstUser:r(f,{relationName:"first_user"}),userMatchesAsSecondUser:r(f,{relationName:"second_user"}),messages:r(I,{relationName:"sender"})})),Xi=drizzleOrm.relations($,({one:e})=>({user:e(t,{fields:[$.userId],references:[t.id]})})),Ui=drizzleOrm.relations(J,({one:e})=>({user:e(t,{fields:[J.identifier],references:[t.email]})})),Fi=drizzleOrm.relations(_,({one:e,many:r})=>({creator:e(t,{fields:[_.creatorId],references:[t.id]}),submissions:r(g)})),Pi=drizzleOrm.relations(c,({many:e})=>({userAttendance:e(b),profilKATAttendances:e(L)})),Ki=drizzleOrm.relations(b,({one:e})=>({attendance:e(c,{fields:[b.scheduleId],references:[c.id]}),user:e(t,{fields:[b.userId],references:[t.id]})})),$i=drizzleOrm.relations(L,({one:e})=>({profilKAT:e(n,{fields:[L.profilKATId],references:[n.id]}),attendance:e(c,{fields:[L.attendanceId],references:[c.id]})})),Ji=drizzleOrm.relations(u,({many:e,one:r})=>({userProgress:e(O),questions:e(h),profil:r(n,{fields:[u.profilId],references:[n.id]})})),Gi=drizzleOrm.relations(O,({one:e})=>({user:e(t,{fields:[O.userId],references:[t.id]}),stage:e(u,{fields:[O.stageId],references:[u.id]})})),Qi=drizzleOrm.relations(h,({one:e,many:r})=>({stage:e(u,{fields:[h.stageId],references:[u.id]}),answerOptions:r(F)})),Vi=drizzleOrm.relations(F,({one:e})=>({question:e(h,{fields:[F.questionId],references:[h.id]})})),Bi=drizzleOrm.relations(n,({many:e,one:r})=>({assignments:e(w),attendances:e(L),stage:r(u,{fields:[n.id],references:[u.profilId]})})),Yi=drizzleOrm.relations(w,({many:e,one:r})=>({submissions:e(g),profil:r(n,{fields:[w.profilKATId],references:[n.id]})})),Zi=drizzleOrm.relations(g,({one:e})=>({assignment:e(w,{fields:[g.assignmentId],references:[w.id]}),user:e(t,{fields:[g.userId],references:[t.id]}),media:e(_,{fields:[g.submissionMediaId],references:[_.id]})})),ji=drizzleOrm.relations(S,({one:e,many:r})=>({registrations:r(T)})),er=drizzleOrm.relations(T,({one:e})=>({user:e(t,{fields:[T.userId],references:[t.id]}),class:e(S,{fields:[T.classId],references:[S.id]})})),tr=drizzleOrm.relations(M,({one:e})=>({user:e(t,{fields:[M.userId],references:[t.id]})})),ir=drizzleOrm.relations(f,({many:e,one:r})=>({firstUser:r(t,{fields:[f.firstUserId],references:[t.id],relationName:"first_user"}),secondUser:r(t,{fields:[f.secondUserId],references:[t.id],relationName:"second_user"}),messages:e(I)})),rr=drizzleOrm.relations(I,({one:e})=>({senderId:e(t,{fields:[I.senderId],references:[t.id],relationName:"sender"}),userMatch:e(f,{fields:[I.userMatchId],references:[f.id]})}));exports.accounts=E;exports.accountsRelation=Mi;exports.accountsRoleEnum=ce;exports.activities=wi;exports.assignmentsProfil=w;exports.assignmentsProfilRelation=Yi;exports.attendanceStatusEnum=ye;exports.attendanceTypeEnum=Me;exports.attendances=c;exports.attendancesRelation=Pi;exports.classEnum=He;exports.classRegistrations=T;exports.classRegistrationsRelation=er;exports.classes=S;exports.classesRelation=ji;exports.createUserRankingViewIndexes=Bt;exports.emailVerificationOtps=$;exports.emailVerificationOtpsRelations=Xi;exports.endpointAnalytics=M;exports.endpointAnalyticsRelation=tr;exports.media=_;exports.mediaBucketEnum=Ne;exports.mediaRelation=Fi;exports.messages=I;exports.messagesRelations=rr;exports.profilKATAttendances=L;exports.profilKATAttendancesRelation=$i;exports.profilKATs=n;exports.profilKATsRelation=Bi;exports.questionAnswerOptions=F;exports.questionAnswerOptionsRelation=Vi;exports.questionTypeEnum=ke;exports.questions=h;exports.questionsRelation=Qi;exports.refreshUserRankingView=Vt;exports.stageStatusEnum=be;exports.stages=u;exports.stagesRelation=Ji;exports.submissionsProfil=g;exports.submissionsProfilRelation=Zi;exports.userAttendance=b;exports.userAttendanceRelation=Ki;exports.userMatches=f;exports.userMatchesRelations=ir;exports.userRankingView=Qt;exports.userStageProgress=O;exports.userStageProgressRelation=Gi;exports.users=t;exports.usersRelation=Ri;exports.verificationToken=J;exports.verificationTokenRelations=Ui;