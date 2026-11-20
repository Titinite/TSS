import { createConfig } from '@tss/config/eslint';

export default createConfig({ tsconfigRootDir: import.meta.dirname, boundary: 'shared' });
