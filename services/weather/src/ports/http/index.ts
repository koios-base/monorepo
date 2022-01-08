import express from "express";
import Log from "@app/monitoring/log";
import * as Middleware from "@app/middleware";
import assert from "assert";
import * as Routes from "./routes";

interface PortCTX<T> {
  data?: T;
  assign: (v: T) => void;
}

export type PortType = express.Application;

export const create = (ctx: PortCTX<PortType>) => ctx.assign(express());

export const scaffold = (ctx: PortCTX<PortType>) => {
  assert(ctx.data, "There has been a data property set");

  ctx.data
    .use(Middleware.HTTP.reqLogger())
    .use(Middleware.HTTP.authenticate())
    .use(Middleware.HTTP.security());
};

export const init = (ctx: PortCTX<PortType>) => {
  assert(ctx.data, "There has been a data property set");

  ctx.data
    .get("/.well-known/healthcheck", Routes.healthcheck)
    .post("/database/migrate", Routes.db.migrate)
    .post("/database/rollback", Routes.db.rollback)
    .get("/jokes", Routes.getRandomJoke)
    .use(Middleware.HTTP.error());
};

export const start = (
  ctx: PortCTX<PortType>,
  { port, then }: { port: number; then: () => any }
) => {
  assert(ctx.data, "There has been a data property set");

  ctx.data.listen(port, then);
};

export const newInstance = async (port: number) => {
  Log.trace({ port }, "Starting new HTTP Port Instance");

  const ctx: { data?: any; assign(t: any): void } = {
    data: undefined,
    assign(value: unknown) {
      this.data = value;
    },
  };

  await create(ctx);
  await scaffold(ctx);
  await init(ctx);

  await start(ctx, {
    port,
    then: () => {
      Log.trace("System has started");
    },
  });

  return ctx;
};
