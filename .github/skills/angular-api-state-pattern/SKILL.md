---
name: Angular API State Pattern
description: A best-practice pattern for handling API interactions and state management in Angular using Services and Signals.
---

# Angular API State Pattern Skill

This skill defines a robust architecture for fetching data from an API, managing the state of that data (loading, error, success) using Signals, and displaying it in a component.

## Architecture Overview

1.  **API Service**: Responsible _only_ for making HTTP requests. It returns `Observable`s.
2.  **State Service**: Responsible for holding application/feature state using `Signal`s. It injects the API Service, subscribes to Observables, and updates its Signals.
3.  **Component**: Responsible for the View. It injects the State Service and reads Signals. It uses `OnPush` change detection and generally does not manually subscribe to Observables.

## Usage Steps

### 1. Create API Service

Create a service (e.g., `feature-api.service.ts`) dedicated to HTTP calls.
Reference `resources/api.service.ts` for the implementation pattern.

- Inject `HttpClient`.
- Return `Observable<T>`.
- Do not store state here.

### 2. Create State Service

Create a service (e.g., `feature-state.service.ts`) to manage the state.
Reference `resources/state.service.ts` for the implementation pattern.

- **State Signals**: Define private `writableSignal` for each piece of state (`_data`, `_loading`, `_error`).
- **Readonly Signals**: Expose them as public `readonly` signals (`data = this._data.asReadonly()`).
- **Computed**: Use `computed()` for derived values.
- **Setters**: Create private methods to update state (e.g., `setLoading`, `setError`).
- **Actions**: Implement methods (e.g., `loadData`) that return `Observable`.
  - Use `.pipe(tap({ next, error, finalize }))` to manage state side-effects.
  - Do NOT subscribe inside the service unless absolutely necessary (prefer returning Observable for smart components to subscribe via async or effects, OR use `takeUntilDestroyed` in constructor if auto-loading).

### 3. Create Component (Pattern A: Initial Load)

Use this pattern for pages that load data once on entry (e.g., Home Page, Dashboard).
Reference `resources/initial-load.component.ts`.

- Inject the State Service.
- Call `this.state.loadData()` in `ngOnInit`.
- **Why ngOnInit?**: It ensures inputs are initialized before data loading starts.

### 4. Create Component (Pattern B: Reactive Load)

Use this pattern for components where data depends on changing inputs (e.g., Search, Pagination, Filters).
Reference `resources/reactive-load.component.ts`.

- Inject the State Service.
- Use `effect()` in the `constructor`.
- Inside the effect, call `this.state.loadData(this.myInput())`.
- **Why effect?**: It automatically re-runs whenever the dependent signals change, keeping data in sync.

### 5. Create Template

Reference `resources/initial-load.component.html` or `resources/reactive-load.component.html`.

- Use Angular's control flow (`@if`, `@for`).
- Read signals by calling them as functions: `items()`, `loading()`.

## Best Practices

- **Separation of Concerns**: API logic is separate from State logic, which is separate from UI logic.
- **Signals for State**: Using signals makes the state reactive and granual updates efficient.
- **OnPush**: Always use `OnPush` in components to minimize change detection cycles.
- **Error Handling**: Handle errors in the State Service (updating an error signal) rather than failing silently or handling it in the component.
