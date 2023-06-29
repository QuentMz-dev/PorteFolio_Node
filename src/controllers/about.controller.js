import { AboutDAO } from "../daos/about.dao.js";
import { UserDAO } from "../daos/user.dao.js";

const read = async (req, res) => {
  const { about } = await AboutDAO.readAll();

  if (!about) return res.status(400).json({ message: `can't retrieve about` });
  res.status(200).json({ about });
};

const postOne = async (req, res) => {
  const text = req.body.text;

  // CHECK SI ADMIN
  const userId = req.body.userId;
  const user = await UserDAO.readById(userId);
  if (!user) return res.status(401).json({ message: "failed" });
  if (user.role !== 1) return res.status(405).json({ message: "Unauthorized" });

  //   if (!stringAreFilled([title, text, sub])) {
  //     return res.status(400).json({ message: "incorrect_data" });
  //   }

  const about = await AboutDAO.update(text);

  if (!about) return res.status(403).json({ message: "creation_failed" });

  res.status(201).json({
    message: "about created",
    data: about,
  });
};

const deleteOne = async (req, res) => {
  // CHECK SI ADMIN
  const userId = req.body.userId;

  const user = await UserDAO.readById(userId);
  if (!user) return res.status(405).json({ message: "failed_unlogged" });
  if (user.role !== 1) return res.status(401).json({ message: "Unauthorized" });

  const idAbout = req.body.id;
  const deleted = await AboutDAO.deleteSkill(idAbout);
  if (!deleted) return res.status(400).json({ message: `can't delete about` });
  res.status(200).json({ deleted });
};

export const AboutController = {
  read,
  postOne,
  deleteOne,
};
