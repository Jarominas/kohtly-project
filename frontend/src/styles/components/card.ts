export const card = {
  css: ({ dt }: { dt: (token: string) => string | number | undefined }) => `
  .p-card {
      border: 1px solid ${dt('surface.border')};

  }
  `,
  colorScheme: {
    light: {
      root: {
        background: '{surface.background}',
        color: '{surface.700}',
        shadow: 'none',
      },
    },
    dark: {
      root: {
        background: '{surface.background}',
        color: '{surface.0}',
        shadow: 'none',
      },
    },
  },
};
