import Knex from 'knex'
import * as Env from '@app/config/env'

import config from '../../knexfile'

export default Knex({
  ...config,
  connection: Env.database
})