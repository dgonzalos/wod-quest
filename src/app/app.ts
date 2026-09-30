import { Component, computed, inject, signal } from '@angular/core';
import { completeQuest } from './core/quests';
import { RouterOutlet } from '@angular/router';
import { FACTION_LABELS, type Character, type Quest } from './core/models';
import { QuestCard } from './shared/quest-card/quest-card';
import { Theme } from './core/theme';
import { calculateLevel, calculateXp } from './core/progression';

@Component({
  imports: [RouterOutlet, QuestCard],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('WOD Quest');
  protected readonly quests = signal<Quest[]>([
    { id: 'grace', title: 'Grace', originalWod: '30 Clean and Jerks for time', state: 'pending' },
    { id: 'isabel', title: 'Isabel', originalWod: '30 Snatches for time', state: 'pending' },
    { id: 'fran', title: 'Fran', originalWod: '21-15-9 thrusters y pull-ups', state: 'completed' },
  ]);
  protected readonly factionLabels = FACTION_LABELS;
  protected readonly character: Character = {
    name: 'Kaeron',
    faction: 'alliance',
  };

  protected readonly xp = computed(() => calculateXp(this.quests()));
  protected readonly level = computed(() => calculateLevel(this.xp()));
  protected completeQuest(id: string) {
    this.quests.update((quests) => completeQuest(quests, id));
  }

  protected readonly theme = inject(Theme);
}
