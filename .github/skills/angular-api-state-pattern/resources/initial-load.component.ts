import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { StateService } from "./state.service";

@Component({
  selector: "app-initial-load",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./initial-load.component.html",
  styleUrl: "./initial-load.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureComponent implements OnInit {
  private stateService = inject(StateService);

  // Expose signals to the template
  items = this.stateService.items;
  loading = this.stateService.loading;
  error = this.stateService.error;
  itemCount = this.stateService.itemCount;

  ngOnInit() {
    // Trigger initial data load
    // We MUST subscribe because loadData returns a cold Observable
    this.stateService.loadData().subscribe();
  }

  refresh() {
    this.stateService.loadData();
  }
}
