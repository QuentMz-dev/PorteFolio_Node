import { createCollection, ObjectId, Schema } from "./mongoose.config.js";

const skillSchema = new Schema(
  {
    core: String,
    name: String,
    level: String,
    certified: Boolean,
    // slots: [{ type: ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Skill = createCollection("Skill", skillSchema);
//création d'une collection nommée "users"
//le nom donné est mis en minuscules avec un "s" => "users"

export default Skill;
