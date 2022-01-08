import env from "getenv";

export const port = env.int("PORT");
export const environment = env.string("ENVIRONMENT", "development");

export const secrets = {
  jwt_token: env.string("JWT_SECRET_TOKEN"),
};

export const database = {
  user: env.string("DB_USER"),
  password: env.string("DB_PASS"),
  host: env.string("DB_HOST"),
  port: env.int("DB_PORT"),
  database: env.string("DB_NAME"),
};

export const cache = {
  // host: env.string("CACHE_HOST"),
  // port: env.int("CACHE_PORT"),
  // password: env.string("CACHE_PASSWORD"),
};
