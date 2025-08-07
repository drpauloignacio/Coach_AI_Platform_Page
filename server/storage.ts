import { type User, type InsertUser, type Task, type InsertTask, type Reward, type InsertReward } from "@shared/schema";
import { type UserRole, type LifeStage } from "@shared/types";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserRole(id: string, role: UserRole): Promise<User | undefined>;
  getUsersByRole(role: UserRole): Promise<User[]>;
  
  getTask(id: string): Promise<Task | undefined>;
  getTasksByRole(role: UserRole): Promise<Task[]>;
  getTasksByLifeStage(lifeStage: LifeStage): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  
  getReward(id: string): Promise<Reward | undefined>;
  getRewardsByCategory(category: 'home' | 'football' | 'fan_experience'): Promise<Reward[]>;
  createReward(reward: InsertReward): Promise<Reward>;
  updateRewardInventory(id: string, inventory: number): Promise<Reward | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private tasks: Map<string, Task>;
  private rewards: Map<string, Reward>;

  constructor() {
    this.users = new Map();
    this.tasks = new Map();
    this.rewards = new Map();
    this.seedDefaultData();
  }

  private seedDefaultData() {
    // Set default userRole for existing users where fatherId is not null
    // This would typically be done via a migration in a real database
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
    const user: User = { 
      ...insertUser, 
      id,
      userRole: insertUser.userRole || 'father',
      fatherId: insertUser.fatherId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserRole(id: string, role: UserRole): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      const updatedUser = { ...user, userRole: role, updatedAt: new Date() };
      this.users.set(id, updatedUser);
      return updatedUser;
    }
    return undefined;
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user.userRole === role);
  }

  async getTask(id: string): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async getTasksByRole(role: UserRole): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(task => task.targetRole === role);
  }

  async getTasksByLifeStage(lifeStage: LifeStage): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(task => task.lifeStage === lifeStage);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = randomUUID();
    const task: Task = {
      ...insertTask,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.set(id, task);
    return task;
  }

  async getReward(id: string): Promise<Reward | undefined> {
    return this.rewards.get(id);
  }

  async getRewardsByCategory(category: 'home' | 'football' | 'fan_experience'): Promise<Reward[]> {
    return Array.from(this.rewards.values()).filter(reward => reward.category === category);
  }

  async createReward(insertReward: InsertReward): Promise<Reward> {
    const id = randomUUID();
    const reward: Reward = {
      ...insertReward,
      id,
      inventory: insertReward.inventory || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.rewards.set(id, reward);
    return reward;
  }

  async updateRewardInventory(id: string, inventory: number): Promise<Reward | undefined> {
    const reward = this.rewards.get(id);
    if (reward) {
      const updatedReward = { ...reward, inventory, updatedAt: new Date() };
      this.rewards.set(id, updatedReward);
      return updatedReward;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
