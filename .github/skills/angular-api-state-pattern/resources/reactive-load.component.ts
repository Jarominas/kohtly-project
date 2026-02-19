import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  effect,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { StateService } from "./state.service";

@Component({
  selector: "app-reactive-load",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./reactive-load.component.html",
  styleUrl: "./reactive-load.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveLoadComponent {
  private stateService = inject(StateService);

  // Input could be a route parameter or a filter passed from a parent
  filterId = input<number>(0);

  // Expose signals to the template
  items = this.stateService.items;
  loading = this.stateService.loading;
  error = this.stateService.error;
  itemCount = this.stateService.itemCount;

  constructor() {
    // Automatically re-load data whenever filterId changes
    effect(() => {
      // In a real app, you would pass this.filterId() to the load function
      // For this example, we just re-trigger the load
      console.log("Reloading due to filter change:", this.filterId());
      // Subscribe to trigger the side-effect (loading data)
      this.stateService.loadData().subscribe();
    });
  }

  refresh() {
    this.stateService.loadData();
  }
}
