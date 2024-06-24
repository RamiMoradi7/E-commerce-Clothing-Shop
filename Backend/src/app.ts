import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import { appConfig } from "./2-utils/app-config";
import { dal } from "./2-utils/dal";
import { errorsMiddleware } from "./4-middleware/errors-middleware";
import { loggerMiddleware } from "./4-middleware/logger-middleware";
import { audiencesRouter } from "./6-controllers/audiences-controller";
import { authRouter } from "./6-controllers/auth-controller";
import { brandsRouter } from "./6-controllers/brands-controller";
import { categoriesRouter } from "./6-controllers/categories-controller";
import { clothSizeRouter } from "./6-controllers/cloth-sizes.controller";
import { colorsRouter } from "./6-controllers/colors-controller";
import { productsRouter } from "./6-controllers/products-controller";
import { shoeSizesRouter } from "./6-controllers/shoe-sizes-controller";
import { subCategoriesRouter } from "./6-controllers/sub-categories-controller";
import { ordersRouter } from "./6-controllers/orders-controller";

// Main application class:
class App {
  private server = express();
  // Start app:
  public async start(): Promise<void> {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(expressFileUpload());
    this.server.use(loggerMiddleware.logToConsole);

    this.server.use(
      "/api",
      authRouter,
      categoriesRouter,
      subCategoriesRouter,
      audiencesRouter,
      brandsRouter,
      colorsRouter,
      clothSizeRouter,
      shoeSizesRouter,
      productsRouter,
      ordersRouter
    );
    this.server.use(errorsMiddleware.routeNotFound);
    this.server.use(errorsMiddleware.catchAll);
    await dal.connect();

    this.server.listen(appConfig.port, () =>
      console.log("Listening on http://localhost:" + appConfig.port)
    );
  }
}

const app = new App();
app.start();
