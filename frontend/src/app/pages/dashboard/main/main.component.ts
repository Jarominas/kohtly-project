import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-main',
  template: `<p>Home Page</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
