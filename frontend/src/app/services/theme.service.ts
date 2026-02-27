import { Injectable, PLATFORM_ID, inject, signal, effect } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isDarkMode = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      const isDark = this.isDarkMode();
      this.document.documentElement.classList.toggle('app-dark', isDark);
      this.document.body.classList.toggle('app-dark', isDark);
    });
  }

  toggleTheme() {
    this.isDarkMode.update((dark) => !dark);
  }

  setTheme(isDark: boolean) {
    this.isDarkMode.set(isDark);
  }
}
