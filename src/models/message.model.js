import { createCollection, Schema } from "./mongoose.config.js";

const messageSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: [true, "email_require"],
      lowercase: true,
    },
    text: {
      type: String,
      required: [true, "text_require"],
    },
  },
  {
    timestamps: true,
  }
);

const Message = createCollection("Message", messageSchema);
//création d'une collection nommée "users"
//le nom donné est mis en minuscules avec un "s" => "users"

export default Message;
