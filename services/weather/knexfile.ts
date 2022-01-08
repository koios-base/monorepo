import type { Knex } from "knex";

export default {
  client: "postgres",
  migrations: {
    directory: "migrations",
  },
  seeds: {
    directory: "seeds",
  },
} as Knex.Config;
