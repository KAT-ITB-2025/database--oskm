'use strict';var pgCore=require('drizzle-orm/pg-core'),cuid2=require('@paralleldrive/cuid2'),drizzleOrm=require('drizzle-orm');var a=cuid2.init({length:8}),r=()=>new Date;var le=pgCore.pgEnum("accounts_role_enum",["admin","mamet","mentor","user","guest"]),c=pgCore.pgTable("accounts",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),nim:pgCore.text("nim").notNull().unique(),password:pgCore.text("password").notNull(),role:le("role").default("user").notNull(),lastLoggedIn:pgCore.timestamp("last_logged_in"),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var fe=pgCore.pgEnum("media_bucket_enum",["profile","content","documents","uploads"]),_=pgCore.pgTable("media",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),creatorId:pgCore.text("creator_id").notNull().references(()=>t.id),name:pgCore.text("name").notNull(),bucket:fe("bucket").notNull(),type:pgCore.text("type").notNull(),url:pgCore.text("url").notNull(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r),createdAt:pgCore.timestamp("created_at").defaultNow()});var t=pgCore.pgTable("users",{id:pgCore.text("id").references(()=>c.id).primaryKey(),nim:pgCore.text("nim").notNull().unique(),email:pgCore.text("email").unique(),emailVerified:pgCore.boolean("email_verified").notNull().default(false),fullName:pgCore.text("full_name"),fakultas:pgCore.text("fakultas"),keluarga:pgCore.text("keluarga"),bata:pgCore.text("bata"),rumpun:pgCore.text("rumpun"),fotoMediaId:pgCore.text("foto_media_id").references(()=>_.id),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),U=pgCore.pgTable("email_verification_otps",{userId:pgCore.text("user_id").notNull().references(()=>t.id,{onDelete:"cascade"}),otp:pgCore.text("otp").notNull(),expiresAt:pgCore.timestamp("expires_at",{mode:"date",withTimezone:true}).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow()});var y=pgCore.pgTable("endpoint_analytics",{id:pgCore.serial("id").primaryKey(),userId:pgCore.text("user_id").references(()=>t.id,{onDelete:"set null"}),endpoint:pgCore.text("endpoint").notNull(),method:pgCore.text("method").notNull(),statusCode:pgCore.integer("status_code").notNull(),responseTimeMs:pgCore.integer("response_time_ms"),urlQuery:pgCore.text("url_query"),requestBody:pgCore.text("request_body"),errorMessage:pgCore.text("error_message"),createdAt:pgCore.timestamp("created_at").defaultNow()});var F=pgCore.pgTable("verification_token",{identifier:pgCore.text("identifier").notNull().references(()=>t.email),token:pgCore.text("token"),expiredAt:pgCore.timestamp("expired_at",{mode:"date",withTimezone:true})},e=>[pgCore.primaryKey({columns:[e.identifier,e.token]})]);var Ce=pgCore.pgEnum("class_enum",["sesi_1","sesi_2"]),E=pgCore.pgTable("classes",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),className:pgCore.text("class_name").notNull(),room:pgCore.text("room").notNull(),totalQuota:pgCore.integer("total_quota").notNull(),mentorId:pgCore.text("mentor_id").references(()=>t.id),classType:Ce("class_type").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),S=pgCore.pgTable("class_registrations",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),userId:pgCore.text("user_id").notNull().references(()=>t.id),classId:pgCore.text("class_id").notNull().references(()=>E.id),registeredAt:pgCore.timestamp("registered_at").defaultNow(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var n=pgCore.pgTable("profil_kats",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),profilNumber:pgCore.integer("profil_number").notNull().unique(),quizWeight:pgCore.real("quiz_weight").notNull().default(0),assignmentWeight:pgCore.real("assignment_weight").notNull().default(0),attendanceWeight:pgCore.real("attendance_weight").notNull().default(0),title:pgCore.text("title").notNull(),description:pgCore.text("description")}),N=pgCore.pgTable("assignments_profil",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),profilKATId:pgCore.text("profil_kat_id").notNull().references(()=>n.id),title:pgCore.text("title").notNull(),assignmentMediaId:pgCore.text("assignment_media_id").notNull().references(()=>_.id),description:pgCore.text("description"),dueDate:pgCore.timestamp("due_date",{mode:"date",withTimezone:true}).notNull(),isOpen:pgCore.boolean("is_open").default(false).notNull(),startDate:pgCore.timestamp("start_date",{mode:"date",withTimezone:true}).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),f=pgCore.pgTable("submissions_profil",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),assignmentId:pgCore.text("assignment_id").notNull().references(()=>N.id),userId:pgCore.text("user_id").notNull().references(()=>t.id),submissionMediaId:pgCore.text("submission_media_id").notNull().references(()=>_.id),score:pgCore.integer("score").default(0).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var Te=pgCore.pgEnum("status",["completed","not_completed"]),u=pgCore.pgTable("stages",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),profilId:pgCore.text("profil_id").notNull().references(()=>n.id),stageNumber:pgCore.integer("stage_number").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),T=pgCore.pgTable("user_stage_progress",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),userId:pgCore.text("user_id").notNull().references(()=>t.id),stageId:pgCore.text("stage_id").notNull().references(()=>u.id),status:Te("status").notNull(),completedAt:pgCore.timestamp("completed_at"),quizScore:pgCore.integer("quiz_score"),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var He=pgCore.pgEnum("question_type_enum",["multiple_choice","short_answer"]),w=pgCore.pgTable("questions",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),stageId:pgCore.text("stage_id").notNull().references(()=>u.id),questionText:pgCore.text("question_text").notNull(),questionType:He("question_type").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),M=pgCore.pgTable("question_answer_options",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),questionId:pgCore.text("question_id").notNull().references(()=>w.id),answerText:pgCore.text("answer_text").notNull(),isCorrect:pgCore.boolean("is_correct").default(false).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var Xt=pgCore.pgMaterializedView("user_ranking_view",{userId:pgCore.text("user_id").primaryKey(),nim:pgCore.text("nim"),fullName:pgCore.text("full_name"),fakultas:pgCore.text("fakultas"),keluarga:pgCore.text("keluarga"),bata:pgCore.text("bata"),rumpun:pgCore.text("rumpun"),fotoMediaId:pgCore.text("foto_media_id"),profil1QuizWeight:pgCore.real("profil1_quiz_weight").notNull().default(0),profil1QuizScore:pgCore.integer("profil1_quiz_score").notNull().default(0),profil1AssignmentWeight:pgCore.real("profil1_assignment_weight").notNull().default(0),profil1AvgAssignmentScore:pgCore.real("profil1_avg_assignment_score").notNull().default(0),profil1AttendanceWeight:pgCore.real("profil1_attendance_weight").notNull().default(0),profil1AvgAttendanceScore:pgCore.real("profil1_avg_attendance_score").notNull().default(0),profil1TotalScore:pgCore.real("profil1_total_score").notNull().default(0),profil2QuizWeight:pgCore.real("profil2_quiz_weight").notNull().default(0),profil2QuizScore:pgCore.integer("profil2_quiz_score").notNull().default(0),profil2AssignmentWeight:pgCore.real("profil2_assignment_weight").notNull().default(0),profil2AvgAssignmentScore:pgCore.real("profil2_avg_assignment_score").notNull().default(0),profil2AttendanceWeight:pgCore.real("profil2_attendance_weight").notNull().default(0),profil2AvgAttendanceScore:pgCore.real("profil2_avg_attendance_score").notNull().default(0),profil2TotalScore:pgCore.real("profil2_total_score").notNull().default(0),profil3QuizWeight:pgCore.real("profil3_quiz_weight").notNull().default(0),profil3QuizScore:pgCore.integer("profil3_quiz_score").notNull().default(0),profil3AssignmentWeight:pgCore.real("profil3_assignment_weight").notNull().default(0),profil3AvgAssignmentScore:pgCore.real("profil3_avg_assignment_score").notNull().default(0),profil3AttendanceWeight:pgCore.real("profil3_attendance_weight").notNull().default(0),profil3AvgAttendanceScore:pgCore.real("profil3_avg_attendance_score").notNull().default(0),profil3TotalScore:pgCore.real("profil3_total_score").notNull().default(0),profil4QuizWeight:pgCore.real("profil4_quiz_weight").notNull().default(0),profil4QuizScore:pgCore.integer("profil4_quiz_score").notNull().default(0),profil4AssignmentWeight:pgCore.real("profil4_assignment_weight").notNull().default(0),profil4AvgAssignmentScore:pgCore.real("profil4_avg_assignment_score").notNull().default(0),profil4AttendanceWeight:pgCore.real("profil4_attendance_weight").notNull().default(0),profil4AvgAttendanceScore:pgCore.real("profil4_avg_attendance_score").notNull().default(0),profil4TotalScore:pgCore.real("profil4_total_score").notNull().default(0),profil5QuizWeight:pgCore.real("profil5_quiz_weight").notNull().default(0),profil5QuizScore:pgCore.integer("profil5_quiz_score").notNull().default(0),profil5AssignmentWeight:pgCore.real("profil5_assignment_weight").notNull().default(0),profil5AvgAssignmentScore:pgCore.real("profil5_avg_assignment_score").notNull().default(0),profil5AttendanceWeight:pgCore.real("profil5_attendance_weight").notNull().default(0),profil5AvgAttendanceScore:pgCore.real("profil5_avg_attendance_score").notNull().default(0),profil5TotalScore:pgCore.real("profil5_total_score").notNull().default(0),totalScore:pgCore.real("total_score").notNull().default(0),tiebreakerScore:pgCore.real("tiebreaker_score").notNull().default(0),lastActivityAt:pgCore.timestamp("last_activity_at"),attendanceTotal:pgCore.integer("attendance_total").notNull().default(0),ranking:pgCore.integer("ranking").notNull()}).as(drizzleOrm.sql`
  WITH user_assignment_scores AS (
    SELECT 
      u.id as user_id,
      pk.profil_number,
      COALESCE(AVG(sp.score), 0) as avg_assignment_score,
      MAX(sp.created_at) as last_assignment_at,
      -- Tiebreaker: sum of milliseconds from due date to submission (earlier = higher score)
      COALESCE(SUM(EXTRACT(EPOCH FROM (ap.due_date - sp.created_at)) * 1000), 0) as assignment_timing_score
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
      COALESCE(pk.quiz_weight, 0.0) as quiz_weight,
      COALESCE(pk.assignment_weight, 0.0) as assignment_weight,
      COALESCE(pk.attendance_weight, 0.0) as attendance_weight,
      COALESCE(usp.quiz_score, 0) as quiz_score,
      usp.completed_at as quiz_completed_at,
      -- Tiebreaker: use quiz completion timing if available
      CASE WHEN usp.completed_at IS NOT NULL THEN
        EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - usp.completed_at)) * 1000
      ELSE 0 END as quiz_timing_score
    FROM users u
    CROSS JOIN profil_kats pk 
    LEFT JOIN stages s ON s.profil_id = pk.id
    LEFT JOIN user_stage_progress usp ON usp.user_id = u.id AND usp.stage_id = s.id AND usp.status = 'completed'
    WHERE pk.profil_number IN (1, 2, 3, 4, 5)
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
    CROSS JOIN profil_kats pk
    LEFT JOIN profil_kat_attendance pka ON pka.profil_kat_id = pk.id
    LEFT JOIN attendances a ON a.id = pka.attendance_id
    LEFT JOIN user_attendance ua ON ua.schedule_id = a.id AND ua.user_id = u.id
    WHERE pk.profil_number IN (1, 2, 3, 4, 5)
      AND a.start_time <= NOW()
    GROUP BY u.id, pk.profil_number
  ),
  user_attendance_total AS (
    SELECT
      ua.user_id,
      COUNT(*) AS attendance_total
    FROM user_attendance ua
    INNER JOIN attendances a ON a.id = ua.schedule_id
    WHERE ua.status = 'hadir'
      AND a.start_time <= NOW()
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
      
      -- Profil 2 scores  
      COALESCE(MAX(CASE WHEN uqs.profil_number = 2 THEN uqs.quiz_weight END), 0.0) as profil2_quiz_weight,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 2 THEN uqs.quiz_score END), 0) as profil2_quiz_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 2 THEN uqs.assignment_weight END), 0.0) as profil2_assignment_weight,
      COALESCE(MAX(CASE WHEN uas.profil_number = 2 THEN uas.avg_assignment_score END), 0.0) as profil2_avg_assignment_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 2 THEN uqs.attendance_weight END), 0.0) as profil2_attendance_weight,
      COALESCE(MAX(CASE WHEN uats.profil_number = 2 THEN uats.avg_attendance_score END), 0.0) as profil2_avg_attendance_score,
      
      -- Profil 3 scores
      COALESCE(MAX(CASE WHEN uqs.profil_number = 3 THEN uqs.quiz_weight END), 0.0) as profil3_quiz_weight,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 3 THEN uqs.quiz_score END), 0) as profil3_quiz_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 3 THEN uqs.assignment_weight END), 0.0) as profil3_assignment_weight,
      COALESCE(MAX(CASE WHEN uas.profil_number = 3 THEN uas.avg_assignment_score END), 0.0) as profil3_avg_assignment_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 3 THEN uqs.attendance_weight END), 0.0) as profil3_attendance_weight,
      COALESCE(MAX(CASE WHEN uats.profil_number = 3 THEN uats.avg_attendance_score END), 0.0) as profil3_avg_attendance_score,
      
      -- Profil 4 scores
      COALESCE(MAX(CASE WHEN uqs.profil_number = 4 THEN uqs.quiz_weight END), 0.0) as profil4_quiz_weight,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 4 THEN uqs.quiz_score END), 0) as profil4_quiz_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 4 THEN uqs.assignment_weight END), 0.0) as profil4_assignment_weight,
      COALESCE(MAX(CASE WHEN uas.profil_number = 4 THEN uas.avg_assignment_score END), 0.0) as profil4_avg_assignment_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 4 THEN uqs.attendance_weight END), 0.0) as profil4_attendance_weight,
      COALESCE(MAX(CASE WHEN uats.profil_number = 4 THEN uats.avg_attendance_score END), 0.0) as profil4_avg_attendance_score,
      
      -- Profil 5 scores
      COALESCE(MAX(CASE WHEN uqs.profil_number = 5 THEN uqs.quiz_weight END), 0.0) as profil5_quiz_weight,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 5 THEN uqs.quiz_score END), 0) as profil5_quiz_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 5 THEN uqs.assignment_weight END), 0.0) as profil5_assignment_weight,
      COALESCE(MAX(CASE WHEN uas.profil_number = 5 THEN uas.avg_assignment_score END), 0.0) as profil5_avg_assignment_score,
      COALESCE(MAX(CASE WHEN uqs.profil_number = 5 THEN uqs.attendance_weight END), 0.0) as profil5_attendance_weight,
      COALESCE(MAX(CASE WHEN uats.profil_number = 5 THEN uats.avg_attendance_score END), 0.0) as profil5_avg_attendance_score,

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
    LEFT JOIN user_quiz_scores uqs ON uqs.user_id = u.id
    LEFT JOIN user_assignment_scores uas ON uas.user_id = u.id AND uas.profil_number = uqs.profil_number
    LEFT JOIN user_attendance_scores uats ON uats.user_id = u.id AND uats.profil_number = uqs.profil_number
    LEFT JOIN user_attendance_total uat ON uat.user_id = u.id
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
    ROUND((CASE 
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
    END), 2) as total_score,
    
    -- Tiebreaker score: total timing across all profils (higher = completed tasks earlier)
    ROUND((profil1_timing_score + profil2_timing_score + profil3_timing_score + profil4_timing_score + profil5_timing_score) / 1000.0, 3) as tiebreaker_score,
    
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
`);async function Ut(e){await e.execute(drizzleOrm.sql`REFRESH MATERIALIZED VIEW user_ranking_view`);}var Ft=drizzleOrm.sql`
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
`;var Le=pgCore.pgEnum("attendance_status",["hadir","tidak_hadir"]),ke=pgCore.pgEnum("attendance_type",["opening","closing"]),g=pgCore.pgTable("attendances",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),attendanceType:ke("attendance_type").notNull(),dayNumber:pgCore.integer("day_number").notNull(),startTime:pgCore.timestamp("start_time").notNull(),durationMinutes:pgCore.integer("duration_minutes").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),H=pgCore.pgTable("profil_kat_attendance",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),profilKATId:pgCore.text("profil_kat_id").notNull().references(()=>n.id),attendanceId:pgCore.text("attendance_id").notNull().references(()=>g.id),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)}),v=pgCore.pgTable("user_attendance",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),scheduleId:pgCore.text("schedule_id").notNull().references(()=>g.id),userId:pgCore.text("user_id").notNull().references(()=>t.id),status:Le("status").default("tidak_hadir").notNull(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var pi=pgCore.pgTable("activities",{id:pgCore.text("id").primaryKey().$defaultFn(()=>a()),day:pgCore.integer("day").notNull(),title:pgCore.text("title").notNull(),description:pgCore.text("description"),startTime:pgCore.time("start_time").notNull(),endTime:pgCore.time("end_time").notNull(),location:pgCore.text("location"),geolocation:pgCore.text("geolocation"),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(r)});var Si=drizzleOrm.relations(c,({one:e})=>({user:e(t,{fields:[c.id],references:[t.id]})})),qi=drizzleOrm.relations(t,({one:e,many:o})=>({account:e(c,{fields:[t.id],references:[c.id]}),fotoMedia:e(_,{fields:[t.fotoMediaId],references:[_.id]}),stageProgress:o(T),attendance:o(v),submissions:o(f),createdMedia:o(_),analytics:o(y),classRegistrations:o(S),mentorClasses:o(E)})),Ti=drizzleOrm.relations(U,({one:e})=>({user:e(t,{fields:[U.userId],references:[t.id]})})),zi=drizzleOrm.relations(F,({one:e})=>({user:e(t,{fields:[F.identifier],references:[t.email]})})),Oi=drizzleOrm.relations(_,({one:e,many:o})=>({creator:e(t,{fields:[_.creatorId],references:[t.id]}),submissions:o(f)})),Hi=drizzleOrm.relations(g,({many:e})=>({userAttendance:e(v),profilKATAttendances:e(H)})),vi=drizzleOrm.relations(v,({one:e})=>({attendance:e(g,{fields:[v.scheduleId],references:[g.id]}),user:e(t,{fields:[v.userId],references:[t.id]})})),bi=drizzleOrm.relations(H,({one:e})=>({profilKAT:e(n,{fields:[H.profilKATId],references:[n.id]}),attendance:e(g,{fields:[H.attendanceId],references:[g.id]})})),Li=drizzleOrm.relations(u,({many:e,one:o})=>({userProgress:e(T),questions:e(w),profil:o(n,{fields:[u.profilId],references:[n.id]})})),ki=drizzleOrm.relations(T,({one:e})=>({user:e(t,{fields:[T.userId],references:[t.id]}),stage:e(u,{fields:[T.stageId],references:[u.id]})})),Ii=drizzleOrm.relations(w,({one:e,many:o})=>({stage:e(u,{fields:[w.stageId],references:[u.id]}),answerOptions:o(M)})),xi=drizzleOrm.relations(M,({one:e})=>({question:e(w,{fields:[M.questionId],references:[w.id]})})),yi=drizzleOrm.relations(n,({many:e,one:o})=>({assignments:e(N),attendances:e(H),stage:o(u,{fields:[n.id],references:[u.profilId]})})),Di=drizzleOrm.relations(N,({many:e,one:o})=>({submissions:e(f),profil:o(n,{fields:[N.profilKATId],references:[n.id]})})),Wi=drizzleOrm.relations(f,({one:e})=>({assignment:e(N,{fields:[f.assignmentId],references:[N.id]}),user:e(t,{fields:[f.userId],references:[t.id]}),media:e(_,{fields:[f.submissionMediaId],references:[_.id]})})),Mi=drizzleOrm.relations(E,({one:e,many:o})=>({mentor:e(t,{fields:[E.mentorId],references:[t.id]}),registrations:o(S)})),Ri=drizzleOrm.relations(S,({one:e})=>({user:e(t,{fields:[S.userId],references:[t.id]}),class:e(E,{fields:[S.classId],references:[E.id]})})),Xi=drizzleOrm.relations(y,({one:e})=>({user:e(t,{fields:[y.userId],references:[t.id]})}));exports.accounts=c;exports.accountsRelation=Si;exports.accountsRoleEnum=le;exports.activities=pi;exports.assignmentsProfil=N;exports.assignmentsProfilRelation=Di;exports.attendanceStatusEnum=Le;exports.attendanceTypeEnum=ke;exports.attendances=g;exports.attendancesRelation=Hi;exports.classEnum=Ce;exports.classRegistrations=S;exports.classRegistrationsRelation=Ri;exports.classes=E;exports.classesRelation=Mi;exports.createUserRankingViewIndexes=Ft;exports.emailVerificationOtps=U;exports.emailVerificationOtpsRelations=Ti;exports.endpointAnalytics=y;exports.endpointAnalyticsRelation=Xi;exports.media=_;exports.mediaBucketEnum=fe;exports.mediaRelation=Oi;exports.profilKATAttendances=H;exports.profilKATAttendancesRelation=bi;exports.profilKATs=n;exports.profilKATsRelation=yi;exports.questionAnswerOptions=M;exports.questionAnswerOptionsRelation=xi;exports.questionTypeEnum=He;exports.questions=w;exports.questionsRelation=Ii;exports.refreshUserRankingView=Ut;exports.stageStatusEnum=Te;exports.stages=u;exports.stagesRelation=Li;exports.submissionsProfil=f;exports.submissionsProfilRelation=Wi;exports.userAttendance=v;exports.userAttendanceRelation=vi;exports.userRankingView=Xt;exports.userStageProgress=T;exports.userStageProgressRelation=ki;exports.users=t;exports.usersRelation=qi;exports.verificationToken=F;exports.verificationTokenRelations=zi;