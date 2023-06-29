import { Router } from "express";
import { SkillController } from "../controllers/skill.controller.js";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";

const initSkillsRoutes = (app, sm) => {
  const router = Router();

  //JwtMiddleware en argument check si token est present
  // Et donc interdire l'acces a /read si non connecté
  //=
  // router.get("/read", jwtMiddleware, LessonsController.read);
  //=
  router.get("/read", sm, SkillController.read);

  router.post("/post-one", jwtMiddleware, sm, SkillController.postOne);
  router.post("/delete-one", jwtMiddleware, sm, SkillController.deleteOne);

  // router.get("/getOne/:id", LessonsController.getOne);

  app.use("/skills", router);
};

export default initSkillsRoutes;
