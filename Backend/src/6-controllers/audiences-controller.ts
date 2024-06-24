import express, { NextFunction, Request, Response } from "express";
import { AudienceModel } from "../3-models/audience-model";
import { StatusCode } from "../3-models/enums";
import { audiencesService } from "../5-services/audiences-service";

class AudiencesController {
  public readonly router = express.Router();
  public constructor() {
    this.registerRoutes();
  }
  private registerRoutes(): void {
    this.router.get("/audiences", this.getAudiences);
    this.router.get("/audiences/:_id([a-f0-9A-F]{24})", this.getAudience);
    this.router.post("/audiences", this.addAudience);
    this.router.put("/audiences/:_id([a-f0-9A-F]{24})", this.updateAudience);
    this.router.delete("/audiences/:_id([a-f0-9A-F]{24})", this.deleteAudience);
  }
  private async getAudiences(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const audiences = await audiencesService.getAudiences();
      response.json(audiences);
    } catch (err: any) {
      next(err);
    }
  }
  private async getAudience(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const audience = await audiencesService.getAudience(_id);
      response.json(audience);
    } catch (err: any) {
      next(err);
    }
  }
  private async addAudience(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const audience = new AudienceModel(request.body);
      const addedAudience = await audiencesService.addAudience(audience);
      response.status(StatusCode.Created).json(addedAudience);
    } catch (err: any) {
      next(err);
    }
  }
  private async updateAudience(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body._id = request.params._id;
      const audience = new AudienceModel(request.body);
      const updatedAudience = await audiencesService.updateAudience(audience);
      response.json(updatedAudience);
    } catch (err: any) {
      next(err);
    }
  }
  private async deleteAudience(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await audiencesService.deleteAudience(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const audiencesController = new AudiencesController();
export const audiencesRouter = audiencesController.router;
