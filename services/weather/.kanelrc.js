const path = require("path");
const { recase } = require("@kristiandupont/recase");

module.exports = {
  connection: {
    host: "0.0.0.0",
    port: "9999",
    user: "dev_user",
    password: "dev_pass",
    database: "registry",
  },

  preDeleteModelFolder: true,

  modelNominator: recase("snake", "pascal"),
  typeNominator: recase("snake", "pascal"),

  customTypeMap: {
    tsvector: "string",
    bpchar: "string",
    uuid: "string",
  },

  schemas: [
    {
      name: "public",
      ignore: ["knex_migrations", "knex_migrations_lock"],
      modelFolder: path.join(__dirname, "src", "models"),
    },
  ],
};
