import { haredo, q } from "haredo";

export const connection = haredo({
  connection: `amqp://${process.env.MQ_URL}`,
});

export const processSensorDataUpdates = (cb: any) =>
  connection.queue(q(process.env.MQ_EXCHANGE!)).prefetch(2).subscribe(cb);
