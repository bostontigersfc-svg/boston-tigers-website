import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  parentName: text("parent_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  childName: text("child_name").notNull(),
  childAge: text("child_age").notNull(),
  soccerExperience: text("soccer_experience").notNull(),
  emergencyContact: text("emergency_contact").notNull(),
  paymentMethod: text("payment_method"),
  planType: text("plan_type"),
  paid: boolean("paid").default(false),
  stripeSessionId: text("stripe_session_id"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  submittedAt: true,
});

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;

export const pendingRegistrations = pgTable("pending_registrations", {
  id: serial("id").primaryKey(),
  parentName: text("parent_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  childName: text("child_name").notNull(),
  childAge: text("child_age").notNull(),
  soccerExperience: text("soccer_experience").notNull(),
  emergencyContact: text("emergency_contact").notNull(),
  planType: text("plan_type"),
  stripeSessionId: text("stripe_session_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPendingRegistrationSchema = createInsertSchema(pendingRegistrations).omit({
  id: true,
  createdAt: true,
});

export type InsertPendingRegistration = z.infer<typeof insertPendingRegistrationSchema>;
export type PendingRegistration = typeof pendingRegistrations.$inferSelect;

export const eliteApplications = pgTable("elite_applications", {
  id: serial("id").primaryKey(),
  playerName: text("player_name").notNull(),
  playerAge: text("player_age").notNull(),
  grade: text("grade").notNull(),
  highSchool: text("high_school").notNull(),
  currentTeam: text("current_team").notNull(),
  primaryPosition: text("primary_position").notNull(),
  secondaryPosition: text("secondary_position"),
  dominantFoot: text("dominant_foot").notNull(),
  parentName: text("parent_name").notNull(),
  parentEmail: text("parent_email").notNull(),
  parentPhone: text("parent_phone").notNull(),
  yearsPlaying: text("years_playing").notNull(),
  goalLevel: text("goal_level").notNull(),
  improveArea: text("improve_area").notNull(),
  highlightVideo: text("highlight_video"),
  whyJoin: text("why_join").notNull(),
  acceptedCommitment: boolean("accepted_commitment").notNull().default(false),
  acceptedWaiver: boolean("accepted_waiver").notNull().default(false),
  acceptedGuardian: boolean("accepted_guardian").notNull().default(false),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertEliteApplicationSchema = createInsertSchema(eliteApplications).omit({
  id: true,
  submittedAt: true,
});

export type InsertEliteApplication = z.infer<typeof insertEliteApplicationSchema>;
export type EliteApplication = typeof eliteApplications.$inferSelect;
