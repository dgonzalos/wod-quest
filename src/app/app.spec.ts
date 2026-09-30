import { TestBed } from '@angular/core/testing';
import { within } from '@testing-library/dom';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme-preference');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the WOD Quest title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('WOD Quest');
  });

  it('should render the faction label, not its code', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const dl = compiled.querySelector('dl')?.textContent;
    expect(dl).toContain('Alianza');
    expect(dl).not.toContain('alliance');
  });

  it('should render a single list with one item per quest', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const lists = compiled.querySelectorAll('ul');
    expect(lists).toHaveLength(1);
    expect(lists[0].querySelectorAll(':scope > li')).toHaveLength(3);
  });

  it('renders with the dark theme on button press', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const view = within(fixture.nativeElement as HTMLElement);

    const darkButton = view.getByRole('button', { name: 'Oscuro' });
    darkButton.click();
    await fixture.whenStable();
    expect(darkButton.getAttribute('aria-pressed')).toBe('true');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should add 100 XP and hide the button when a quest is completed', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const view = within(fixture.nativeElement as HTMLElement);
    expect(valueOf(view, 'XP')).toBe('100');

    view.getByRole('button', { name: 'Completar Grace' }).click();
    await fixture.whenStable();

    expect(valueOf(view, 'XP')).toBe('200');
    expect(view.queryByRole('button', { name: 'Completar Grace' })).toBeNull();
    expect(view.getByRole('button', { name: 'Completar Isabel' })).toBeTruthy();
  });

  it('should reach level 2 after completing Grace and Isabel', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const view = within(fixture.nativeElement as HTMLElement);
    expect(valueOf(view, 'Nivel')).toBe('1');

    view.getByRole('button', { name: 'Completar Grace' }).click();
    view.getByRole('button', { name: 'Completar Isabel' }).click();
    await fixture.whenStable();

    expect(valueOf(view, 'XP')).toBe('300');
    expect(valueOf(view, 'Nivel')).toBe('2');
  });
});

/** Reads the <dd> that follows a <dt> in the character summary. */
function valueOf(view: ReturnType<typeof within>, term: string): string | undefined {
  return view.getByText(term).nextElementSibling?.textContent?.trim();
}
