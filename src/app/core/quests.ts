import type { Quest } from './models';

export function completeQuest(quests: Quest[], id: string): Quest[] {
  return quests.map((quest) => (quest.id === id ? { ...quest, state: 'completed' } : quest));
}
