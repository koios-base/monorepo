import { Knex } from "knex";

export default (database: Knex) => database.migrate.latest()