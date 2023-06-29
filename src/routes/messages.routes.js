import { Router } from "express";
import { MessageController } from "../controllers/message.controller.js";
import { jwtMiddleware } from "../middlewares/jwt.middleware.js";

const initMessagesRoutes = (app, sm) => {
  const router = Router();

  //JwtMiddleware en argument check si token est present
  // Et donc interdire l'acces a /read si non connecté
  //=
  // router.get("/read", jwtMiddleware, LessonsController.read);
  //=
  router.get("/read", sm, MessageController.read);

  router.post("/post-one", sm, MessageController.postOne);
  router.post("/delete-one", jwtMiddleware, sm, MessageController.deleteOne);

  // router.get("/getOne/:id", LessonsController.getOne);

  app.use("/messages", router);
};

export default initMessagesRoutes;
