import About from "../models/about.model.js";

import { logError } from "../utils/logger.utils.js";

// Fonction exectuté seulement pour les membres + non Loggé
const readAll = async () => {
  try {
    const about = await About.find();

    return { about } ? { about } : null;
  } catch (e) {
    logError(`about.dao - readAll : ${e.message}`);
    return null;
  }
};

const create = async (text) => {
  try {
    const about = new About({
      text,
    });

    const createdAbout = await about.save();
    return createdAbout ? createdAbout : null;
  } catch (e) {
    logError(`about.dao - create : ${e.message}`);
    return null;
  }
};

const deleteAbout = async (idAbout) => {
  try {
    const deletedAbout = await About.findByIdAndDelete(idAbout);
    return deletedAbout ? deletedAbout : null;
  } catch (e) {
    logError(`about.dao - deleteSkill : ${e.message}`);
    return null;
  }
};

const update = async (text) => {
  try {
    const updatedAbout = await About.findOneAndUpdate(
      {},
      { text },
      { new: true }
    );
    return updatedAbout ? updatedAbout : null;
  } catch (e) {
    logError(`about.dao - update : ${e.message}`);
    return null;
  }
};

export const AboutDAO = {
  readAll,
  create,
  deleteAbout,
  update,
};
