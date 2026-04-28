import * as migration_20260428_034043_initial from "./20260428_034043_initial";
import * as migration_20260428_171227_split_home_globals from "./20260428_171227_split_home_globals";

export const migrations = [
  {
    up: migration_20260428_034043_initial.up,
    down: migration_20260428_034043_initial.down,
    name: "20260428_034043_initial",
  },
  {
    up: migration_20260428_171227_split_home_globals.up,
    down: migration_20260428_171227_split_home_globals.down,
    name: "20260428_171227_split_home_globals",
  },
];
