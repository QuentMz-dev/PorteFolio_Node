import { sanitizerMiddleware } from "../middlewares/sanitizer.middleware.js";

import initUsersRoutes from "./users.routes.js";
import initSkillsRoutes from "./skills.routes.js";
import initPdfRoutes from "./pdf.routes.js";
import initMessagesRoutes from "./messages.routes.js";
import initAboutRoutes from "./about.routes.js";

const initRoutes = (app) => {
  initUsersRoutes(app, sanitizerMiddleware);

  initSkillsRoutes(app, sanitizerMiddleware);
  initPdfRoutes(app, sanitizerMiddleware);
  initMessagesRoutes(app, sanitizerMiddleware);
  initAboutRoutes(app, sanitizerMiddleware);
};

export default initRoutes;
