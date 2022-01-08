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

export interface WeatherAPI {
  SayHello(request: SayHelloRequest): Promise<SayHelloResponse>;
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
