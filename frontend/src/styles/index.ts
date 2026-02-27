import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { colors } from './common/colors';
import { tokens } from './common/tokens';
import { typography } from './common/typography';
import { button, card } from './components';

export const BasicDesignPreset = definePreset(Aura, {
  semantic: {
    primary: colors.primary,
    colorScheme: colors.colorScheme,
    focusRing: tokens.focusRing,
  },
  components: {
    button,
    card,
  },
  extend: {
    typography,
    borderRadius: tokens.borderRadius,
  },
});

export default BasicDesignPreset;
