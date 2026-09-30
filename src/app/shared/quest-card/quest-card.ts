import { Component, input, output, computed } from '@angular/core';
import type { Quest } from '../../core/models';

@Component({
  imports: [],
  selector: 'app-quest-card',
  styleUrl: './quest-card.css',
  templateUrl: './quest-card.html',
})
export class QuestCard {
  readonly quest = input.required<Quest>();
  readonly complete = output<string>();
  readonly isCompleted = computed(() => this.quest().state === 'completed');

  markComplete() {
    this.complete.emit(this.quest().id);
  }
}
