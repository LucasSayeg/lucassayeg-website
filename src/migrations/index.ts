import * as migration_20260428_034043_initial from "./20260428_034043_initial";

export const migrations = [
  {
    up: migration_20260428_034043_initial.up,
    down: migration_20260428_034043_initial.down,
    name: "20260428_034043_initial",
  },
];
