import { Router } from "express";
import { AboutController } from "../controllers/about.controller.js";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";

const initAboutRoutes = (app, sm) => {
  const router = Router();

  //JwtMiddleware en argument check si token est present
  // Et donc interdire l'acces a /read si non connecté
  //=
  // router.get("/read", jwtMiddleware, LessonsController.read);
  //=
  router.get("/read", sm, AboutController.read);

  router.post("/post-one", jwtMiddleware, sm, AboutController.postOne);
  router.post("/delete-one", jwtMiddleware, sm, AboutController.deleteOne);

  // router.get("/getOne/:id", LessonsController.getOne);

  app.use("/about", router);
};

export default initAboutRoutes;
