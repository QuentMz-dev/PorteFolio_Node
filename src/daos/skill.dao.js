import Skill from "../models/skill.model.js";

import { logError } from "../utils/logger.utils.js";

// Fonction exectuté seulement pour les membres + non Loggé
const readAll = async () => {
  try {
    const skills = await Skill.find();

    return { skills } ? { skills } : null;
  } catch (e) {
    logError(`skill.dao - readAll : ${e.message}`);
    return null;
  }
};

const create = async (core, name, level, certified) => {
  try {
    const skill = new Skill({
      core,
      name,
      level,
      certified,
    });

    const createdSkill = await skill.save();
    return createdSkill ? createdSkill : null;
  } catch (e) {
    logError(`skill.dao - create : ${e.message}`);
    return null;
  }
};

const deleteSkill = async (idSkill) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(idSkill);
    return deletedSkill ? deletedSkill : null;
  } catch (e) {
    logError(`skill.dao - deleteSkill : ${e.message}`);
    return null;
  }
};

export const SkillDAO = {
  readAll,
  create,
  deleteSkill,
};
