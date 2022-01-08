import { Knex } from 'knex'

export default (database: Knex, all = false) => database.migrate.rollback(undefined, all)