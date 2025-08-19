import {pgEnum,pgTable,timestamp,text,integer,boolean,serial,primaryKey,real,pgMaterializedView,time,bigserial}from'drizzle-orm/pg-core';import {init,createId}from'@paralleldrive/cuid2';import {sql,relations}from'drizzle-orm';var s=init({length:8}),a=()=>new Date;var qe=pgEnum("accounts_role_enum",["admin","mamet","mentor","user","guest","hr"]),w=pgTable("accounts",{id:text("id").primaryKey().$defaultFn(()=>s()),nim:text("nim").notNull().unique(),password:text("password").notNull(),role:qe("role").default("user").notNull(),lastLoggedIn:timestamp("last_logged_in"),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)});var n=pgTable("media",{id:text("id").primaryKey().$defaultFn(()=>s()),creatorId:text("creator_id").references(()=>t.id),name:text("name").notNull(),bucket:text("bucket").notNull(),type:text("type").notNull(),url:text("url").notNull(),updatedAt:timestamp("updated_at").$onUpdate(a),createdAt:timestamp("created_at").defaultNow()});var t=pgTable("users",{id:text("id").references(()=>w.id).primaryKey(),nim:text("nim").notNull().unique(),email:text("email").unique(),emailVerified:boolean("email_verified").notNull().default(false),fullName:text("full_name").notNull(),fakultas:text("fakultas").notNull(),keluarga:text("keluarga").notNull(),bata:integer("bata").notNull(),rumpun:text("rumpun"),fotoMediaId:text("foto_media_id").references(()=>n.id),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)}),B=pgTable("email_verification_otps",{userId:text("user_id").notNull().references(()=>t.id,{onDelete:"cascade"}),otp:text("otp").notNull(),expiresAt:timestamp("expires_at",{mode:"date",withTimezone:true}).notNull(),createdAt:timestamp("created_at").defaultNow()});var F=pgTable("endpoint_analytics",{id:serial("id").primaryKey(),userId:text("user_id").references(()=>t.id,{onDelete:"set null"}),endpoint:text("endpoint").notNull(),method:text("method").notNull(),statusCode:integer("status_code").notNull(),responseTimeMs:integer("response_time_ms"),urlQuery:text("url_query"),requestBody:text("request_body"),errorMessage:text("error_message"),createdAt:timestamp("created_at").defaultNow()});var Y=pgTable("verification_token",{identifier:text("identifier").notNull().references(()=>t.email),token:text("token").notNull(),expiredAt:timestamp("expired_at",{mode:"date",withTimezone:true})},e=>[primaryKey({columns:[e.identifier,e.token]})]);var De=pgEnum("class_enum",["sesi_1","sesi_2"]),M=pgTable("classes",{id:text("id").primaryKey().$defaultFn(()=>s()),className:text("class_name").notNull(),room:text("room").notNull(),totalQuota:integer("total_quota").notNull(),mentorName:text("mentor_name").notNull(),description:text("description").notNull(),classType:De("class_type").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)}),z=pgTable("class_registrations",{id:text("id").primaryKey().$defaultFn(()=>s()),userId:text("user_id").notNull().references(()=>t.id),classId:text("class_id").notNull().references(()=>M.id),registeredAt:timestamp("registered_at").defaultNow(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)});var _=pgTable("profil_kats",{id:text("id").primaryKey().$defaultFn(()=>s()),profilNumber:integer("profil_number").notNull().unique(),stageWeight:real("stage_weight").notNull().default(0),quizWeight:real("quiz_weight").notNull().default(0),assignmentWeight:real("assignment_weight").notNull().default(0),attendanceWeight:real("attendance_weight").notNull().default(0),title:text("title").notNull(),description:text("description")}),h=pgTable("assignments_profil",{id:text("id").primaryKey().$defaultFn(()=>s()),profilKATId:text("profil_kat_id").notNull().references(()=>_.id),title:text("title").notNull(),assignmentMediaId:text("assignment_media_id").references(()=>n.id),description:text("description"),dueDate:timestamp("due_date",{mode:"date",withTimezone:true}).notNull(),isOpen:boolean("is_open").default(false).notNull(),startDate:timestamp("start_date",{mode:"date",withTimezone:true}).notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)}),d=pgTable("submissions_profil",{id:text("id").primaryKey().$defaultFn(()=>s()),assignmentId:text("assignment_id").notNull().references(()=>h.id),userId:text("user_id").notNull().references(()=>t.id),submissionMediaId:text("submission_media_id").notNull().references(()=>n.id),score:integer("score").default(0).notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)});var Re=pgEnum("status",["completed","not_completed"]),u=pgTable("stages",{id:text("id").primaryKey().$defaultFn(()=>s()),profilId:text("profil_id").notNull().references(()=>_.id),stageNumber:integer("stage_number").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)}),b=pgTable("user_stage_progress",{id:text("id").primaryKey().$defaultFn(()=>s()),userId:text("user_id").notNull().references(()=>t.id),stageId:text("stage_id").notNull().references(()=>u.id),status:Re("status").notNull(),completedAt:timestamp("completed_at"),quizScore:integer("quiz_score"),updatedAt:timestamp("updated_at").$onUpdate(a)});var Fe=pgEnum("question_type_enum",["multiple_choice","short_answer"]),A=pgTable("questions",{id:text("id").primaryKey().$defaultFn(()=>s()),stageId:text("stage_id").notNull().references(()=>u.id),questionText:text("question_text").notNull(),questionType:Fe("question_type").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)}),G=pgTable("question_answer_options",{id:text("id").primaryKey().$defaultFn(()=>s()),questionId:text("question_id").notNull().references(()=>A.id),answerText:text("answer_text").notNull(),isCorrect:boolean("is_correct").default(false).notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)});var ni=pgMaterializedView("user_ranking_view",{userId:text("user_id").primaryKey(),nim:text("nim"),fullName:text("full_name"),fakultas:text("fakultas"),keluarga:text("keluarga"),bata:text("bata"),rumpun:text("rumpun"),fotoMediaId:text("foto_media_id"),profil1QuizWeight:real("profil1_quiz_weight").notNull().default(0),profil1QuizScore:integer("profil1_quiz_score").notNull().default(0),profil1AssignmentWeight:real("profil1_assignment_weight").notNull().default(0),profil1AvgAssignmentScore:real("profil1_avg_assignment_score").notNull().default(0),profil1AttendanceWeight:real("profil1_attendance_weight").notNull().default(0),profil1AvgAttendanceScore:real("profil1_avg_attendance_score").notNull().default(0),profil1TotalScore:real("profil1_total_score").notNull().default(0),profil2QuizWeight:real("profil2_quiz_weight").notNull().default(0),profil2QuizScore:integer("profil2_quiz_score").notNull().default(0),profil2AssignmentWeight:real("profil2_assignment_weight").notNull().default(0),profil2AvgAssignmentScore:real("profil2_avg_assignment_score").notNull().default(0),profil2AttendanceWeight:real("profil2_attendance_weight").notNull().default(0),profil2AvgAttendanceScore:real("profil2_avg_attendance_score").notNull().default(0),profil2TotalScore:real("profil2_total_score").notNull().default(0),profil3QuizWeight:real("profil3_quiz_weight").notNull().default(0),profil3QuizScore:integer("profil3_quiz_score").notNull().default(0),profil3AssignmentWeight:real("profil3_assignment_weight").notNull().default(0),profil3AvgAssignmentScore:real("profil3_avg_assignment_score").notNull().default(0),profil3AttendanceWeight:real("profil3_attendance_weight").notNull().default(0),profil3AvgAttendanceScore:real("profil3_avg_attendance_score").notNull().default(0),profil3TotalScore:real("profil3_total_score").notNull().default(0),profil4QuizWeight:real("profil4_quiz_weight").notNull().default(0),profil4QuizScore:integer("profil4_quiz_score").notNull().default(0),profil4AssignmentWeight:real("profil4_assignment_weight").notNull().default(0),profil4AvgAssignmentScore:real("profil4_avg_assignment_score").notNull().default(0),profil4AttendanceWeight:real("profil4_attendance_weight").notNull().default(0),profil4AvgAttendanceScore:real("profil4_avg_attendance_score").notNull().default(0),profil4TotalScore:real("profil4_total_score").notNull().default(0),profil5QuizWeight:real("profil5_quiz_weight").notNull().default(0),profil5QuizScore:integer("profil5_quiz_score").notNull().default(0),profil5AssignmentWeight:real("profil5_assignment_weight").notNull().default(0),profil5AvgAssignmentScore:real("profil5_avg_assignment_score").notNull().default(0),profil5AttendanceWeight:real("profil5_attendance_weight").notNull().default(0),profil5AvgAttendanceScore:real("profil5_avg_attendance_score").notNull().default(0),profil5TotalScore:real("profil5_total_score").notNull().default(0),itbGuesserMaxScore:real("itb_guesser_max_score").notNull().default(0),memoryGameScore:integer("memory_game_score").notNull().default(0),totalScore:real("total_score").notNull().default(0),totalWeightedScore:real("total_weighted_score").notNull().default(0),tiebreakerScore:real("tiebreaker_score").notNull().default(0),lastActivityAt:timestamp("last_activity_at"),attendanceTotal:integer("attendance_total").notNull().default(0),ranking:integer("ranking").notNull()}).as(sql`
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
`);async function _i(e){await e.execute(sql`REFRESH MATERIALIZED VIEW CONCURRENTLY user_ranking_view`);}var li=sql`
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
`;var $e=pgEnum("attendance_status",["hadir","tidak_hadir"]),Ge=pgEnum("attendance_type",["opening","closing"]),E=pgTable("attendances",{id:text("id").primaryKey().$defaultFn(()=>s()),attendanceType:Ge("attendance_type").notNull(),dayNumber:integer("day_number").notNull(),startTime:timestamp("start_time",{mode:"date",withTimezone:true}).notNull(),durationMinutes:integer("duration_minutes").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)}),L=pgTable("profil_kat_attendance",{id:text("id").primaryKey().$defaultFn(()=>s()),profilKATId:text("profil_kat_id").notNull().references(()=>_.id),attendanceId:text("attendance_id").notNull().references(()=>E.id),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)}),I=pgTable("user_attendance",{id:text("id").primaryKey().$defaultFn(()=>s()),scheduleId:text("schedule_id").notNull().references(()=>E.id),userId:text("user_id").notNull().references(()=>t.id),status:$e("status").default("tidak_hadir").notNull(),updatedAt:timestamp("updated_at").$onUpdate(a)});var Ve=pgEnum("itb_guesser_tempat",["Ganesha","Jatinangor","Cirebon"]),y=pgTable("itb_guesser_options",{id:text("id").primaryKey().$defaultFn(()=>s()),tempat:Ve("tempat").notNull(),publicUrl:text("public_url").notNull(),lat:real("lat").notNull(),lng:real("lng").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)}),k=pgTable("itb_guesser_submissions",{id:text("id").primaryKey().$defaultFn(()=>s()),userId:text("user_id").notNull().references(()=>t.id),optionId:text("option_id").notNull().references(()=>y.id),answerLat:real("answer_lat").notNull(),answerLng:real("answer_lng").notNull(),score:real("score").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)}),Ti=pgTable("memory_game_scores",{id:text("id").primaryKey().$defaultFn(()=>s()),userId:text("user_id").notNull().unique().references(()=>t.id),score:integer("score").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)});var ie=pgTable("handbook",{mediaId:text("media_id").primaryKey().references(()=>n.id),title:text("title")});var Fi=pgTable("activities",{id:text("id").primaryKey().$defaultFn(()=>s()),day:integer("day").notNull(),title:text("title").notNull(),description:text("description"),startTime:time("start_time").notNull(),endTime:time("end_time").notNull(),location:text("location"),lat:real("lat"),lng:real("lng"),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(a)});var f=pgTable("user_matches",{id:text("id").primaryKey().$defaultFn(createId),topic:text("topic").notNull(),isActive:boolean("is_active").notNull().default(true),isAnonymous:boolean("is_anonymous").notNull().default(true),isRevealed:boolean("is_revealed").notNull().default(false),firstUserId:text("first_user_id").notNull().references(()=>t.id,{onDelete:"cascade"}),secondUserId:text("second_user_id").notNull().references(()=>t.id,{onDelete:"cascade"}),lastMessage:text("last_message"),createdAt:timestamp("created_at").notNull().defaultNow()}),D=pgTable("messages",{id:bigserial("id",{mode:"number"}).primaryKey(),userMatchId:text("user_match_id").notNull().references(()=>f.id,{onDelete:"cascade"}),senderId:text("sender_id").notNull().references(()=>t.id,{onDelete:"cascade"}),content:text("content").notNull(),createdAt:timestamp("created_at",{mode:"date",withTimezone:true}).notNull().defaultNow()});var nr=relations(w,({one:e})=>({user:e(t,{fields:[w.id],references:[t.id]})})),_r=relations(t,({one:e,many:r})=>({account:e(w,{fields:[t.id],references:[w.id]}),fotoMedia:e(n,{fields:[t.fotoMediaId],references:[n.id]}),stageProgress:r(b),attendance:r(I),submissions:r(d),createdMedia:r(n),analytics:r(F),classRegistrations:r(z),userMatchesAsFirstUser:r(f,{relationName:"first_user"}),userMatchesAsSecondUser:r(f,{relationName:"second_user"}),messages:r(D,{relationName:"sender"}),itbGuesserSubmissions:r(k)})),lr=relations(B,({one:e})=>({user:e(t,{fields:[B.userId],references:[t.id]})})),ur=relations(Y,({one:e})=>({user:e(t,{fields:[Y.identifier],references:[t.email]})})),pr=relations(n,({one:e,many:r})=>({creator:e(t,{fields:[n.creatorId],references:[t.id]}),handbook:e(ie,{fields:[n.id],references:[ie.mediaId]}),submissions:r(d),itbGuesserOptions:r(y)})),fr=relations(E,({many:e})=>({userAttendance:e(I),profilKATAttendances:e(L)})),gr=relations(I,({one:e})=>({attendance:e(E,{fields:[I.scheduleId],references:[E.id]}),user:e(t,{fields:[I.userId],references:[t.id]})})),dr=relations(L,({one:e})=>({profilKAT:e(_,{fields:[L.profilKATId],references:[_.id]}),attendance:e(E,{fields:[L.attendanceId],references:[E.id]})})),cr=relations(u,({many:e,one:r})=>({userProgress:e(b),questions:e(A),profil:r(_,{fields:[u.profilId],references:[_.id]})})),mr=relations(b,({one:e})=>({user:e(t,{fields:[b.userId],references:[t.id]}),stage:e(u,{fields:[b.stageId],references:[u.id]})})),Er=relations(A,({one:e,many:r})=>({stage:e(u,{fields:[A.stageId],references:[u.id]}),answerOptions:r(G)})),Nr=relations(G,({one:e})=>({question:e(A,{fields:[G.questionId],references:[A.id]})})),wr=relations(_,({many:e,one:r})=>({assignments:e(h),attendances:e(L),stage:r(u,{fields:[_.id],references:[u.profilId]})})),hr=relations(h,({many:e,one:r})=>({submissions:e(d),profil:r(_,{fields:[h.profilKATId],references:[_.id]})})),Ar=relations(d,({one:e})=>({assignment:e(h,{fields:[d.assignmentId],references:[h.id]}),user:e(t,{fields:[d.userId],references:[t.id]}),media:e(n,{fields:[d.submissionMediaId],references:[n.id]})})),Cr=relations(M,({one:e,many:r})=>({registrations:r(z)})),Sr=relations(z,({one:e})=>({user:e(t,{fields:[z.userId],references:[t.id]}),class:e(M,{fields:[z.classId],references:[M.id]})})),qr=relations(F,({one:e})=>({user:e(t,{fields:[F.userId],references:[t.id]})})),Tr=relations(f,({many:e,one:r})=>({firstUser:r(t,{fields:[f.firstUserId],references:[t.id],relationName:"first_user"}),secondUser:r(t,{fields:[f.secondUserId],references:[t.id],relationName:"second_user"}),messages:e(D)})),zr=relations(D,({one:e})=>({senderId:e(t,{fields:[D.senderId],references:[t.id],relationName:"sender"}),userMatch:e(f,{fields:[D.userMatchId],references:[f.id]})})),Or=relations(y,({one:e,many:r})=>({submissions:r(k)})),br=relations(k,({one:e})=>({user:e(t,{fields:[k.userId],references:[t.id]}),option:e(y,{fields:[k.optionId],references:[y.id]})}));export{w as accounts,nr as accountsRelation,qe as accountsRoleEnum,Fi as activities,h as assignmentsProfil,hr as assignmentsProfilRelation,$e as attendanceStatusEnum,Ge as attendanceTypeEnum,E as attendances,fr as attendancesRelation,De as classEnum,z as classRegistrations,Sr as classRegistrationsRelation,M as classes,Cr as classesRelation,li as createUserRankingViewIndexes,B as emailVerificationOtps,lr as emailVerificationOtpsRelations,F as endpointAnalytics,qr as endpointAnalyticsRelation,ie as handbook,y as itbGuesserOptions,Or as itbGuesserOptionsRelations,k as itbGuesserSubmissions,br as itbGuesserSubmissionsRelations,Ve as itbGuesserTempatEnum,n as media,pr as mediaRelation,Ti as memoryGameScores,D as messages,zr as messagesRelations,L as profilKATAttendances,dr as profilKATAttendancesRelation,_ as profilKATs,wr as profilKATsRelation,G as questionAnswerOptions,Nr as questionAnswerOptionsRelation,Fe as questionTypeEnum,A as questions,Er as questionsRelation,_i as refreshUserRankingView,Re as stageStatusEnum,u as stages,cr as stagesRelation,d as submissionsProfil,Ar as submissionsProfilRelation,I as userAttendance,gr as userAttendanceRelation,f as userMatches,Tr as userMatchesRelations,ni as userRankingView,b as userStageProgress,mr as userStageProgressRelation,t as users,_r as usersRelation,Y as verificationToken,ur as verificationTokenRelations};