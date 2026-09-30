import type { Quest, QuestState } from './models';
import { calculateXp } from './progression';
import { completeQuest } from './quests';

function quest(id: string, state: QuestState): Quest {
  return { id, title: id, originalWod: '-', state };
}

describe('completeQuest', () => {
  it('marks the quest with that id as completed and leaves the rest as they were', () => {
    const quests = [quest('a', 'pending'), quest('b', 'pending')];

    const result = completeQuest(quests, 'a');

    expect(result.map((q) => q.state)).toEqual(['completed', 'pending']);
  });

  it('returns a new array and a new object, without mutating the input', () => {
    const quests = [quest('a', 'pending'), quest('b', 'pending')];

    const result = completeQuest(quests, 'a');

    expect(result).not.toBe(quests);
    expect(result[0]).not.toBe(quests[0]);
    expect(quests[0].state).toBe('pending');
  });

  it('keeps the same reference for the quests that did not change', () => {
    const quests = [quest('a', 'pending'), quest('b', 'pending')];

    const result = completeQuest(quests, 'a');

    expect(result[1]).toBe(quests[1]);
  });

  it('changes no state when the id does not exist', () => {
    const quests = [quest('a', 'pending'), quest('b', 'completed')];

    expect(completeQuest(quests, 'missing')).toEqual(quests);
  });

  it('does not add extra XP when the same quest is completed twice', () => {
    const quests = [quest('a', 'pending'), quest('b', 'pending')];

    const once = completeQuest(quests, 'a');
    const twice = completeQuest(once, 'a');

    expect(calculateXp(twice)).toBe(calculateXp(once));
  });
});
