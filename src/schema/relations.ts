import { relations } from 'drizzle-orm';

// Import all tables
import { accounts, emailVerificationOtps, users } from './auth';
import { handbook, media } from './media';
import {
  attendances,
  userAttendance,
  profilKATAttendances,
  itbGuesserOptions,
  itbGuesserSubmissions,
  memoryGameScores,
  userPersonality,
} from './engagement';
import {
  stages,
  userStageProgress,
  questions,
  questionAnswerOptions,
  profilKATs,
  assignmentsProfil,
  submissionsProfil,
} from './profil-kat';
import { endpointAnalytics } from './analytics';
import { classes, classRegistrations } from './class';
import { activities } from './rundown';
import { verificationToken } from './auth/verificationToken';
import { messages, userMatches } from './chat';

// Auth Relations
export const accountsRelation = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.id],
    references: [users.id],
  }),
}));

export const usersRelation = relations(users, ({ one, many }) => ({
  account: one(accounts, {
    fields: [users.id],
    references: [accounts.id],
  }),
  fotoMedia: one(media, {
    fields: [users.fotoMediaId],
    references: [media.id],
  }),
  stageProgress: many(userStageProgress),
  attendance: many(userAttendance),
  submissions: many(submissionsProfil),
  createdMedia: many(media),
  analytics: many(endpointAnalytics),
  classRegistrations: many(classRegistrations),
  userMatchesAsFirstUser: many(userMatches, { relationName: 'first_user' }),
  userMatchesAsSecondUser: many(userMatches, { relationName: 'second_user' }),
  messages: many(messages, { relationName: 'sender' }),
  itbGuesserSubmissions: many(itbGuesserSubmissions),
  memoryGameScore: one(memoryGameScores),
  personality: one(userPersonality),
}));

export const emailVerificationOtpsRelations = relations(
  emailVerificationOtps,
  ({ one }) => ({
    user: one(users, {
      fields: [emailVerificationOtps.userId],
      references: [users.id],
    }),
  }),
);

export const verificationTokenRelations = relations(
  verificationToken,
  ({ one }) => ({
    user: one(users, {
      fields: [verificationToken.identifier],
      references: [users.email],
    }),
  }),
);

// Media Relations
export const mediaRelation = relations(media, ({ one, many }) => ({
  creator: one(users, {
    fields: [media.creatorId],
    references: [users.id],
  }),
  handbook: one(handbook, {
    fields: [media.id],
    references: [handbook.mediaId],
  }),
  submissions: many(submissionsProfil),
  itbGuesserOptions: many(itbGuesserOptions),
}));

// Engagement Relations
export const attendancesRelation = relations(attendances, ({ many }) => ({
  userAttendance: many(userAttendance),
  profilKATAttendances: many(profilKATAttendances),
}));

export const userAttendanceRelation = relations(userAttendance, ({ one }) => ({
  attendance: one(attendances, {
    fields: [userAttendance.scheduleId],
    references: [attendances.id],
  }),
  user: one(users, {
    fields: [userAttendance.userId],
    references: [users.id],
  }),
}));

export const profilKATAttendancesRelation = relations(
  profilKATAttendances,
  ({ one }) => ({
    profilKAT: one(profilKATs, {
      fields: [profilKATAttendances.profilKATId],
      references: [profilKATs.id],
    }),
    attendance: one(attendances, {
      fields: [profilKATAttendances.attendanceId],
      references: [attendances.id],
    }),
  }),
);

// Learning Relations
export const stagesRelation = relations(stages, ({ many, one }) => ({
  userProgress: many(userStageProgress),
  questions: many(questions),
  profil: one(profilKATs, {
    fields: [stages.profilId],
    references: [profilKATs.id],
  }),
}));

export const userStageProgressRelation = relations(
  userStageProgress,
  ({ one }) => ({
    user: one(users, {
      fields: [userStageProgress.userId],
      references: [users.id],
    }),
    stage: one(stages, {
      fields: [userStageProgress.stageId],
      references: [stages.id],
    }),
  }),
);

export const questionsRelation = relations(questions, ({ one, many }) => ({
  stage: one(stages, {
    fields: [questions.stageId],
    references: [stages.id],
  }),
  answerOptions: many(questionAnswerOptions),
}));

export const questionAnswerOptionsRelation = relations(
  questionAnswerOptions,
  ({ one }) => ({
    question: one(questions, {
      fields: [questionAnswerOptions.questionId],
      references: [questions.id],
    }),
  }),
);

export const profilKATsRelation = relations(profilKATs, ({ many, one }) => ({
  assignments: many(assignmentsProfil),
  attendances: many(profilKATAttendances),
  stage: one(stages, {
    fields: [profilKATs.id],
    references: [stages.profilId],
  }),
}));

export const assignmentsProfilRelation = relations(
  assignmentsProfil,
  ({ many, one }) => ({
    submissions: many(submissionsProfil),
    profil: one(profilKATs, {
      fields: [assignmentsProfil.profilKATId],
      references: [profilKATs.id],
    }),
  }),
);

export const submissionsProfilRelation = relations(
  submissionsProfil,
  ({ one }) => ({
    assignment: one(assignmentsProfil, {
      fields: [submissionsProfil.assignmentId],
      references: [assignmentsProfil.id],
    }),
    user: one(users, {
      fields: [submissionsProfil.userId],
      references: [users.id],
    }),
    media: one(media, {
      fields: [submissionsProfil.submissionMediaId],
      references: [media.id],
    }),
  }),
);

// Classes Relations
export const classesRelation = relations(classes, ({ one, many }) => ({
  registrations: many(classRegistrations),
}));

export const classRegistrationsRelation = relations(
  classRegistrations,
  ({ one }) => ({
    user: one(users, {
      fields: [classRegistrations.userId],
      references: [users.id],
    }),
    class: one(classes, {
      fields: [classRegistrations.classId],
      references: [classes.id],
    }),
  }),
);

// Analytics Relations
export const endpointAnalyticsRelation = relations(
  endpointAnalytics,
  ({ one }) => ({
    user: one(users, {
      fields: [endpointAnalytics.userId],
      references: [users.id],
    }),
  }),
);

export const userMatchesRelations = relations(userMatches, ({ many, one }) => ({
  firstUser: one(users, {
    fields: [userMatches.firstUserId],
    references: [users.id],
    relationName: 'first_user',
  }),
  secondUser: one(users, {
    fields: [userMatches.secondUserId],
    references: [users.id],
    relationName: 'second_user',
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  senderId: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: 'sender',
  }),
  userMatch: one(userMatches, {
    fields: [messages.userMatchId],
    references: [userMatches.id],
  }),
}));

export const itbGuesserSubmissionsRelations = relations(
  itbGuesserSubmissions,
  ({ one }) => ({
    user: one(users, {
      fields: [itbGuesserSubmissions.userId],
      references: [users.id],
    }),
  }),
);
