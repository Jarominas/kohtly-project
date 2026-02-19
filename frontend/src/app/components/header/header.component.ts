import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

interface HeaderLink {
  readonly label: string;
  readonly href: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, ToggleSwitchModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly links: HeaderLink[] = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ];

  protected readonly isMenuOpen = signal(false);
  protected readonly isDarkMode = signal(false);

  protected readonly themeLabel = computed(() => (this.isDarkMode() ? 'Dark' : 'Light'));
  protected readonly menuButtonIcon = computed(() =>
    this.isMenuOpen() ? 'pi pi-times' : 'pi pi-bars',
  );

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

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
