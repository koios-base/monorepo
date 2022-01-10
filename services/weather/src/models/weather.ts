import { model as Model, Schema } from "mongoose";

export const schema = new Schema({}, { strict: false, timestamps: true });

export const model = Model("Weather", schema);

export default model;
