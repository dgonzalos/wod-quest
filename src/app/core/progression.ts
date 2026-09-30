import type { Quest } from './models';

export const XP_PER_QUEST = 100;
export const XP_PER_LEVEL = 300;

export function calculateXp(quests: Quest[]): number {
  return quests.filter((quest) => quest.state === 'completed').length * XP_PER_QUEST;
}

export function calculateLevel(xp: number): number {
  return 1 + Math.floor(xp / XP_PER_LEVEL);
}
