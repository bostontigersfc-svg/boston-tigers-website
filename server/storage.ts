import {
  type User,
  type InsertUser,
  type Registration,
  type InsertRegistration,
  type PendingRegistration,
  type InsertPendingRegistration,
  type EliteApplication,
  type InsertEliteApplication,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { registrations, pendingRegistrations, eliteApplications } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createRegistration(reg: InsertRegistration): Promise<Registration>;
  getAllRegistrations(): Promise<Registration[]>;
  createPendingRegistration(reg: InsertPendingRegistration): Promise<PendingRegistration>;
  getPendingBySessionId(sessionId: string): Promise<PendingRegistration | undefined>;
  deletePendingRegistration(id: number): Promise<void>;
  getRegistrationBySessionId(sessionId: string): Promise<Registration | undefined>;
  deleteRegistration(id: number): Promise<void>;
  createEliteApplication(app: InsertEliteApplication): Promise<EliteApplication>;
  getAllEliteApplications(): Promise<EliteApplication[]>;
  deleteEliteApplication(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createRegistration(reg: InsertRegistration): Promise<Registration> {
    const [created] = await db.insert(registrations).values(reg).returning();
    return created;
  }

  async getAllRegistrations(): Promise<Registration[]> {
    return await db.select().from(registrations).orderBy(registrations.submittedAt);
  }

  async createPendingRegistration(reg: InsertPendingRegistration): Promise<PendingRegistration> {
    const [created] = await db.insert(pendingRegistrations).values(reg).returning();
    return created;
  }

  async getPendingBySessionId(sessionId: string): Promise<PendingRegistration | undefined> {
    const [found] = await db
      .select()
      .from(pendingRegistrations)
      .where(eq(pendingRegistrations.stripeSessionId, sessionId));
    return found;
  }

  async deletePendingRegistration(id: number): Promise<void> {
    await db.delete(pendingRegistrations).where(eq(pendingRegistrations.id, id));
  }

  async getRegistrationBySessionId(sessionId: string): Promise<Registration | undefined> {
    const [found] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.stripeSessionId, sessionId));
    return found;
  }

  async deleteRegistration(id: number): Promise<void> {
    await db.delete(registrations).where(eq(registrations.id, id));
  }

  async createEliteApplication(app: InsertEliteApplication): Promise<EliteApplication> {
    const [created] = await db.insert(eliteApplications).values(app).returning();
    return created;
  }

  async getAllEliteApplications(): Promise<EliteApplication[]> {
    return await db.select().from(eliteApplications).orderBy(eliteApplications.submittedAt);
  }

  async deleteEliteApplication(id: number): Promise<void> {
    await db.delete(eliteApplications).where(eq(eliteApplications.id, id));
  }
}

export const storage = new MemStorage();
