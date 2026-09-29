export type QuestState = 'pending' | 'completed';

export type Faction = 'alliance' | 'horde';

export const FACTION_LABELS: Record<Faction, string> = {
  alliance: 'Alianza',
  horde: 'Horda',
};

export interface Character {
  name: string;
  faction: Faction;
}

export interface Quest {
  id: string;
  title: string;
  originalWod: string;
  state: QuestState;
}
