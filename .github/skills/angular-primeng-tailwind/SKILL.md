---
name: angular-primeng-tailwind
description: Masterfully integrate PrimeNG and Tailwind CSS in Angular projects. Covers installation, configuration, unstyled mode, and Passthrough configuration for full control.
license: MIT
---

# Angular + PrimeNG + Tailwind CSS Integration

This skill establishes a robust foundation for using PrimeNG components with Tailwind CSS styling in Angular applications. It supports both **Styled** (default PrimeNG look + Tailwind layout) and **Unstyled** (Headless PrimeNG + Tailwind skins) modes.

## 1. Installation

Install necessary packages if not present:

```bash
npm install primeng primeicons
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

## 2. Configuration

### A. Tailwind Configuration (`tailwind.config.js`)

Ensure Tailwind scans your HTML and TS files. If using PrimeNG presets (styled mode customizations), include them here.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/primeng/**/*.{html,js}", // Add this if you use any Tailwind classes inside PrimeNG templates internally (rare) or if using presets that rely on it
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### B. Angular Configuration (`angular.json`)

Add PrimeNG CSS and PrimeIcons to your styles array (if using Styled mode).

```json
"styles": [
  "src/styles.css",
  "node_modules/primeng/resources/themes/lara-light-blue/theme.css", // Choose your theme
  "node_modules/primeng/resources/primeng.min.css",
  "node_modules/primeicons/primeicons.css"
]
```

## 3. Usage Strategy

### Strategy A: Styled Mode (Classic)

Use PrimeNG for the component look and feel, and Tailwind for layout, spacing, and typography around them.

**Example:**

```html
<div class="flex flex-col gap-4 p-6 bg-slate-50 rounded-xl shadow-lg">
  <h2 class="text-2xl font-bold text-slate-800">User Settings</h2>

  <div class="flex items-center gap-3">
    <label class="w-24 font-medium">Username</label>
    <input pInputText type="text" class="w-full" placeholder="Enter username" />
  </div>

  <p-button label="Save Changes" styleClass="w-full md:w-auto"></p-button>
</div>
```

_Note: Use `styleClass` input to pass utility classes to the inner container of PrimeNG components._

### Strategy B: Unstyled Mode (Modern / Passthrough)

Remove PrimeNG styles and use Tailwind for everything. ideal for custom design systems.

1.  **Enable Unstyled Mode globally** in `app.config.ts`:

    ```typescript
    import { ApplicationConfig } from "@angular/core";
    import { providePrimeNG } from "primeng/config";
    import Aura from "@primeng/themes/aura"; // Example theme preset

    export const appConfig: ApplicationConfig = {
      providers: [
        providePrimeNG({
          theme: {
            preset: Aura,
            options: {
              darkModeSelector: ".my-app-dark",
              cssLayer: {
                name: "primeng",
                order: "tailwind-base, primeng, tailwind-utilities",
              },
            },
          },
        }),
      ],
    };
    ```

    _Check PrimeNG documentation for the exact `providePrimeNG` syntax as it evolves rapidly between v17 and v18._

2.  **Using Tailwind Classes directly**:

    If strictly unstyled without a preset theme:

    ```html
    <p-panel
      [pt]="{
        header: { class: 'bg-blue-500 text-white p-4 rounded-t' },
        content: { class: 'p-4 border border-blue-500 rounded-b' }
    }"
    >
      Content here...
    </p-panel>
    ```

## 4. Best Practices

1.  **CSS Layering**: Defines the order of precedence.
    In `styles.css`:

    ```css
    @layer tailwind-base, primeng, tailwind-utilities;

    @layer tailwind-base {
      @tailwind base;
    }

    @layer tailwind-utilities {
      @tailwind components;
      @tailwind utilities;
    }
    ```

    This ensures Tailwind utilities (like `p-4`) always override PrimeNG default styles.

2.  **Avoid `@apply`**: Don't extract Tailwind classes into CSS classes unless building a reusable design system token set. Keep utilities in the HTML/Templates for discoverability.

3.  **Encapsulation**: If you need to override a specific PrimeNG style that `styleClass` can't reach, use `::ng-deep` (carefully) or global styles, but prefer the **Passthrough (pt)** property available on all components in recent versions.

    ```html
    <p-dropdown
      [pt]="{
        root: { class: 'w-full md:w-14rem' },
        item: { class: 'hover:bg-blue-50' }
    }"
    ></p-dropdown>
    ```
