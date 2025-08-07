export type UserRole = 'father' | 'family_friend' | 'fan';
export type LifeStage = 'pregnancy' | '0-6m' | '6-12m' | '12-24m' | '24m+';

export interface Task {
  id: string;
  icon: string;
  taskTitle: string;
  xpPoints: number;
  avgCompletionMin: number;
  categoryColor: string;
  category: string;
  whatsappMessage: string;
  goal: string;
  whyItMatters: string;
  lifeYearsCredit: string;
  targetRole: UserRole;
  lifeStage: LifeStage;
  rewardId?: string;
}

export interface Reward {
  id: string;
  title: string;
  category: 'home' | 'football' | 'fan_experience';
  ptsCost: number;
  inventory: number;
}