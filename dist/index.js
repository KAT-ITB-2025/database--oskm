import {pgEnum,pgTable,timestamp,text,boolean,integer,serial,primaryKey,numeric,pgMaterializedView,time}from'drizzle-orm/pg-core';import {init}from'@paralleldrive/cuid2';import {sql,relations}from'drizzle-orm';var a=init({length:8}),r=()=>new Date;var le=pgEnum("accounts_role_enum",["admin","mamet","mentor","user","guest"]),d=pgTable("accounts",{id:text("id").primaryKey().$defaultFn(()=>a()),nim:text("nim").notNull().unique(),password:text("password").notNull(),role:le("role").default("user").notNull(),lastLoggedIn:timestamp("last_logged_in"),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)});var fe=pgEnum("media_bucket_enum",["profile","content","documents","uploads"]),_=pgTable("media",{id:text("id").primaryKey().$defaultFn(()=>a()),creatorId:text("creator_id").notNull().references(()=>i.id),name:text("name").notNull(),bucket:fe("bucket").notNull(),type:text("type").notNull(),url:text("url").notNull(),updatedAt:timestamp("updated_at").$onUpdate(r),createdAt:timestamp("created_at").defaultNow()});var i=pgTable("users",{id:text("id").references(()=>d.id).primaryKey(),nim:text("nim").notNull().unique(),email:text("email").unique(),emailVerified:boolean("email_verified").notNull().default(false),fullName:text("full_name"),fakultas:text("fakultas"),keluarga:text("keluarga"),bata:text("bata"),rumpun:text("rumpun"),fotoMediaId:text("foto_media_id").references(()=>_.id),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)}),U=pgTable("email_verification_otps",{userId:text("user_id").notNull().references(()=>i.id,{onDelete:"cascade"}),otp:text("otp").notNull(),expiresAt:timestamp("expires_at",{mode:"date",withTimezone:true}).notNull(),createdAt:timestamp("created_at").defaultNow()});var y=pgTable("endpoint_analytics",{id:serial("id").primaryKey(),userId:text("user_id").references(()=>i.id,{onDelete:"set null"}),endpoint:text("endpoint").notNull(),method:text("method").notNull(),statusCode:integer("status_code").notNull(),responseTimeMs:integer("response_time_ms"),urlQuery:text("url_query"),requestBody:text("request_body"),errorMessage:text("error_message"),createdAt:timestamp("created_at").defaultNow()});var F=pgTable("verification_token",{identifier:text("identifier").notNull().references(()=>i.email),token:text("token"),expiredAt:timestamp("expired_at",{mode:"date",withTimezone:true})},e=>[primaryKey({columns:[e.identifier,e.token]})]);var Ce=pgEnum("class_enum",["sesi_1","sesi_2"]),E=pgTable("classes",{id:text("id").primaryKey().$defaultFn(()=>a()),className:text("class_name").notNull(),room:text("room").notNull(),totalQuota:integer("total_quota").notNull(),mentorId:text("mentor_id").references(()=>i.id),classType:Ce("class_type").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)}),C=pgTable("class_registrations",{id:text("id").primaryKey().$defaultFn(()=>a()),userId:text("user_id").notNull().references(()=>i.id),classId:text("class_id").notNull().references(()=>E.id),registeredAt:timestamp("registered_at").defaultNow(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)});var n=pgTable("profil_kats",{id:text("id").primaryKey().$defaultFn(()=>a()),profilNumber:integer("profil_number").notNull().unique(),quizWeight:numeric("quiz_weight",{precision:5,scale:2}).notNull().default("0.00"),assignmentWeight:numeric("assignment_weight",{precision:5,scale:2}).notNull().default("0.00"),attendanceWeight:numeric("attendance_weight",{precision:5,scale:2}).notNull().default("0.00"),title:text("title").notNull(),description:text("description")}),N=pgTable("assignments_profil",{id:text("id").primaryKey().$defaultFn(()=>a()),profilKATId:text("profil_kat_id").notNull().references(()=>n.id),title:text("title").notNull(),assignmentMediaId:text("assignment_media_id").notNull().references(()=>_.id),description:text("description"),dueDate:timestamp("due_date",{mode:"date",withTimezone:true}).notNull(),isOpen:boolean("is_open").default(false).notNull(),startDate:timestamp("start_date",{mode:"date",withTimezone:true}).notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)}),f=pgTable("submissions_profil",{id:text("id").primaryKey().$defaultFn(()=>a()),assignmentId:text("assignment_id").notNull().references(()=>N.id),userId:text("user_id").notNull().references(()=>i.id),submissionMediaId:text("submission_media_id").notNull().references(()=>_.id),score:integer("score").default(0).notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)});var Te=pgEnum("status",["completed","not_completed"]),p=pgTable("stages",{id:text("id").primaryKey().$defaultFn(()=>a()),profilId:text("profil_id").notNull().references(()=>n.id),stageNumber:integer("stage_number").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)}),q=pgTable("user_stage_progress",{id:text("id").primaryKey().$defaultFn(()=>a()),userId:text("user_id").notNull().references(()=>i.id),stageId:text("stage_id").notNull().references(()=>p.id),status:Te("status").notNull(),completedAt:timestamp("completed_at"),quizScore:integer("quiz_score"),updatedAt:timestamp("updated_at").$onUpdate(r)});var He=pgEnum("question_type_enum",["multiple_choice","short_answer"]),w=pgTable("questions",{id:text("id").primaryKey().$defaultFn(()=>a()),stageId:text("stage_id").notNull().references(()=>p.id),questionText:text("question_text").notNull(),questionType:He("question_type").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)}),M=pgTable("question_answer_options",{id:text("id").primaryKey().$defaultFn(()=>a()),questionId:text("question_id").notNull().references(()=>w.id),answerText:text("answer_text").notNull(),isCorrect:boolean("is_correct").default(false).notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)});var Xi=pgMaterializedView("user_ranking_view",{userId:text("user_id").primaryKey(),nim:text("nim"),fullName:text("full_name"),fakultas:text("fakultas"),keluarga:text("keluarga"),bata:text("bata"),rumpun:text("rumpun"),fotoMediaId:text("foto_media_id"),profil1QuizWeight:numeric("profil1_quiz_weight",{precision:5,scale:2}).notNull().default("0.00"),profil1QuizScore:integer("profil1_quiz_score").notNull().default(0),profil1AssignmentWeight:numeric("profil1_assignment_weight",{precision:5,scale:2}).notNull().default("0.00"),profil1AvgAssignmentScore:numeric("profil1_avg_assignment_score",{precision:5,scale:2}).notNull().default("0.00"),profil1AttendanceWeight:numeric("profil1_attendance_weight",{precision:5,scale:2}).notNull().default("0.00"),profil1AvgAttendanceScore:numeric("profil1_avg_attendance_score",{precision:5,scale:2}).notNull().default("0.00"),profil1TotalScore:numeric("profil1_total_score",{precision:5,scale:2}).notNull().default("0.00"),profil2QuizWeight:numeric("profil2_quiz_weight",{precision:5,scale:2}).notNull().default("0.00"),profil2QuizScore:integer("profil2_quiz_score").notNull().default(0),profil2AssignmentWeight:numeric("profil2_assignment_weight",{precision:5,scale:2}).notNull().default("0.00"),profil2AvgAssignmentScore:numeric("profil2_avg_assignment_score",{precision:5,scale:2}).notNull().default("0.00"),profil2AttendanceWeight:numeric("profil2_attendance_weight",{precision:5,scale:2}).notNull().default("0.00"),profil2AvgAttendanceScore:numeric("profil2_avg_attendance_score",{precision:5,scale:2}).notNull().default("0.00"),profil2TotalScore:numeric("profil2_total_score",{precision:5,scale:2}).notNull().default("0.00"),profil3QuizWeight:numeric("profil3_quiz_weight",{precision:5,scale:2}).notNull().default("0.00"),profil3QuizScore:integer("profil3_quiz_score").notNull().default(0),profil3AssignmentWeight:numeric("profil3_assignment_weight",{precision:5,scale:2}).notNull().default("0.00"),profil3AvgAssignmentScore:numeric("profil3_avg_assignment_score",{precision:5,scale:2}).notNull().default("0.00"),profil3AttendanceWeight:numeric("profil3_attendance_weight",{precision:5,scale:2}).notNull().default("0.00"),profil3AvgAttendanceScore:numeric("profil3_avg_attendance_score",{precision:5,scale:2}).notNull().default("0.00"),profil3TotalScore:numeric("profil3_total_score",{precision:5,scale:2}).notNull().default("0.00"),profil4QuizWeight:numeric("profil4_quiz_weight",{precision:5,scale:2}).notNull().default("0.00"),profil4QuizScore:integer("profil4_quiz_score").notNull().default(0),profil4AssignmentWeight:numeric("profil4_assignment_weight",{precision:5,scale:2}).notNull().default("0.00"),profil4AvgAssignmentScore:numeric("profil4_avg_assignment_score",{precision:5,scale:2}).notNull().default("0.00"),profil4AttendanceWeight:numeric("profil4_attendance_weight",{precision:5,scale:2}).notNull().default("0.00"),profil4AvgAttendanceScore:numeric("profil4_avg_attendance_score",{precision:5,scale:2}).notNull().default("0.00"),profil4TotalScore:numeric("profil4_total_score",{precision:5,scale:2}).notNull().default("0.00"),profil5QuizWeight:numeric("profil5_quiz_weight",{precision:5,scale:2}).notNull().default("0.00"),profil5QuizScore:integer("profil5_quiz_score").notNull().default(0),profil5AssignmentWeight:numeric("profil5_assignment_weight",{precision:5,scale:2}).notNull().default("0.00"),profil5AvgAssignmentScore:numeric("profil5_avg_assignment_score",{precision:5,scale:2}).notNull().default("0.00"),profil5AttendanceWeight:numeric("profil5_attendance_weight",{precision:5,scale:2}).notNull().default("0.00"),profil5AvgAttendanceScore:numeric("profil5_avg_attendance_score",{precision:5,scale:2}).notNull().default("0.00"),profil5TotalScore:numeric("profil5_total_score",{precision:5,scale:2}).notNull().default("0.00"),totalScore:numeric("total_score",{precision:5,scale:2}).notNull().default("0.00"),tiebreakerScore:numeric("tiebreaker_score",{precision:15,scale:3}).notNull().default("0.000"),lastActivityAt:timestamp("last_activity_at"),ranking:integer("ranking").notNull()}).as(sql`
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
    GROUP BY u.id, pk.profil_number
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
      COALESCE(SUM(CASE WHEN uats.profil_number = 5 THEN uats.attendance_timing_score END), 0) as profil5_timing_score

    FROM users u
    LEFT JOIN user_quiz_scores uqs ON uqs.user_id = u.id
    LEFT JOIN user_assignment_scores uas ON uas.user_id = u.id AND uas.profil_number = uqs.profil_number
    LEFT JOIN user_attendance_scores uats ON uats.user_id = u.id AND uats.profil_number = uqs.profil_number
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
`);async function Ui(e){await e.execute(sql`REFRESH MATERIALIZED VIEW user_ranking_view`);}var Fi=sql`
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
`;var Le=pgEnum("attendance_status",["hadir","tidak_hadir"]),ke=pgEnum("attendance_type",["opening","closing"]),c=pgTable("attendances",{id:text("id").primaryKey().$defaultFn(()=>a()),attendanceType:ke("attendance_type").notNull(),dayNumber:integer("day_number").notNull(),startTime:timestamp("start_time").notNull(),durationMinutes:integer("duration_minutes").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)}),H=pgTable("profil_kat_attendance",{id:text("id").primaryKey().$defaultFn(()=>a()),profilKATId:text("profil_kat_id").notNull().references(()=>n.id),attendanceId:text("attendance_id").notNull().references(()=>c.id),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)}),v=pgTable("user_attendance",{id:text("id").primaryKey().$defaultFn(()=>a()),scheduleId:text("schedule_id").notNull().references(()=>c.id),userId:text("user_id").notNull().references(()=>i.id),status:Le("status").default("tidak_hadir").notNull(),updatedAt:timestamp("updated_at").$onUpdate(r)});var ut=pgTable("activities",{id:text("id").primaryKey().$defaultFn(()=>a()),day:integer("day").notNull(),title:text("title").notNull(),description:text("description"),startTime:time("start_time").notNull(),endTime:time("end_time").notNull(),location:text("location"),geolocation:text("geolocation"),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(r)});var St=relations(d,({one:e})=>({user:e(i,{fields:[d.id],references:[i.id]})})),qt=relations(i,({one:e,many:s})=>({account:e(d,{fields:[i.id],references:[d.id]}),fotoMedia:e(_,{fields:[i.fotoMediaId],references:[_.id]}),stageProgress:s(q),attendance:s(v),submissions:s(f),createdMedia:s(_),analytics:s(y),classRegistrations:s(C),mentorClasses:s(E)})),Tt=relations(U,({one:e})=>({user:e(i,{fields:[U.userId],references:[i.id]})})),zt=relations(F,({one:e})=>({user:e(i,{fields:[F.identifier],references:[i.email]})})),Ot=relations(_,({one:e,many:s})=>({creator:e(i,{fields:[_.creatorId],references:[i.id]}),submissions:s(f)})),Ht=relations(c,({many:e})=>({userAttendance:e(v),profilKATAttendances:e(H)})),vt=relations(v,({one:e})=>({attendance:e(c,{fields:[v.scheduleId],references:[c.id]}),user:e(i,{fields:[v.userId],references:[i.id]})})),bt=relations(H,({one:e})=>({profilKAT:e(n,{fields:[H.profilKATId],references:[n.id]}),attendance:e(c,{fields:[H.attendanceId],references:[c.id]})})),Lt=relations(p,({many:e,one:s})=>({userProgress:e(q),questions:e(w),profil:s(n,{fields:[p.profilId],references:[n.id]})})),kt=relations(q,({one:e})=>({user:e(i,{fields:[q.userId],references:[i.id]}),stage:e(p,{fields:[q.stageId],references:[p.id]})})),It=relations(w,({one:e,many:s})=>({stage:e(p,{fields:[w.stageId],references:[p.id]}),answerOptions:s(M)})),xt=relations(M,({one:e})=>({question:e(w,{fields:[M.questionId],references:[w.id]})})),yt=relations(n,({many:e,one:s})=>({assignments:e(N),attendances:e(H),stage:s(p,{fields:[n.id],references:[p.profilId]})})),Dt=relations(N,({many:e,one:s})=>({submissions:e(f),profil:s(n,{fields:[N.profilKATId],references:[n.id]})})),Wt=relations(f,({one:e})=>({assignment:e(N,{fields:[f.assignmentId],references:[N.id]}),user:e(i,{fields:[f.userId],references:[i.id]}),media:e(_,{fields:[f.submissionMediaId],references:[_.id]})})),Mt=relations(E,({one:e,many:s})=>({mentor:e(i,{fields:[E.mentorId],references:[i.id]}),registrations:s(C)})),Rt=relations(C,({one:e})=>({user:e(i,{fields:[C.userId],references:[i.id]}),class:e(E,{fields:[C.classId],references:[E.id]})})),Xt=relations(y,({one:e})=>({user:e(i,{fields:[y.userId],references:[i.id]})}));export{d as accounts,St as accountsRelation,le as accountsRoleEnum,ut as activities,N as assignmentsProfil,Dt as assignmentsProfilRelation,Le as attendanceStatusEnum,ke as attendanceTypeEnum,c as attendances,Ht as attendancesRelation,Ce as classEnum,C as classRegistrations,Rt as classRegistrationsRelation,E as classes,Mt as classesRelation,Fi as createUserRankingViewIndexes,U as emailVerificationOtps,Tt as emailVerificationOtpsRelations,y as endpointAnalytics,Xt as endpointAnalyticsRelation,_ as media,fe as mediaBucketEnum,Ot as mediaRelation,H as profilKATAttendances,bt as profilKATAttendancesRelation,n as profilKATs,yt as profilKATsRelation,M as questionAnswerOptions,xt as questionAnswerOptionsRelation,He as questionTypeEnum,w as questions,It as questionsRelation,Ui as refreshUserRankingView,Te as stageStatusEnum,p as stages,Lt as stagesRelation,f as submissionsProfil,Wt as submissionsProfilRelation,v as userAttendance,vt as userAttendanceRelation,Xi as userRankingView,q as userStageProgress,kt as userStageProgressRelation,i as users,qt as usersRelation,F as verificationToken,zt as verificationTokenRelations};