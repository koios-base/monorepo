import { verify, JwtPayload } from "jsonwebtoken";
import * as Env from "@app/config/env";
import Log from "@app/monitoring/log";

import { RequestHandler } from "express";

const log = Log.child({
  reason: "authentication",
  type: "middleware",
});

export default (): RequestHandler => async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "");
  } else {
    token = req.signedCookies?.authorization;
  }

  let user;

  if (token) {
    try {
      const data = await verify(token, Env.secrets.jwt_token);

      user = (data as JwtPayload).data;
    } catch (err) {
      log.warn(
        { err },
        "Error validating token sent. Swallowing error but could be indicative of larger issues"
      );
    }
  }

  res.locals.user = user;

  return next();
};
