import { newInstance as HTTPPort } from "@app/ports/http";
import { newInstance as TwirpPort } from "@app/ports/twirp";
import * as Env from "@app/config/env";

export const init = async () => TwirpPort(await HTTPPort(Env.port));
