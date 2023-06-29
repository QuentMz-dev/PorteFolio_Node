import { Router } from "express";

import path from "path";

const initPdfRoutes = (app, sm) => {
  const router = Router();

  // ...

  router.get("/download-pdf", (req, res) => {
    const filePath = new URL("../pdf/CV_quentin_dev23.pdf", import.meta.url)
      .pathname;
    res.sendFile(path.resolve(filePath));
  });

  app.use("/pdf", router);
};

export default initPdfRoutes;
