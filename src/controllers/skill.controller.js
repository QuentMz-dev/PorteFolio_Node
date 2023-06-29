import { SkillDAO } from "../daos/skill.dao.js";
import { UserDAO } from "../daos/user.dao.js";

import { stringAreFilled } from "../utils/string.utils.js";

const read = async (req, res) => {
  // const token = req.headers.authorization;
  // // Check si Token Ok
  // const userId = jwtVerify(token);
  // if (!userId) return res.status(403).json({ message: "unauthorized" });

  // si JwtMiddleware actif, commenter le reste au dessus
  // const userId = req.body.userId;
  const { skills } = await SkillDAO.readAll();

  if (!skills)
    return res.status(400).json({ message: `can't retrieve skills` });
  res.status(200).json({ skills });
};
// const readAdmin = async (req, res) => {
//   // Check si Admin
//   const userId = req.body.userId;
//   const user = await UserDAO.readById(userId);
//   if (!user) return res.status(405).json({ message: "failed" });
//   if (user.role !== 1) return res.status(401).json({ message: "Unauthorized" });
//   //==

//   const { planningSkate, planningSurf, planningSail } =
//     await LessonDAO.readAllAdmin();

//   if (!planningSkate || !planningSurf || !planningSail)
//     return res.status(400).json({ message: `can't retrieve lessons` });
//   res.status(200).json({ planningSkate, planningSurf, planningSail });
// };

const postOne = async (req, res) => {
  const core = req.body.core;
  const name = req.body.name;
  const level = req.body.level;
  const certified = req.body.certified;

  // CHECK SI ADMIN
  const userId = req.body.userId;
  const user = await UserDAO.readById(userId);
  if (!user) return res.status(401).json({ message: "failed" });
  if (user.role !== 1) return res.status(405).json({ message: "Unauthorized" });

  if (!stringAreFilled([core, name, level])) {
    return res.status(400).json({ message: "incorrect_data" });
  }

  const skill = await SkillDAO.create(core, name, level, certified);

  if (!skill) return res.status(403).json({ message: "creation_failed" });

  res.status(201).json({
    message: "skill created",
    data: skill,
  });
};

const deleteOne = async (req, res) => {
  // CHECK SI ADMIN
  const userId = req.body.userId;

  const user = await UserDAO.readById(userId);
  if (!user) return res.status(405).json({ message: "failed_unlogged" });
  if (user.role !== 1) return res.status(401).json({ message: "Unauthorized" });

  const idSkill = req.body.id;
  const deleted = await SkillDAO.deleteSkill(idSkill);
  if (!deleted) return res.status(400).json({ message: `can't delete skill` });
  res.status(200).json({ deleted });
};

// const updateAddOneInSlots = async (req, res) => {
//   // CHECK SI ADMIN
//   const userId = req.body.userId;

//   const user = await UserDAO.readById(userId);
//   if (!user) return res.status(400).json({ message: "failed" });
//   if (user.role !== 1) return res.status(400).json({ message: "Unauthorized" });
//   //==
//   const idLesson = req.body.id;
//   // const slotsUpdate = req.body.slots;
//   const updated = await LessonDAO.updateSlots(idLesson, user.id);
//   if (!updated)
//     return res.status(400).json({ message: `can't update lessons` });
//   res.status(200).json({ updated });
// };

export const SkillController = {
  read,
  postOne,
  deleteOne,
};
