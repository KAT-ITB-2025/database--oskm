'use strict';var pgCore=require('drizzle-orm/pg-core'),cuid2=require('@paralleldrive/cuid2'),drizzleOrm=require('drizzle-orm');var r=cuid2.init({length:8}),i=()=>new Date;var ie=pgCore.pgEnum("accounts_role_enum",["admin","mamet","mentor","user","guest"]),m=pgCore.pgTable("accounts",{id:pgCore.text("id").primaryKey().$defaultFn(()=>r()),nim:pgCore.text("nim").notNull().unique(),password:pgCore.text("password").notNull(),role:ie("role").default("user").notNull(),lastLoggedIn:pgCore.timestamp("last_logged_in"),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(i)});var oe=pgCore.pgEnum("media_bucket_enum",["profile","content","documents","uploads"]),l=pgCore.pgTable("media",{id:pgCore.text("id").primaryKey().$defaultFn(()=>r()),creatorId:pgCore.text("creator_id").notNull().references(()=>t.id),name:pgCore.text("name").notNull(),bucket:oe("bucket").notNull(),type:pgCore.text("type").notNull(),url:pgCore.text("url").notNull(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(i),createdAt:pgCore.timestamp("created_at").defaultNow()});var t=pgCore.pgTable("users",{id:pgCore.text("id").references(()=>m.id).primaryKey(),nim:pgCore.text("nim").notNull().unique(),email:pgCore.text("email").unique(),fullName:pgCore.text("full_name"),fakultas:pgCore.text("fakultas"),keluarga:pgCore.text("keluarga"),bata:pgCore.text("bata"),rumpun:pgCore.text("rumpun"),fotoMediaId:pgCore.text("foto_media_id").references(()=>l.id),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(i)});var b=pgCore.pgTable("endpoint_analytics",{id:pgCore.serial("id").primaryKey(),userId:pgCore.text("user_id").references(()=>t.id,{onDelete:"set null"}),endpoint:pgCore.text("endpoint").notNull(),method:pgCore.text("method").notNull(),statusCode:pgCore.integer("status_code").notNull(),responseTimeMs:pgCore.integer("response_time_ms"),urlQuery:pgCore.text("url_query"),requestBody:pgCore.text("request_body"),errorMessage:pgCore.text("error_message"),createdAt:pgCore.timestamp("created_at").defaultNow()});var de=pgCore.pgEnum("class_enum",["sesi_1","sesi_2"]),g=pgCore.pgTable("classes",{id:pgCore.text("id").primaryKey().$defaultFn(()=>r()),className:pgCore.text("class_name").notNull(),room:pgCore.text("room").notNull(),totalQuota:pgCore.integer("total_quota").notNull(),mentorId:pgCore.text("mentor_id").references(()=>t.id),classType:de("class_type").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(i)}),q=pgCore.pgTable("class_registrations",{id:pgCore.text("id").primaryKey().$defaultFn(()=>r()),userId:pgCore.text("user_id").notNull().references(()=>t.id),classId:pgCore.text("class_id").notNull().references(()=>g.id),registeredAt:pgCore.timestamp("registered_at").defaultNow(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(i)});var me=pgCore.pgEnum("attendance_status",["hadir","tidak_hadir"]),O=pgCore.pgTable("attendances",{id:pgCore.text("id").primaryKey().$defaultFn(()=>r()),dayNumber:pgCore.integer("day_number").notNull(),title:pgCore.text("title").notNull(),description:pgCore.text("description"),startTime:pgCore.timestamp("start_time").notNull(),durationMinutes:pgCore.integer("duration_minutes").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(i)}),S=pgCore.pgTable("user_attendance",{id:pgCore.text("id").primaryKey().$defaultFn(()=>r()),scheduleId:pgCore.text("schedule_id").notNull().references(()=>O.id),userId:pgCore.text("user_id").notNull().references(()=>t.id),status:me("status").default("tidak_hadir").notNull(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(i)});var _=pgCore.pgTable("profil_kats",{id:pgCore.text("id").primaryKey().$defaultFn(()=>r()),profilNumber:pgCore.integer("profil_number").notNull().unique(),title:pgCore.text("title").notNull(),description:pgCore.text("description")}),E=pgCore.pgTable("assignments_profil",{id:pgCore.text("id").primaryKey().$defaultFn(()=>r()),profilKATId:pgCore.text("profil_kat_id").notNull().references(()=>_.id),title:pgCore.text("title").notNull(),description:pgCore.text("description"),dueDate:pgCore.timestamp("due_date").notNull(),isOpen:pgCore.boolean("is_open").default(false).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(i)}),d=pgCore.pgTable("submissions_profil",{id:pgCore.text("id").primaryKey().$defaultFn(()=>r()),assignmentId:pgCore.text("assignment_id").notNull().references(()=>E.id),userId:pgCore.text("user_id").notNull().references(()=>t.id),submissionMediaId:pgCore.text("submission_media_id").notNull().references(()=>l.id),score:pgCore.integer("score").default(0).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(i)});var Ne=pgCore.pgEnum("status",["completed","not_completed"]),n=pgCore.pgTable("stages",{id:pgCore.text("id").primaryKey().$defaultFn(()=>r()),profilId:pgCore.text("profil_id").notNull().references(()=>_.id),stageNumber:pgCore.integer("stage_number").notNull(),quizWeight:pgCore.real("quiz_weight").notNull().default(0),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(i)}),w=pgCore.pgTable("user_stage_progress",{id:pgCore.text("id").primaryKey().$defaultFn(()=>r()),userId:pgCore.text("user_id").notNull().references(()=>t.id),stageId:pgCore.text("stage_id").notNull().references(()=>n.id),status:Ne("status").notNull(),completedAt:pgCore.timestamp("completed_at"),quizScore:pgCore.integer("quiz_score"),updatedAt:pgCore.timestamp("updated_at").$onUpdate(i)});var Ce=pgCore.pgEnum("question_type_enum",["multiple_choice","short_answer"]),N=pgCore.pgTable("questions",{id:pgCore.text("id").primaryKey().$defaultFn(()=>r()),stageId:pgCore.text("stage_id").notNull().references(()=>n.id),questionText:pgCore.text("question_text").notNull(),questionType:Ce("question_type").notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(i)}),D=pgCore.pgTable("question_answer_options",{id:pgCore.text("id").primaryKey().$defaultFn(()=>r()),questionId:pgCore.text("question_id").notNull().references(()=>N.id),answerText:pgCore.text("answer_text").notNull(),isCorrect:pgCore.boolean("is_correct").default(false).notNull(),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(i)});var Dt=pgCore.pgMaterializedView("user_ranking_view",{userId:pgCore.text("user_id").primaryKey(),nim:pgCore.text("nim"),fullName:pgCore.text("full_name"),fakultas:pgCore.text("fakultas"),keluarga:pgCore.text("keluarga"),bata:pgCore.text("bata"),rumpun:pgCore.text("rumpun"),fotoMediaId:pgCore.text("foto_media_id"),profil1QuizWeight:pgCore.real("profil1_quiz_weight").notNull().default(0),profil1QuizScore:pgCore.integer("profil1_quiz_score").notNull().default(0),profil1AvgAssignmentScore:pgCore.real("profil1_avg_assignment_score").notNull().default(0),profil1TotalScore:pgCore.real("profil1_total_score").notNull().default(0),profil2QuizWeight:pgCore.real("profil2_quiz_weight").notNull().default(0),profil2QuizScore:pgCore.integer("profil2_quiz_score").notNull().default(0),profil2AvgAssignmentScore:pgCore.real("profil2_avg_assignment_score").notNull().default(0),profil2TotalScore:pgCore.real("profil2_total_score").notNull().default(0),profil3QuizWeight:pgCore.real("profil3_quiz_weight").notNull().default(0),profil3QuizScore:pgCore.integer("profil3_quiz_score").notNull().default(0),profil3AvgAssignmentScore:pgCore.real("profil3_avg_assignment_score").notNull().default(0),profil3TotalScore:pgCore.real("profil3_total_score").notNull().default(0),profil4QuizWeight:pgCore.real("profil4_quiz_weight").notNull().default(0),profil4QuizScore:pgCore.integer("profil4_quiz_score").notNull().default(0),profil4AvgAssignmentScore:pgCore.real("profil4_avg_assignment_score").notNull().default(0),profil4TotalScore:pgCore.real("profil4_total_score").notNull().default(0),profil5QuizWeight:pgCore.real("profil5_quiz_weight").notNull().default(0),profil5QuizScore:pgCore.integer("profil5_quiz_score").notNull().default(0),profil5AvgAssignmentScore:pgCore.real("profil5_avg_assignment_score").notNull().default(0),profil5TotalScore:pgCore.real("profil5_total_score").notNull().default(0),totalScore:pgCore.real("total_score").notNull().default(0),lastActivityAt:pgCore.timestamp("last_activity_at"),ranking:pgCore.integer("ranking").notNull()}).as(drizzleOrm.sql`
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
`);async function Xt(e){await e.execute(drizzleOrm.sql`REFRESH MATERIALIZED VIEW user_ranking_view`);}var Ht=drizzleOrm.sql`
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
`;var Yt=pgCore.pgTable("activities",{id:pgCore.text("id").primaryKey().$defaultFn(()=>r()),day:pgCore.integer("day").notNull(),title:pgCore.text("title").notNull(),description:pgCore.text("description"),startTime:pgCore.time("start_time").notNull(),endTime:pgCore.time("end_time").notNull(),location:pgCore.text("location"),geolocation:pgCore.text("geolocation"),createdAt:pgCore.timestamp("created_at").defaultNow(),updatedAt:pgCore.timestamp("updated_at").$onUpdate(i)});var ni=drizzleOrm.relations(m,({one:e})=>({user:e(t,{fields:[m.id],references:[t.id]})})),ui=drizzleOrm.relations(t,({one:e,many:s})=>({account:e(m,{fields:[t.id],references:[m.id]}),fotoMedia:e(l,{fields:[t.fotoMediaId],references:[l.id]}),stageProgress:s(w),attendance:s(S),submissions:s(d),createdMedia:s(l),analytics:s(b),classRegistrations:s(q),mentorClasses:s(g)})),_i=drizzleOrm.relations(l,({one:e,many:s})=>({creator:e(t,{fields:[l.creatorId],references:[t.id]}),submissions:s(d)})),pi=drizzleOrm.relations(O,({many:e})=>({userAttendance:e(S)})),di=drizzleOrm.relations(S,({one:e})=>({attendance:e(O,{fields:[S.scheduleId],references:[O.id]}),user:e(t,{fields:[S.userId],references:[t.id]})})),fi=drizzleOrm.relations(n,({many:e,one:s})=>({userProgress:e(w),questions:e(N),profil:s(_,{fields:[n.profilId],references:[_.id]})})),mi=drizzleOrm.relations(w,({one:e})=>({user:e(t,{fields:[w.userId],references:[t.id]}),stage:e(n,{fields:[w.stageId],references:[n.id]})})),ci=drizzleOrm.relations(N,({one:e,many:s})=>({stage:e(n,{fields:[N.stageId],references:[n.id]}),answerOptions:s(D)})),gi=drizzleOrm.relations(D,({one:e})=>({question:e(N,{fields:[D.questionId],references:[N.id]})})),Ei=drizzleOrm.relations(_,({many:e,one:s})=>({assignments:e(E),stage:s(n,{fields:[_.id],references:[n.profilId]})})),Ni=drizzleOrm.relations(E,({many:e,one:s})=>({submissions:e(d),profil:s(_,{fields:[E.profilKATId],references:[_.id]})})),Ai=drizzleOrm.relations(d,({one:e})=>({assignment:e(E,{fields:[d.assignmentId],references:[E.id]}),user:e(t,{fields:[d.userId],references:[t.id]}),media:e(l,{fields:[d.submissionMediaId],references:[l.id]})})),qi=drizzleOrm.relations(g,({one:e,many:s})=>({mentor:e(t,{fields:[g.mentorId],references:[t.id]}),registrations:s(q)})),Ci=drizzleOrm.relations(q,({one:e})=>({user:e(t,{fields:[q.userId],references:[t.id]}),class:e(g,{fields:[q.classId],references:[g.id]})})),Si=drizzleOrm.relations(b,({one:e})=>({user:e(t,{fields:[b.userId],references:[t.id]})}));exports.accounts=m;exports.accountsRelation=ni;exports.accountsRoleEnum=ie;exports.activities=Yt;exports.assignmentsProfil=E;exports.assignmentsProfilRelation=Ni;exports.attendanceStatusEnum=me;exports.attendances=O;exports.attendancesRelation=pi;exports.classEnum=de;exports.classRegistrations=q;exports.classRegistrationsRelation=Ci;exports.classes=g;exports.classesRelation=qi;exports.createUserRankingViewIndexes=Ht;exports.endpointAnalytics=b;exports.endpointAnalyticsRelation=Si;exports.media=l;exports.mediaBucketEnum=oe;exports.mediaRelation=_i;exports.profilKATs=_;exports.profilKATsRelation=Ei;exports.questionAnswerOptions=D;exports.questionAnswerOptionsRelation=gi;exports.questionTypeEnum=Ce;exports.questions=N;exports.questionsRelation=ci;exports.refreshUserRankingView=Xt;exports.stageStatusEnum=Ne;exports.stages=n;exports.stagesRelation=fi;exports.submissionsProfil=d;exports.submissionsProfilRelation=Ai;exports.userAttendance=S;exports.userAttendanceRelation=di;exports.userRankingView=Dt;exports.userStageProgress=w;exports.userStageProgressRelation=mi;exports.users=t;exports.usersRelation=ui;