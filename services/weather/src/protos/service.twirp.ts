import {
  TwirpContext,
  TwirpServer,
  RouterEvents,
  TwirpError,
  TwirpErrorCode,
  Interceptor,
  TwirpContentType,
  chainInterceptors,
} from "twirp-ts";
import {
  SayHelloRequest,
  SayHelloResponse,
  GetCurrentWeatherRequest,
  GetCurrentWeatherResponse,
} from "./service";

//==================================//
//          Client Code             //
//==================================//

interface Rpc {
  request(
    service: string,
    method: string,
    contentType: "application/json" | "application/protobuf",
    data: object | Uint8Array
  ): Promise<object | Uint8Array>;
}

export interface WeatherAPIClient {
  SayHello(request: SayHelloRequest): Promise<SayHelloResponse>;
  GetCurrentWeather(
    request: GetCurrentWeatherRequest
  ): Promise<GetCurrentWeatherResponse>;
}

export class WeatherAPIClientJSON implements WeatherAPIClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SayHello.bind(this);
    this.GetCurrentWeather.bind(this);
  }
  SayHello(request: SayHelloRequest): Promise<SayHelloResponse> {
    const data = SayHelloRequest.toJSON(request);
    const promise = this.rpc.request(
      "weather.api.WeatherAPI",
      "SayHello",
      "application/json",
      data as object
    );
    return promise.then((data) => SayHelloResponse.fromJSON(data as any));
  }

  GetCurrentWeather(
    request: GetCurrentWeatherRequest
  ): Promise<GetCurrentWeatherResponse> {
    const data = GetCurrentWeatherRequest.toJSON(request);
    const promise = this.rpc.request(
      "weather.api.WeatherAPI",
      "GetCurrentWeather",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetCurrentWeatherResponse.fromJSON(data as any)
    );
  }
}

export class WeatherAPIClientProtobuf implements WeatherAPIClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SayHello.bind(this);
    this.GetCurrentWeather.bind(this);
  }
  SayHello(request: SayHelloRequest): Promise<SayHelloResponse> {
    const data = SayHelloRequest.encode(request).finish();
    const promise = this.rpc.request(
      "weather.api.WeatherAPI",
      "SayHello",
      "application/protobuf",
      data
    );
    return promise.then((data) => SayHelloResponse.decode(data as Uint8Array));
  }

  GetCurrentWeather(
    request: GetCurrentWeatherRequest
  ): Promise<GetCurrentWeatherResponse> {
    const data = GetCurrentWeatherRequest.encode(request).finish();
    const promise = this.rpc.request(
      "weather.api.WeatherAPI",
      "GetCurrentWeather",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetCurrentWeatherResponse.decode(data as Uint8Array)
    );
  }
}

//==================================//
//          Server Code             //
//==================================//

export interface WeatherAPITwirp<T extends TwirpContext = TwirpContext> {
  SayHello(ctx: T, request: SayHelloRequest): Promise<SayHelloResponse>;
  GetCurrentWeather(
    ctx: T,
    request: GetCurrentWeatherRequest
  ): Promise<GetCurrentWeatherResponse>;
}

export enum WeatherAPIMethod {
  SayHello = "SayHello",
  GetCurrentWeather = "GetCurrentWeather",
}

export const WeatherAPIMethodList = [
  WeatherAPIMethod.SayHello,
  WeatherAPIMethod.GetCurrentWeather,
];

export function createWeatherAPIServer<T extends TwirpContext = TwirpContext>(
  service: WeatherAPITwirp<T>
) {
  return new TwirpServer<WeatherAPITwirp, T>({
    service,
    packageName: "weather.api",
    serviceName: "WeatherAPI",
    methodList: WeatherAPIMethodList,
    matchRoute: matchWeatherAPIRoute,
  });
}

function matchWeatherAPIRoute<T extends TwirpContext = TwirpContext>(
  method: string,
  events: RouterEvents<T>
) {
  switch (method) {
    case "SayHello":
      return async (
        ctx: T,
        service: WeatherAPITwirp,
        data: Buffer,
        interceptors?: Interceptor<T, SayHelloRequest, SayHelloResponse>[]
      ) => {
        ctx = { ...ctx, methodName: "SayHello" };
        await events.onMatch(ctx);
        return handleSayHelloRequest(ctx, service, data, interceptors);
      };
    case "GetCurrentWeather":
      return async (
        ctx: T,
        service: WeatherAPITwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetCurrentWeatherRequest,
          GetCurrentWeatherResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetCurrentWeather" };
        await events.onMatch(ctx);
        return handleGetCurrentWeatherRequest(ctx, service, data, interceptors);
      };
    default:
      events.onNotFound();
      const msg = `no handler found`;
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleSayHelloRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: WeatherAPITwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SayHelloRequest, SayHelloResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleSayHelloJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleSayHelloProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleGetCurrentWeatherRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: WeatherAPITwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetCurrentWeatherRequest,
    GetCurrentWeatherResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleGetCurrentWeatherJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleGetCurrentWeatherProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}
async function handleSayHelloJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: WeatherAPITwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SayHelloRequest, SayHelloResponse>[]
) {
  let request: SayHelloRequest;
  let response: SayHelloResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = SayHelloRequest.fromJSON(body);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SayHelloRequest,
      SayHelloResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SayHello(ctx, inputReq);
    });
  } else {
    response = await service.SayHello(ctx, request!);
  }

  return JSON.stringify(SayHelloResponse.toJSON(response) as string);
}

async function handleGetCurrentWeatherJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WeatherAPITwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetCurrentWeatherRequest,
    GetCurrentWeatherResponse
  >[]
) {
  let request: GetCurrentWeatherRequest;
  let response: GetCurrentWeatherResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetCurrentWeatherRequest.fromJSON(body);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetCurrentWeatherRequest,
      GetCurrentWeatherResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetCurrentWeather(ctx, inputReq);
    });
  } else {
    response = await service.GetCurrentWeather(ctx, request!);
  }

  return JSON.stringify(GetCurrentWeatherResponse.toJSON(response) as string);
}
async function handleSayHelloProtobuf<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: WeatherAPITwirp,
  data: Buffer,
  interceptors?: Interceptor<T, SayHelloRequest, SayHelloResponse>[]
) {
  let request: SayHelloRequest;
  let response: SayHelloResponse;

  try {
    request = SayHelloRequest.decode(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      SayHelloRequest,
      SayHelloResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.SayHello(ctx, inputReq);
    });
  } else {
    response = await service.SayHello(ctx, request!);
  }

  return Buffer.from(SayHelloResponse.encode(response).finish());
}

async function handleGetCurrentWeatherProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: WeatherAPITwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetCurrentWeatherRequest,
    GetCurrentWeatherResponse
  >[]
) {
  let request: GetCurrentWeatherRequest;
  let response: GetCurrentWeatherResponse;

  try {
    request = GetCurrentWeatherRequest.decode(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetCurrentWeatherRequest,
      GetCurrentWeatherResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetCurrentWeather(ctx, inputReq);
    });
  } else {
    response = await service.GetCurrentWeather(ctx, request!);
  }

  return Buffer.from(GetCurrentWeatherResponse.encode(response).finish());
}
