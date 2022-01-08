import Log from "@app/monitoring/log";
import * as Middleware from "@app/middleware";
import * as Commands from "@app/cmds";
import Database from "@app/adapters/database";

import { RequestHandler } from "express";

export const healthcheck: RequestHandler = (req, res) => {
  Log.trace({ req, res }, "Healthy!");

  res.end("OK");
};

export const db = {
  migrate: [
    Middleware.HTTP.overlordOnly(),
    async (_, res) => {
      const result = await Commands.migrateDB(Database);

      res.json({ result });
    },
  ] as RequestHandler[],
  rollback: [
    Middleware.HTTP.overlordOnly(),
    async (req, res) => {
      const result = await Commands.rollbackDB(
        Database,
        Boolean(req.query.all)
      );

      res.json({ result });
    },
  ] as RequestHandler[],
};

export const getRandomJoke: RequestHandler = async (_, res) => {
  const joke = await Commands.randomJoke();

  res.json({
    data: joke,
  });
};
