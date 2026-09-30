import { effect, inject, Service, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type ThemePreference = 'light' | 'dark' | 'system';

@Service()
export class Theme {
  private readonly document = inject(DOCUMENT);
  private readonly _preference = signal<ThemePreference>(this.readStoredPreference());
  readonly preference = this._preference.asReadonly();

  constructor() {
    effect(() => {
      const preference = this._preference();
      const root = this.document.documentElement;

      if (preference === 'system') {
        root.removeAttribute('data-theme');
      } else {
        root.setAttribute('data-theme', preference);
      }
      try {
        window.localStorage.setItem('theme-preference', preference);
      } catch {
        console.error('Failed to save theme preference to localStorage');
      }
    });
  }

  setPreference(preference: ThemePreference): void {
    this._preference.set(preference);
  }

  private readStoredPreference(): ThemePreference {
    try {
      const storedPreference = window.localStorage.getItem('theme-preference');
      if (
        storedPreference === 'light' ||
        storedPreference === 'dark' ||
        storedPreference === 'system'
      ) {
        return storedPreference;
      }
    } catch {
      console.error('Failed to access localStorage');
    }
    return 'system';
  }
}
