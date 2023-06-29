import { MessageDAO } from "../daos/message.dao.js";
import { UserDAO } from "../daos/user.dao.js";

import { stringAreFilled } from "../utils/string.utils.js";

const read = async (req, res) => {
  // const token = req.headers.authorization;
  // // Check si Token Ok
  // const userId = jwtVerify(token);
  // if (!userId) return res.status(403).json({ message: "unauthorized" });

  // si JwtMiddleware actif, commenter le reste au dessus
  // const userId = req.body.userId;
  const { message } = await MessageDAO.readAll();

  if (!message)
    return res.status(400).json({ message: `can't retrieve message` });
  res.status(200).json({ message });
};

const postOne = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const text = req.body.text;

  //   // CHECK SI ADMIN
  //   const userId = req.body.userId;
  //   const user = await UserDAO.readById(userId);
  //   if (!user) return res.status(401).json({ message: "failed" });
  //   if (user.role !== 1) return res.status(405).json({ message: "Unauthorized" });

  if (!stringAreFilled([name, email, text])) {
    return res.status(400).json({ message: "incorrect_data" });
  }

  const message = await MessageDAO.create(name, email, text);

  if (!message) return res.status(403).json({ message: "creation_failed" });

  res.status(201).json({
    message: "message created",
    data: message,
  });
};

const deleteOne = async (req, res) => {
  // CHECK SI ADMIN
  const userId = req.body.userId;

  const user = await UserDAO.readById(userId);
  if (!user) return res.status(405).json({ message: "failed_unlogged" });
  if (user.role !== 1) return res.status(401).json({ message: "Unauthorized" });

  const idMessage = req.body.id;
  const deleted = await MessageDAO.deleteMessage(idMessage);
  if (!deleted)
    return res.status(400).json({ message: `can't delete message` });
  res.status(200).json({ deleted });
};

export const MessageController = {
  read,
  postOne,
  deleteOne,
};
