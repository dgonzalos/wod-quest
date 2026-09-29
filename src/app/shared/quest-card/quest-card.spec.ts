import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { Quest } from '../../core/models';
import { QuestCard } from './quest-card';

describe('QuestCard', () => {
  let fixture: ComponentFixture<QuestCard>;

  const pendingQuest: Quest = {
    id: 'grace',
    title: 'Grace',
    originalWod: '30 Clean and Jerks for time',
    state: 'pending',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestCard],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestCard);
    fixture.componentRef.setInput('quest', pendingQuest);
    await fixture.whenStable();
  });

  it('should render the quest title, WOD and pending state', () => {
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('h3')?.textContent).toContain('Grace');
    expect(el.querySelector('p')?.textContent).toContain('30 Clean and Jerks for time');
    expect(el.textContent).toContain('Pendiente');
    expect(el.textContent).not.toContain('Completada');
    expect(el.querySelector('article')?.classList).not.toContain('completed');
  });

  it('should render the completed state', async () => {
    fixture.componentRef.setInput('quest', { ...pendingQuest, state: 'completed' });
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('Completada');
    expect(el.textContent).not.toContain('Pendiente');
    expect(el.querySelector('article')?.classList).toContain('completed');
  });
});
