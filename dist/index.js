import {pgEnum,pgTable,timestamp,text,integer,serial,boolean,real,pgMaterializedView,time}from'drizzle-orm/pg-core';import {init}from'@paralleldrive/cuid2';import {sql,relations}from'drizzle-orm';var r=init({length:8}),i=()=>new Date;var ie=pgEnum("accounts_role_enum",["admin","mamet","mentor","user","guest"]),m=pgTable("accounts",{id:text("id").primaryKey().$defaultFn(()=>r()),nim:text("nim").notNull().unique(),password:text("password").notNull(),role:ie("role").default("user").notNull(),lastLoggedIn:timestamp("last_logged_in"),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(i)});var oe=pgEnum("media_bucket_enum",["profile","content","documents","uploads"]),l=pgTable("media",{id:text("id").primaryKey().$defaultFn(()=>r()),creatorId:text("creator_id").notNull().references(()=>t.id),name:text("name").notNull(),bucket:oe("bucket").notNull(),type:text("type").notNull(),url:text("url").notNull(),updatedAt:timestamp("updated_at").$onUpdate(i),createdAt:timestamp("created_at").defaultNow()});var t=pgTable("users",{id:text("id").references(()=>m.id).primaryKey(),nim:text("nim").notNull().unique(),email:text("email").unique(),fullName:text("full_name"),fakultas:text("fakultas"),keluarga:text("keluarga"),bata:text("bata"),rumpun:text("rumpun"),fotoMediaId:text("foto_media_id").references(()=>l.id),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(i)});var b=pgTable("endpoint_analytics",{id:serial("id").primaryKey(),userId:text("user_id").references(()=>t.id,{onDelete:"set null"}),endpoint:text("endpoint").notNull(),method:text("method").notNull(),statusCode:integer("status_code").notNull(),responseTimeMs:integer("response_time_ms"),urlQuery:text("url_query"),requestBody:text("request_body"),errorMessage:text("error_message"),createdAt:timestamp("created_at").defaultNow()});var de=pgEnum("class_enum",["sesi_1","sesi_2"]),g=pgTable("classes",{id:text("id").primaryKey().$defaultFn(()=>r()),className:text("class_name").notNull(),room:text("room").notNull(),totalQuota:integer("total_quota").notNull(),mentorId:text("mentor_id").references(()=>t.id),classType:de("class_type").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(i)}),q=pgTable("class_registrations",{id:text("id").primaryKey().$defaultFn(()=>r()),userId:text("user_id").notNull().references(()=>t.id),classId:text("class_id").notNull().references(()=>g.id),registeredAt:timestamp("registered_at").defaultNow(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(i)});var me=pgEnum("attendance_status",["hadir","tidak_hadir"]),O=pgTable("attendances",{id:text("id").primaryKey().$defaultFn(()=>r()),dayNumber:integer("day_number").notNull(),title:text("title").notNull(),description:text("description"),startTime:timestamp("start_time").notNull(),durationMinutes:integer("duration_minutes").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(i)}),S=pgTable("user_attendance",{id:text("id").primaryKey().$defaultFn(()=>r()),scheduleId:text("schedule_id").notNull().references(()=>O.id),userId:text("user_id").notNull().references(()=>t.id),status:me("status").default("tidak_hadir").notNull(),updatedAt:timestamp("updated_at").$onUpdate(i)});var _=pgTable("profil_kats",{id:text("id").primaryKey().$defaultFn(()=>r()),profilNumber:integer("profil_number").notNull().unique(),title:text("title").notNull(),description:text("description")}),E=pgTable("assignments_profil",{id:text("id").primaryKey().$defaultFn(()=>r()),profilKATId:text("profil_kat_id").notNull().references(()=>_.id),title:text("title").notNull(),description:text("description"),dueDate:timestamp("due_date").notNull(),isOpen:boolean("is_open").default(false).notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(i)}),d=pgTable("submissions_profil",{id:text("id").primaryKey().$defaultFn(()=>r()),assignmentId:text("assignment_id").notNull().references(()=>E.id),userId:text("user_id").notNull().references(()=>t.id),submissionMediaId:text("submission_media_id").notNull().references(()=>l.id),score:integer("score").default(0).notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(i)});var Ne=pgEnum("status",["completed","not_completed"]),n=pgTable("stages",{id:text("id").primaryKey().$defaultFn(()=>r()),profilId:text("profil_id").notNull().references(()=>_.id),stageNumber:integer("stage_number").notNull(),quizWeight:real("quiz_weight").notNull().default(0),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(i)}),w=pgTable("user_stage_progress",{id:text("id").primaryKey().$defaultFn(()=>r()),userId:text("user_id").notNull().references(()=>t.id),stageId:text("stage_id").notNull().references(()=>n.id),status:Ne("status").notNull(),completedAt:timestamp("completed_at"),quizScore:integer("quiz_score"),updatedAt:timestamp("updated_at").$onUpdate(i)});var Ce=pgEnum("question_type_enum",["multiple_choice","short_answer"]),N=pgTable("questions",{id:text("id").primaryKey().$defaultFn(()=>r()),stageId:text("stage_id").notNull().references(()=>n.id),questionText:text("question_text").notNull(),questionType:Ce("question_type").notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(i)}),D=pgTable("question_answer_options",{id:text("id").primaryKey().$defaultFn(()=>r()),questionId:text("question_id").notNull().references(()=>N.id),answerText:text("answer_text").notNull(),isCorrect:boolean("is_correct").default(false).notNull(),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(i)});var Dt=pgMaterializedView("user_ranking_view",{userId:text("user_id").primaryKey(),nim:text("nim"),fullName:text("full_name"),fakultas:text("fakultas"),keluarga:text("keluarga"),bata:text("bata"),rumpun:text("rumpun"),fotoMediaId:text("foto_media_id"),profil1QuizWeight:real("profil1_quiz_weight").notNull().default(0),profil1QuizScore:integer("profil1_quiz_score").notNull().default(0),profil1AvgAssignmentScore:real("profil1_avg_assignment_score").notNull().default(0),profil1TotalScore:real("profil1_total_score").notNull().default(0),profil2QuizWeight:real("profil2_quiz_weight").notNull().default(0),profil2QuizScore:integer("profil2_quiz_score").notNull().default(0),profil2AvgAssignmentScore:real("profil2_avg_assignment_score").notNull().default(0),profil2TotalScore:real("profil2_total_score").notNull().default(0),profil3QuizWeight:real("profil3_quiz_weight").notNull().default(0),profil3QuizScore:integer("profil3_quiz_score").notNull().default(0),profil3AvgAssignmentScore:real("profil3_avg_assignment_score").notNull().default(0),profil3TotalScore:real("profil3_total_score").notNull().default(0),profil4QuizWeight:real("profil4_quiz_weight").notNull().default(0),profil4QuizScore:integer("profil4_quiz_score").notNull().default(0),profil4AvgAssignmentScore:real("profil4_avg_assignment_score").notNull().default(0),profil4TotalScore:real("profil4_total_score").notNull().default(0),profil5QuizWeight:real("profil5_quiz_weight").notNull().default(0),profil5QuizScore:integer("profil5_quiz_score").notNull().default(0),profil5AvgAssignmentScore:real("profil5_avg_assignment_score").notNull().default(0),profil5TotalScore:real("profil5_total_score").notNull().default(0),totalScore:real("total_score").notNull().default(0),lastActivityAt:timestamp("last_activity_at"),ranking:integer("ranking").notNull()}).as(sql`
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
`);async function Xt(e){await e.execute(sql`REFRESH MATERIALIZED VIEW user_ranking_view`);}var Ht=sql`
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

-- Individual profil score indexes for filtering/sorting by specific profils
CREATE INDEX IF NOT EXISTS idx_user_ranking_view_profil1_score ON user_ranking_view(profil1_total_score DESC);
CREATE INDEX IF NOT EXISTS idx_user_ranking_view_profil2_score ON user_ranking_view(profil2_total_score DESC);
CREATE INDEX IF NOT EXISTS idx_user_ranking_view_profil3_score ON user_ranking_view(profil3_total_score DESC);
CREATE INDEX IF NOT EXISTS idx_user_ranking_view_profil4_score ON user_ranking_view(profil4_total_score DESC);
CREATE INDEX IF NOT EXISTS idx_user_ranking_view_profil5_score ON user_ranking_view(profil5_total_score DESC);
`;var Yt=pgTable("activities",{id:text("id").primaryKey().$defaultFn(()=>r()),day:integer("day").notNull(),title:text("title").notNull(),description:text("description"),startTime:time("start_time").notNull(),endTime:time("end_time").notNull(),location:text("location"),geolocation:text("geolocation"),createdAt:timestamp("created_at").defaultNow(),updatedAt:timestamp("updated_at").$onUpdate(i)});var ni=relations(m,({one:e})=>({user:e(t,{fields:[m.id],references:[t.id]})})),ui=relations(t,({one:e,many:s})=>({account:e(m,{fields:[t.id],references:[m.id]}),fotoMedia:e(l,{fields:[t.fotoMediaId],references:[l.id]}),stageProgress:s(w),attendance:s(S),submissions:s(d),createdMedia:s(l),analytics:s(b),classRegistrations:s(q),mentorClasses:s(g)})),_i=relations(l,({one:e,many:s})=>({creator:e(t,{fields:[l.creatorId],references:[t.id]}),submissions:s(d)})),pi=relations(O,({many:e})=>({userAttendance:e(S)})),di=relations(S,({one:e})=>({attendance:e(O,{fields:[S.scheduleId],references:[O.id]}),user:e(t,{fields:[S.userId],references:[t.id]})})),fi=relations(n,({many:e,one:s})=>({userProgress:e(w),questions:e(N),profil:s(_,{fields:[n.profilId],references:[_.id]})})),mi=relations(w,({one:e})=>({user:e(t,{fields:[w.userId],references:[t.id]}),stage:e(n,{fields:[w.stageId],references:[n.id]})})),ci=relations(N,({one:e,many:s})=>({stage:e(n,{fields:[N.stageId],references:[n.id]}),answerOptions:s(D)})),gi=relations(D,({one:e})=>({question:e(N,{fields:[D.questionId],references:[N.id]})})),Ei=relations(_,({many:e,one:s})=>({assignments:e(E),stage:s(n,{fields:[_.id],references:[n.profilId]})})),Ni=relations(E,({many:e,one:s})=>({submissions:e(d),profil:s(_,{fields:[E.profilKATId],references:[_.id]})})),Ai=relations(d,({one:e})=>({assignment:e(E,{fields:[d.assignmentId],references:[E.id]}),user:e(t,{fields:[d.userId],references:[t.id]}),media:e(l,{fields:[d.submissionMediaId],references:[l.id]})})),qi=relations(g,({one:e,many:s})=>({mentor:e(t,{fields:[g.mentorId],references:[t.id]}),registrations:s(q)})),Ci=relations(q,({one:e})=>({user:e(t,{fields:[q.userId],references:[t.id]}),class:e(g,{fields:[q.classId],references:[g.id]})})),Si=relations(b,({one:e})=>({user:e(t,{fields:[b.userId],references:[t.id]})}));export{m as accounts,ni as accountsRelation,ie as accountsRoleEnum,Yt as activities,E as assignmentsProfil,Ni as assignmentsProfilRelation,me as attendanceStatusEnum,O as attendances,pi as attendancesRelation,de as classEnum,q as classRegistrations,Ci as classRegistrationsRelation,g as classes,qi as classesRelation,Ht as createUserRankingViewIndexes,b as endpointAnalytics,Si as endpointAnalyticsRelation,l as media,oe as mediaBucketEnum,_i as mediaRelation,_ as profilKATs,Ei as profilKATsRelation,D as questionAnswerOptions,gi as questionAnswerOptionsRelation,Ce as questionTypeEnum,N as questions,ci as questionsRelation,Xt as refreshUserRankingView,Ne as stageStatusEnum,n as stages,fi as stagesRelation,d as submissionsProfil,Ai as submissionsProfilRelation,S as userAttendance,di as userAttendanceRelation,Dt as userRankingView,w as userStageProgress,mi as userStageProgressRelation,t as users,ui as usersRelation};