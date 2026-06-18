import * as migration_20260608_231049    from './20260608_231049';
import * as migration_20260612_143500    from './20260612_143500';
import * as migration_20260615_site_features from './20260615_site_features';
import * as migration_20260616_product_inserto  from './20260616_product_inserto';
import * as migration_20260616_team_narrative    from './20260616_team_narrative';
import * as migration_20260618_product_prescripcion from './20260618_product_prescripcion';

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
  {
    up:   migration_20260616_product_inserto.up,
    down: migration_20260616_product_inserto.down,
    name: '20260616_product_inserto',
  },
  {
    up:   migration_20260616_team_narrative.up,
    down: migration_20260616_team_narrative.down,
    name: '20260616_team_narrative',
  },
  {
    up:   migration_20260618_product_prescripcion.up,
    down: migration_20260618_product_prescripcion.down,
    name: '20260618_product_prescripcion',
  },
];
