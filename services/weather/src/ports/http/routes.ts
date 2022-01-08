import Log from "@app/monitoring/log";
import * as Commands from "@app/cmds";

import { RequestHandler } from "express";

export const healthcheck: RequestHandler = (req, res) => {
  Log.trace({ req, res }, "Healthy!");

  res.end("OK");
};

export const getRandomJoke: RequestHandler = async (_, res) => {
  const joke = await Commands.randomJoke();

  res.json({
    data: joke,
  });
};
