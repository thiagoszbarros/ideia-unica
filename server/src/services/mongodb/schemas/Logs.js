import mongoose from "../MongoDbService.js";
const { Schema } = mongoose;

const logSchema = new Schema({
  body: { type: String, required: true, unique: true },
});

export default mongoose.model('log', logSchema, 'logs');