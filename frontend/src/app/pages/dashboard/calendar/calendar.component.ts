import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-calendar',
  template: `<p>Calendar Page</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {}
