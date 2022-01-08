import * as openTel from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { Resource } from "@opentelemetry/resources";

export default new openTel.NodeSDK({
  traceExporter: new openTel.tracing.ConsoleSpanExporter(),
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "weather-service",
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]:
      process.env.ENVIRONMENT || "development",
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});
