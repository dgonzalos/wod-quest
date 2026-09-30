import type { Quest, QuestState } from './models';
import { calculateLevel, calculateXp } from './progression';

function quest(id: string, state: QuestState): Quest {
  return { id, title: id, originalWod: '-', state };
}

describe('calculateXp', () => {
  it('returns 0 XP when there are no quests', () => {
    expect(calculateXp([])).toBe(0);
  });

  it('returns 0 XP when no quest is completed', () => {
    expect(calculateXp([quest('a', 'pending'), quest('b', 'pending')])).toBe(0);
  });

  it('returns 100 XP per completed quest, ignoring pending ones', () => {
    const quests = [quest('a', 'completed'), quest('b', 'completed'), quest('c', 'pending')];

    expect(calculateXp(quests)).toBe(200);
  });
});

describe('calculateLevel', () => {
  it('returns level 1 at 0 XP', () => {
    expect(calculateLevel(0)).toBe(1);
  });

  it('returns level 1 at 299 XP', () => {
    expect(calculateLevel(299)).toBe(1);
  });

  it('returns level 2 at 300 XP', () => {
    expect(calculateLevel(300)).toBe(2);
  });
});
