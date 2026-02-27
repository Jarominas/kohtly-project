import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-statistics',
  template: `<p>Statistics Page</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent {}
