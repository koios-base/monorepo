import Mongoose from "mongoose";
import * as Env from "@app/config/env";

export default Mongoose.connect(
  `mongodb://${Env.database.host}:${Env.database.port}`,
  {
    user: Env.database.user,
    pass: Env.database.password,
    dbName: Env.database.database,
  }
);
