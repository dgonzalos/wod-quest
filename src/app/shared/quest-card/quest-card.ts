import { Component, input } from '@angular/core';
import type { Quest } from '../../core/models';

@Component({
  imports: [],
  selector: 'app-quest-card',
  styleUrl: './quest-card.css',
  templateUrl: './quest-card.html',
})
export class QuestCard {
  readonly quest = input.required<Quest>();
}
