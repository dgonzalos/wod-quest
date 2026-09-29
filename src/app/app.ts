import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FACTION_LABELS, type Character, type Quest } from './core/models';
import { QuestCard } from './shared/quest-card/quest-card';

@Component({
  imports: [RouterOutlet, QuestCard],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('WOD Quest');
  protected readonly factionLabels = FACTION_LABELS;
  protected readonly character: Character = {
    name: 'Kaeron',
    faction: 'alliance',
  };
  protected readonly xp = 100;
  protected readonly level = 1 + Math.floor(this.xp / 300);
  protected readonly quests: Quest[] = [
    { id: 'grace', title: 'Grace', originalWod: '30 Clean and Jerks for time', state: 'pending' },
    { id: 'isabel', title: 'Isabel', originalWod: '30 Snatches for time', state: 'pending' },
    { id: 'fran', title: 'Fran', originalWod: '21-15-9 thrusters y pull-ups', state: 'completed' },
  ];
}
