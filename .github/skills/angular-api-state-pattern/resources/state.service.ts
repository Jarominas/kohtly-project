import { computed, inject, Injectable, signal } from "@angular/core";
import { Observable, tap, finalize } from "rxjs";
import { ApiService, ApiData } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class StateService {
  private readonly apiService = inject(ApiService);

  // Private mutable state signals
  private readonly _items = signal<ApiData[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // Public readonly signals for View consumption
  readonly items = this._items.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Derived state (Computed)
  readonly itemCount = computed(() => this._items().length);
  readonly hasError = computed(() => !!this._error());
  readonly isEmpty = computed(() => !this._loading() && this.itemCount() === 0);

  // State update methods (Encapsulated)
  private setItems(data: ApiData[]): void {
    this._items.set(data);
    this._error.set(null);
  }

  private setLoading(loading: boolean): void {
    this._loading.set(loading);
  }

  private setError(errorMessage: string): void {
    this._error.set(errorMessage);
    this._items.set([]); // Optional: clear data on error
  }

  // Action methods
  loadData(): Observable<ApiData[]> {
    // Prevent double loading or optional cache check could go here
    this.setLoading(true);

    return this.apiService.getData().pipe(
      tap({
        next: (data) => {
          this.setItems(data);
        },
        error: (err) => {
          this.setError(err.message || "Failed to load data");
        },
        finalize: () => {
          // Note: finalize runs on both success and error
          this.setLoading(false);
        },
      }),
    );
  }
}
