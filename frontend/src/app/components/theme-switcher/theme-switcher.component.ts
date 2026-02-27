import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule, ToggleSwitchModule],
  template: `
    <div class="flex items-center gap-2 text-sm" [class]="styleClass()">
      @if (showLabel()) {
        <span class="text-[var(--p-text-color)]">{{ themeLabel() }}</span>
      }
      <p-toggleswitch
        [ngModel]="themeService.isDarkMode()"
        (ngModelChange)="themeService.setTheme($event)"
        [inputId]="inputId()"
        ariaLabel="Toggle theme"
      ></p-toggleswitch>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  protected readonly themeService = inject(ThemeService);

  readonly showLabel = input<boolean>(true);
  readonly styleClass = input<string>('');
  readonly inputId = input<string>('theme-toggle');

  protected readonly themeLabel = computed(() =>
    this.themeService.isDarkMode() ? 'Dark' : 'Light',
  );
}
