````skill
---
name: angular-component-constants
description: Extract hardcoded values, arrays, maps, and configuration objects from Angular components into dedicated constants/utils files. Use whenever a component contains inline static data (navigation links, status maps, dropdown options, labels, magic numbers, regex patterns, etc.) that clutter component logic. Keeps components focused on behavior, not data.
---

# Angular Component Constants & Utils Extraction

Keep Angular components clean by extracting all static, hardcoded data into separate `*.constants.ts` or `*.utils.ts` files co-located with the component.

## When to Extract

Extract to a constants file when the component contains:

- Hardcoded arrays (navigation links, menu items, options lists)
- String/number literals used more than once ("magic values")
- Configuration objects (column definitions, chart config, form field definitions)
- Label/copy maps (status labels, error messages, display text)
- Regex patterns
- Enum-like `const` objects

## File Naming Convention

Co-locate the file with the component it serves:

```
components/
  header/
    header.component.ts
    header.component.html
    header.component.css
    header.constants.ts      ← extracted constants
  product-list/
    product-list.component.ts
    product-list.constants.ts
    product-list.utils.ts    ← pure helper functions (no Angular deps)
```

For shared/global constants used across multiple components:

```
src/app/
  shared/
    constants/
      routes.constants.ts
      status.constants.ts
```

## Pattern: Navigation Links

**Before** (cluttered component):

```typescript
// header.component.ts
export class HeaderComponent {
  protected readonly links = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ];
}
```

**After** (clean split):

```typescript
// header.constants.ts
import type { HeaderLink } from './header.component';

export const HEADER_LINKS: HeaderLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
];
```

```typescript
// header.component.ts
import { HEADER_LINKS } from './header.constants';

export class HeaderComponent {
  protected readonly links = HEADER_LINKS;
}
```

## Pattern: Status / Label Maps

```typescript
// order-status.constants.ts
export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Awaiting Payment',
  processing: 'Being Prepared',
  shipped: 'On Its Way',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
} as const;

export const ORDER_STATUS_SEVERITY: Record<string, string> = {
  pending:    'warn',
  processing: 'info',
  shipped:    'info',
  delivered:  'success',
  cancelled:  'danger',
} as const;
```

```typescript
// order-list.component.ts
import { ORDER_STATUS_LABELS, ORDER_STATUS_SEVERITY } from './order-list.constants';

export class OrderListComponent {
  protected readonly statusLabels = ORDER_STATUS_LABELS;
  protected readonly statusSeverity = ORDER_STATUS_SEVERITY;
}
```

## Pattern: Dropdown / Select Options

```typescript
// user-form.constants.ts
export interface SelectOption<T = string> {
  readonly label: string;
  readonly value: T;
}

export const ROLE_OPTIONS: SelectOption[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

export const COUNTRY_OPTIONS: SelectOption[] = [
  { label: 'Poland', value: 'PL' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
];
```

## Pattern: Magic Numbers / Thresholds

```typescript
// dashboard.constants.ts
export const CHART_COLORS = {
  PRIMARY: '#6366f1',
  SUCCESS: '#22c55e',
  DANGER:  '#ef4444',
  MUTED:   '#94a3b8',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50],
} as const;

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_USERNAME_LENGTH: 32,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;
```

## Pattern: Table Column Definitions

```typescript
// users-table.constants.ts
export interface TableColumn {
  readonly field: string;
  readonly header: string;
  readonly sortable?: boolean;
  readonly width?: string;
}

export const USER_TABLE_COLUMNS: TableColumn[] = [
  { field: 'name',      header: 'Name',       sortable: true  },
  { field: 'email',     header: 'Email',      sortable: true  },
  { field: 'role',      header: 'Role',       sortable: false },
  { field: 'createdAt', header: 'Created At', sortable: true, width: '160px' },
];
```

## Typing Rules

- Always export interfaces/types that describe the shape of your constants so consumers are type-safe
- Use `as const` on objects and arrays to get literal types and prevent mutation
- Prefer `readonly` on interface properties to signal immutability
- Use generic `SelectOption<T>` patterns to stay reusable without sacrificing type safety

## What NOT to Extract

- Values that depend on runtime state or signals (those belong in the component)
- Logic that transforms data (belongs in a service or pure util function)
- Values that will be injected via inputs (keep those as `input()`)

## Checklist

- [ ] Is the value static (never changes at runtime)? → Extract it
- [ ] Is the value used only in this one component? → `component.constants.ts`
- [ ] Is the value shared across ≥ 2 components? → `shared/constants/`
- [ ] Does the file define an interface for the shape? → Yes, always
- [ ] Is `as const` used on object/array literals? → Yes
- [ ] Is the component class now free of inline data? → Yes
````
