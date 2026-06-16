import * as migration_20260608_231049    from './20260608_231049';
import * as migration_20260612_143500    from './20260612_143500';
import * as migration_20260615_site_features from './20260615_site_features';

export const migrations = [
  {
    up:   migration_20260608_231049.up,
    down: migration_20260608_231049.down,
    name: '20260608_231049',
  },
  {
    up:   migration_20260612_143500.up,
    down: migration_20260612_143500.down,
    name: '20260612_143500',
  },
  {
    up:   migration_20260615_site_features.up,
    down: migration_20260615_site_features.down,
    name: '20260615_site_features',
  },
];
