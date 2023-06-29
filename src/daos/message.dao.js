import Message from "../models/message.model.js";

import { logError } from "../utils/logger.utils.js";

// Fonction exectuté seulement pour les membres + non Loggé
const readAll = async () => {
  try {
    const message = await Message.find();

    return { message } ? { message } : null;
  } catch (e) {
    logError(`message.dao - readAll : ${e.message}`);
    return null;
  }
};

const create = async (name, email, text) => {
  try {
    const message = new Message({
      name,
      email,
      text,
    });

    const createdMessage = await message.save();
    return createdMessage ? createdMessage : null;
  } catch (e) {
    logError(`message.dao - create : ${e.message}`);
    return null;
  }
};

const deleteMessage = async (idMessage) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(idMessage);
    return deletedMessage ? deletedMessage : null;
  } catch (e) {
    logError(`message.dao - deleteMessage : ${e.message}`);
    return null;
  }
};

export const MessageDAO = {
  readAll,
  create,
  deleteMessage,
};
