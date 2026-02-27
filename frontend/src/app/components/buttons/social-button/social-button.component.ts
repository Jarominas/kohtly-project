import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-social-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block flex-1',
  },
  template: `
    <button
      type="button"
      class="flex w-full items-center justify-center rounded-lg border border-surface-50 bg-surface-0 py-3 text-surface-900 transition-colors hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-0 dark:hover:bg-surface-800"
    >
      <i [class]="icon() + ' text-lg'"></i>
    </button>
  `,
})
export class SocialButtonComponent {
  icon = input.required<string>();
}
