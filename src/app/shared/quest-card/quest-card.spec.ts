import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { Quest } from '../../core/models';
import { QuestCard } from './quest-card';
import { within } from '@testing-library/dom';

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

  it('should emit the complete event when the button is clicked', async () => {
    const spy = vi.fn();
    fixture.componentInstance.complete.subscribe(spy);
    const card = within(fixture.nativeElement as HTMLElement);

    const button = card.getByRole('button', { name: 'Completar Grace' });
    button.click();
    expect(spy).toHaveBeenCalledWith('grace');
  });

  it('should not render the button when the quest is completed', async () => {
    fixture.componentRef.setInput('quest', { ...pendingQuest, state: 'completed' });
    await fixture.whenStable();
    const card = within(fixture.nativeElement as HTMLElement);

    const button = card.queryByRole('button', { name: 'Completar Grace' });
    expect(button).toBeNull();
  });

  it('should render the button when the quest is pending', async () => {
    fixture.componentRef.setInput('quest', pendingQuest);
    await fixture.whenStable();

    const card = within(fixture.nativeElement as HTMLElement);
    const button = card.getByRole('button', { name: 'Completar Grace' });
    expect(button).not.toBeNull();
  });
});
