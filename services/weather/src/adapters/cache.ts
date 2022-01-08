import Redis from "ioredis";
import * as Env from "@app/config/env";

export default new Redis(Env.cache);
