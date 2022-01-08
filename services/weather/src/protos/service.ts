/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "weather.api";

export interface SayHelloRequest {
  name: string;
}

export interface SayHelloResponse {
  response: string;
}

export interface GetCurrentWeatherRequest {}

export interface GetCurrentWeatherResponse {
  f: number;
  c: number;
}

const baseSayHelloRequest: object = { name: "" };

export const SayHelloRequest = {
  encode(
    message: SayHelloRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SayHelloRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSayHelloRequest } as SayHelloRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SayHelloRequest {
    const message = { ...baseSayHelloRequest } as SayHelloRequest;
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    return message;
  },

  toJSON(message: SayHelloRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SayHelloRequest>, I>>(
    object: I
  ): SayHelloRequest {
    const message = { ...baseSayHelloRequest } as SayHelloRequest;
    message.name = object.name ?? "";
    return message;
  },
};

const baseSayHelloResponse: object = { response: "" };

export const SayHelloResponse = {
  encode(
    message: SayHelloResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.response !== "") {
      writer.uint32(10).string(message.response);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SayHelloResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSayHelloResponse } as SayHelloResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.response = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SayHelloResponse {
    const message = { ...baseSayHelloResponse } as SayHelloResponse;
    message.response =
      object.response !== undefined && object.response !== null
        ? String(object.response)
        : "";
    return message;
  },

  toJSON(message: SayHelloResponse): unknown {
    const obj: any = {};
    message.response !== undefined && (obj.response = message.response);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SayHelloResponse>, I>>(
    object: I
  ): SayHelloResponse {
    const message = { ...baseSayHelloResponse } as SayHelloResponse;
    message.response = object.response ?? "";
    return message;
  },
};

const baseGetCurrentWeatherRequest: object = {};

export const GetCurrentWeatherRequest = {
  encode(
    _: GetCurrentWeatherRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetCurrentWeatherRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetCurrentWeatherRequest,
    } as GetCurrentWeatherRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GetCurrentWeatherRequest {
    const message = {
      ...baseGetCurrentWeatherRequest,
    } as GetCurrentWeatherRequest;
    return message;
  },

  toJSON(_: GetCurrentWeatherRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCurrentWeatherRequest>, I>>(
    _: I
  ): GetCurrentWeatherRequest {
    const message = {
      ...baseGetCurrentWeatherRequest,
    } as GetCurrentWeatherRequest;
    return message;
  },
};

const baseGetCurrentWeatherResponse: object = { f: 0, c: 0 };

export const GetCurrentWeatherResponse = {
  encode(
    message: GetCurrentWeatherResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.f !== 0) {
      writer.uint32(9).double(message.f);
    }
    if (message.c !== 0) {
      writer.uint32(17).double(message.c);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetCurrentWeatherResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetCurrentWeatherResponse,
    } as GetCurrentWeatherResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.f = reader.double();
          break;
        case 2:
          message.c = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetCurrentWeatherResponse {
    const message = {
      ...baseGetCurrentWeatherResponse,
    } as GetCurrentWeatherResponse;
    message.f =
      object.f !== undefined && object.f !== null ? Number(object.f) : 0;
    message.c =
      object.c !== undefined && object.c !== null ? Number(object.c) : 0;
    return message;
  },

  toJSON(message: GetCurrentWeatherResponse): unknown {
    const obj: any = {};
    message.f !== undefined && (obj.f = message.f);
    message.c !== undefined && (obj.c = message.c);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCurrentWeatherResponse>, I>>(
    object: I
  ): GetCurrentWeatherResponse {
    const message = {
      ...baseGetCurrentWeatherResponse,
    } as GetCurrentWeatherResponse;
    message.f = object.f ?? 0;
    message.c = object.c ?? 0;
    return message;
  },
};

export interface WeatherAPI {
  SayHello(request: SayHelloRequest): Promise<SayHelloResponse>;
  GetCurrentWeather(
    request: GetCurrentWeatherRequest
  ): Promise<GetCurrentWeatherResponse>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
