import * as migration_20260608_231049 from './20260608_231049';
import * as migration_20260612_143500 from './20260612_143500';

export const migrations = [
  {
    up: migration_20260608_231049.up,
    down: migration_20260608_231049.down,
    name: '20260608_231049',
  },
  {
    up: migration_20260612_143500.up,
    down: migration_20260612_143500.down,
    name: '20260612_143500'
  },
];
