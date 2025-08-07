import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  userRole: text("user_role").$type<'father' | 'family_friend' | 'fan'>().default('father'),
  fatherId: varchar("father_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  icon: text("icon").notNull(),
  taskTitle: text("task_title").notNull(),
  xpPoints: integer("xp_points").notNull(),
  avgCompletionMin: integer("avg_completion_min").notNull(),
  categoryColor: text("category_color").notNull(),
  category: text("category").notNull(),
  whatsappMessage: text("whatsapp_message").notNull(),
  goal: text("goal").notNull(),
  whyItMatters: text("why_it_matters").notNull(),
  lifeYearsCredit: text("life_years_credit").notNull(),
  targetRole: text("target_role").$type<'father' | 'family_friend' | 'fan'>().notNull(),
  lifeStage: text("life_stage").$type<'pregnancy' | '0-6m' | '6-12m' | '12-24m' | '24m+'>().notNull(),
  rewardId: varchar("reward_id").references(() => rewards.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const rewards = pgTable("rewards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").$type<'home' | 'football' | 'fan_experience'>().notNull(),
  ptsCost: integer("pts_cost").notNull(),
  inventory: integer("inventory").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  userRole: true,
  fatherId: true,
});

export const insertTaskSchema = createInsertSchema(tasks);
export const insertRewardSchema = createInsertSchema(rewards);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertReward = z.infer<typeof insertRewardSchema>;
export type Reward = typeof rewards.$inferSelect;

// Legacy exports for backward compatibility
export type { User as UserType };
export type { Task as TaskType };
export type { Reward as RewardType };

// Create relations
export const usersRelations = {
  father: {
    relation: "one",
    fields: [users.fatherId],
    references: [users.id],
  },
  children: {
    relation: "many",
    fields: [users.id],
    references: [users.fatherId],
  },
};

export const tasksRelations = {
  reward: {
    relation: "one", 
export const rewardsRelations = {
  tasks: {
    relation: "many",
    fields: [rewards.id], 
    references: [tasks.rewardId],
  },
};
