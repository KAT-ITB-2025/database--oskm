import {pgEnum,pgTable,timestamp,text,boolean,integer,serial,primaryKey,real,pgMaterializedView,time}from'drizzle-orm/pg-core';import {init}from'@paralleldrive/cuid2';import {sql,relations}from'drizzle-orm';var a=init({length:8}),r=()=>new Date;var le=pgEnum("accounts_role_enum",["admin","mamet","mentor","user","guest"]),c=pgTable("accounts",{id:text("id").primaryKey().$defaultFn(()=>a()),nim:text("nim").notNull().unique(),password:text("password").notNull(),role:le("role").default("user").notNull(),lastLoggedIn:timestamp("last_logged_in"),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)});var fe=pgEnum("media_bucket_enum",["profile","content","documents","uploads"]),_=pgTable("media",{id:text("id").primaryKey().$defaultFn(()=>a()),creatorId:text("creator_id").notNull().references(()=>t.id),name:text("name").notNull(),bucket:fe("bucket").notNull(),type:text("type").notNull(),url:text("url").notNull(),updatedAt:timestamp("updated_at").$onUpdate(r),createdAt:timestamp("created_at").defaultNow()});var t=pgTable("users",{id:text("id").references(()=>c.id).primaryKey(),nim:text("nim").notNull().unique(),email:text("email").unique(),emailVerified:boolean("email_verified").notNull().default(false),fullName:text("full_name"),fakultas:text("fakultas"),keluarga:text("keluarga"),bata:text("bata"),rumpun:text("rumpun"),fotoMediaId:text("foto_media_id").references(()=>_.id),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)}),F=pgTable("email_verification_otps",{userId:text("user_id").notNull().references(()=>t.id,{onDelete:"cascade"}),otp:text("otp").notNull(),expiresAt:timestamp("expires_at",{mode:"date",withTimezone:true}).notNull(),createdAt:timestamp("created_at").defaultNow()});var y=pgTable("endpoint_analytics",{id:serial("id").primaryKey(),userId:text("user_id").references(()=>t.id,{onDelete:"set null"}),endpoint:text("endpoint").notNull(),method:text("method").notNull(),statusCode:integer("status_code").notNull(),responseTimeMs:integer("response_time_ms"),urlQuery:text("url_query"),requestBody:text("request_body"),errorMessage:text("error_message"),createdAt:timestamp("created_at").defaultNow()});var U=pgTable("verification_token",{identifier:text("identifier").notNull().references(()=>t.email),token:text("token"),expiredAt:timestamp("expired_at",{mode:"date",withTimezone:true})},e=>[primaryKey({columns:[e.identifier,e.token]})]);var Ce=pgEnum("class_enum",["sesi_1","sesi_2"]),E=pgTable("classes",{id:text("id").primaryKey().$defaultFn(()=>a()),className:text("class_name").notNull(),room:text("room").notNull(),totalQuota:integer("total_quota").notNull(),mentorId:text("mentor_id").references(()=>t.id),classType:Ce("class_type").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)}),S=pgTable("class_registrations",{id:text("id").primaryKey().$defaultFn(()=>a()),userId:text("user_id").notNull().references(()=>t.id),classId:text("class_id").notNull().references(()=>E.id),registeredAt:timestamp("registered_at").defaultNow(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)});var n=pgTable("profil_kats",{id:text("id").primaryKey().$defaultFn(()=>a()),profilNumber:integer("profil_number").notNull().unique(),quizWeight:real("quiz_weight").notNull().default(0),assignmentWeight:real("assignment_weight").notNull().default(0),attendanceWeight:real("attendance_weight").notNull().default(0),title:text("title").notNull(),description:text("description")}),N=pgTable("assignments_profil",{id:text("id").primaryKey().$defaultFn(()=>a()),profilKATId:text("profil_kat_id").notNull().references(()=>n.id),title:text("title").notNull(),assignmentMediaId:text("assignment_media_id").notNull().references(()=>_.id),description:text("description"),dueDate:timestamp("due_date",{mode:"date",withTimezone:true}).notNull(),isOpen:boolean("is_open").default(false).notNull(),startDate:timestamp("start_date",{mode:"date",withTimezone:true}).notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)}),f=pgTable("submissions_profil",{id:text("id").primaryKey().$defaultFn(()=>a()),assignmentId:text("assignment_id").notNull().references(()=>N.id),userId:text("user_id").notNull().references(()=>t.id),submissionMediaId:text("submission_media_id").notNull().references(()=>_.id),score:integer("score").default(0).notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)});var Te=pgEnum("status",["completed","not_completed"]),u=pgTable("stages",{id:text("id").primaryKey().$defaultFn(()=>a()),profilId:text("profil_id").notNull().references(()=>n.id),stageNumber:integer("stage_number").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)}),T=pgTable("user_stage_progress",{id:text("id").primaryKey().$defaultFn(()=>a()),userId:text("user_id").notNull().references(()=>t.id),stageId:text("stage_id").notNull().references(()=>u.id),status:Te("status").notNull(),completedAt:timestamp("completed_at"),quizScore:integer("quiz_score"),updatedAt:timestamp("updated_at").$onUpdate(r)});var He=pgEnum("question_type_enum",["multiple_choice","short_answer"]),w=pgTable("questions",{id:text("id").primaryKey().$defaultFn(()=>a()),stageId:text("stage_id").notNull().references(()=>u.id),questionText:text("question_text").notNull(),questionType:He("question_type").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)}),M=pgTable("question_answer_options",{id:text("id").primaryKey().$defaultFn(()=>a()),questionId:text("question_id").notNull().references(()=>w.id),answerText:text("answer_text").notNull(),isCorrect:boolean("is_correct").default(false).notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)});var Xt=pgMaterializedView("user_ranking_view",{userId:text("user_id").primaryKey(),nim:text("nim"),fullName:text("full_name"),fakultas:text("fakultas"),keluarga:text("keluarga"),bata:text("bata"),rumpun:text("rumpun"),fotoMediaId:text("foto_media_id"),profil1QuizWeight:real("profil1_quiz_weight").notNull().default(0),profil1QuizScore:integer("profil1_quiz_score").notNull().default(0),profil1AssignmentWeight:real("profil1_assignment_weight").notNull().default(0),profil1AvgAssignmentScore:real("profil1_avg_assignment_score").notNull().default(0),profil1AttendanceWeight:real("profil1_attendance_weight").notNull().default(0),profil1AvgAttendanceScore:real("profil1_avg_attendance_score").notNull().default(0),profil1TotalScore:real("profil1_total_score").notNull().default(0),profil2QuizWeight:real("profil2_quiz_weight").notNull().default(0),profil2QuizScore:integer("profil2_quiz_score").notNull().default(0),profil2AssignmentWeight:real("profil2_assignment_weight").notNull().default(0),profil2AvgAssignmentScore:real("profil2_avg_assignment_score").notNull().default(0),profil2AttendanceWeight:real("profil2_attendance_weight").notNull().default(0),profil2AvgAttendanceScore:real("profil2_avg_attendance_score").notNull().default(0),profil2TotalScore:real("profil2_total_score").notNull().default(0),profil3QuizWeight:real("profil3_quiz_weight").notNull().default(0),profil3QuizScore:integer("profil3_quiz_score").notNull().default(0),profil3AssignmentWeight:real("profil3_assignment_weight").notNull().default(0),profil3AvgAssignmentScore:real("profil3_avg_assignment_score").notNull().default(0),profil3AttendanceWeight:real("profil3_attendance_weight").notNull().default(0),profil3AvgAttendanceScore:real("profil3_avg_attendance_score").notNull().default(0),profil3TotalScore:real("profil3_total_score").notNull().default(0),profil4QuizWeight:real("profil4_quiz_weight").notNull().default(0),profil4QuizScore:integer("profil4_quiz_score").notNull().default(0),profil4AssignmentWeight:real("profil4_assignment_weight").notNull().default(0),profil4AvgAssignmentScore:real("profil4_avg_assignment_score").notNull().default(0),profil4AttendanceWeight:real("profil4_attendance_weight").notNull().default(0),profil4AvgAttendanceScore:real("profil4_avg_attendance_score").notNull().default(0),profil4TotalScore:real("profil4_total_score").notNull().default(0),profil5QuizWeight:real("profil5_quiz_weight").notNull().default(0),profil5QuizScore:integer("profil5_quiz_score").notNull().default(0),profil5AssignmentWeight:real("profil5_assignment_weight").notNull().default(0),profil5AvgAssignmentScore:real("profil5_avg_assignment_score").notNull().default(0),profil5AttendanceWeight:real("profil5_attendance_weight").notNull().default(0),profil5AvgAttendanceScore:real("profil5_avg_attendance_score").notNull().default(0),profil5TotalScore:real("profil5_total_score").notNull().default(0),totalScore:real("total_score").notNull().default(0),tiebreakerScore:real("tiebreaker_score").notNull().default(0),lastActivityAt:timestamp("last_activity_at"),attendanceTotal:integer("attendance_total").notNull().default(0),ranking:integer("ranking").notNull()}).as(sql`
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
`);async function Ft(e){await e.execute(sql`REFRESH MATERIALIZED VIEW user_ranking_view`);}var Ut=sql`
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
`;var Le=pgEnum("attendance_status",["hadir","tidak_hadir"]),ke=pgEnum("attendance_type",["opening","closing"]),g=pgTable("attendances",{id:text("id").primaryKey().$defaultFn(()=>a()),attendanceType:ke("attendance_type").notNull(),dayNumber:integer("day_number").notNull(),startTime:timestamp("start_time").notNull(),durationMinutes:integer("duration_minutes").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)}),H=pgTable("profil_kat_attendance",{id:text("id").primaryKey().$defaultFn(()=>a()),profilKATId:text("profil_kat_id").notNull().references(()=>n.id),attendanceId:text("attendance_id").notNull().references(()=>g.id),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)}),v=pgTable("user_attendance",{id:text("id").primaryKey().$defaultFn(()=>a()),scheduleId:text("schedule_id").notNull().references(()=>g.id),userId:text("user_id").notNull().references(()=>t.id),status:Le("status").default("tidak_hadir").notNull(),updatedAt:timestamp("updated_at").$onUpdate(r)});var pi=pgTable("activities",{id:text("id").primaryKey().$defaultFn(()=>a()),day:integer("day").notNull(),title:text("title").notNull(),description:text("description"),startTime:time("start_time").notNull(),endTime:time("end_time").notNull(),location:text("location"),geolocation:text("geolocation"),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)});var Si=relations(c,({one:e})=>({user:e(t,{fields:[c.id],references:[t.id]})})),qi=relations(t,({one:e,many:o})=>({account:e(c,{fields:[t.id],references:[c.id]}),fotoMedia:e(_,{fields:[t.fotoMediaId],references:[_.id]}),stageProgress:o(T),attendance:o(v),submissions:o(f),createdMedia:o(_),analytics:o(y),classRegistrations:o(S),mentorClasses:o(E)})),Ti=relations(F,({one:e})=>({user:e(t,{fields:[F.userId],references:[t.id]})})),zi=relations(U,({one:e})=>({user:e(t,{fields:[U.identifier],references:[t.email]})})),Oi=relations(_,({one:e,many:o})=>({creator:e(t,{fields:[_.creatorId],references:[t.id]}),submissions:o(f)})),Hi=relations(g,({many:e})=>({userAttendance:e(v),profilKATAttendances:e(H)})),vi=relations(v,({one:e})=>({attendance:e(g,{fields:[v.scheduleId],references:[g.id]}),user:e(t,{fields:[v.userId],references:[t.id]})})),bi=relations(H,({one:e})=>({profilKAT:e(n,{fields:[H.profilKATId],references:[n.id]}),attendance:e(g,{fields:[H.attendanceId],references:[g.id]})})),Li=relations(u,({many:e,one:o})=>({userProgress:e(T),questions:e(w),profil:o(n,{fields:[u.profilId],references:[n.id]})})),ki=relations(T,({one:e})=>({user:e(t,{fields:[T.userId],references:[t.id]}),stage:e(u,{fields:[T.stageId],references:[u.id]})})),Ii=relations(w,({one:e,many:o})=>({stage:e(u,{fields:[w.stageId],references:[u.id]}),answerOptions:o(M)})),xi=relations(M,({one:e})=>({question:e(w,{fields:[M.questionId],references:[w.id]})})),yi=relations(n,({many:e,one:o})=>({assignments:e(N),attendances:e(H),stage:o(u,{fields:[n.id],references:[u.profilId]})})),Di=relations(N,({many:e,one:o})=>({submissions:e(f),profil:o(n,{fields:[N.profilKATId],references:[n.id]})})),Wi=relations(f,({one:e})=>({assignment:e(N,{fields:[f.assignmentId],references:[N.id]}),user:e(t,{fields:[f.userId],references:[t.id]}),media:e(_,{fields:[f.submissionMediaId],references:[_.id]})})),Mi=relations(E,({one:e,many:o})=>({mentor:e(t,{fields:[E.mentorId],references:[t.id]}),registrations:o(S)})),Ri=relations(S,({one:e})=>({user:e(t,{fields:[S.userId],references:[t.id]}),class:e(E,{fields:[S.classId],references:[E.id]})})),Xi=relations(y,({one:e})=>({user:e(t,{fields:[y.userId],references:[t.id]})}));export{c as accounts,Si as accountsRelation,le as accountsRoleEnum,pi as activities,N as assignmentsProfil,Di as assignmentsProfilRelation,Le as attendanceStatusEnum,ke as attendanceTypeEnum,g as attendances,Hi as attendancesRelation,Ce as classEnum,S as classRegistrations,Ri as classRegistrationsRelation,E as classes,Mi as classesRelation,Ut as createUserRankingViewIndexes,F as emailVerificationOtps,Ti as emailVerificationOtpsRelations,y as endpointAnalytics,Xi as endpointAnalyticsRelation,_ as media,fe as mediaBucketEnum,Oi as mediaRelation,H as profilKATAttendances,bi as profilKATAttendancesRelation,n as profilKATs,yi as profilKATsRelation,M as questionAnswerOptions,xi as questionAnswerOptionsRelation,He as questionTypeEnum,w as questions,Ii as questionsRelation,Ft as refreshUserRankingView,Te as stageStatusEnum,u as stages,Li as stagesRelation,f as submissionsProfil,Wi as submissionsProfilRelation,v as userAttendance,vi as userAttendanceRelation,Xt as userRankingView,T as userStageProgress,ki as userStageProgressRelation,t as users,qi as usersRelation,U as verificationToken,zi as verificationTokenRelations};