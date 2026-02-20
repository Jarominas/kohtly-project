import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { colors } from './common/colors';
import { tokens } from './common/tokens';
import { typography } from './common/typography';
import { button } from './components/button';

export const BasicDesignPreset = definePreset(Aura, {
  semantic: {
    primary: colors.primary,
    colorScheme: colors.colorScheme,
    focusRing: tokens.focusRing,
  },
  components: {
    button,
  },
  extend: {
    typography,
    borderRadius: tokens.borderRadius,
  },
});

export default BasicDesignPreset;
