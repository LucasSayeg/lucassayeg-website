import * as migration_20260428_034043_initial from "./20260428_034043_initial";
import * as migration_20260428_171227_split_home_globals from "./20260428_171227_split_home_globals";
import * as migration_20260430_175351_marked_words_chips from "./20260430_175351_marked_words_chips";
import * as migration_20260430_202251_move_crisis_to_site_info from "./20260430_202251_move_crisis_to_site_info";
import * as migration_20260501_025531_extend_contato_and_form_globals from "./20260501_025531_extend_contato_and_form_globals";
import * as migration_20260501_163119_cleanup_cms_unused_fields from "./20260501_163119_cleanup_cms_unused_fields";
import * as migration_20260502_012941_sobre_page from "./20260502_012941_sobre_page";
import * as migration_20260506_194234_reshape_como_ajuda from "./20260506_194234_reshape_como_ajuda";

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
  {
    up: migration_20260430_175351_marked_words_chips.up,
    down: migration_20260430_175351_marked_words_chips.down,
    name: "20260430_175351_marked_words_chips",
  },
  {
    up: migration_20260430_202251_move_crisis_to_site_info.up,
    down: migration_20260430_202251_move_crisis_to_site_info.down,
    name: "20260430_202251_move_crisis_to_site_info",
  },
  {
    up: migration_20260501_025531_extend_contato_and_form_globals.up,
    down: migration_20260501_025531_extend_contato_and_form_globals.down,
    name: "20260501_025531_extend_contato_and_form_globals",
  },
  {
    up: migration_20260501_163119_cleanup_cms_unused_fields.up,
    down: migration_20260501_163119_cleanup_cms_unused_fields.down,
    name: "20260501_163119_cleanup_cms_unused_fields",
  },
  {
    up: migration_20260502_012941_sobre_page.up,
    down: migration_20260502_012941_sobre_page.down,
    name: "20260502_012941_sobre_page",
  },
  {
    up: migration_20260506_194234_reshape_como_ajuda.up,
    down: migration_20260506_194234_reshape_como_ajuda.down,
    name: "20260506_194234_reshape_como_ajuda",
  },
];
