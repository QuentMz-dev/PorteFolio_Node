import { createCollection, Schema } from "./mongoose.config.js";

const aboutSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "text_require"],
    },
  },
  {
    timestamps: true,
  }
);

const About = createCollection("About", aboutSchema);
//création d'une collection nommée "users"
//le nom donné est mis en minuscules avec un "s" => "users"

export default About;
