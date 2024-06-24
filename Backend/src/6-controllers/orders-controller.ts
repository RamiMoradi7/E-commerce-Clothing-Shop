import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import { OrderModel } from "../3-models/order-model";
import { ordersService } from "../5-services/orders-service";

class OrdersController {
  public readonly router = express.Router();
  public constructor() {
    this.registerRoutes();
  }
  private registerRoutes(): void {
    this.router.get("/orders", this.getOrders);
    this.router.get("/orders/:_id([a-f0-9A-F]{24})", this.getOrder);
    this.router.post("/orders", this.addOrder);
    this.router.put("/orders/:_id([a-f0-9A-F]{24})", this.updateOrder);
    this.router.delete("/orders/:_id([a-f0-9A-F]{24})", this.deleteOrder);
  }
  private async getOrders(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const orders = await ordersService.getOrders();
      response.json(orders);
    } catch (err: any) {
      next(err);
    }
  }
  private async getOrder(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      const order = await ordersService.getOrder(_id);
      response.json(order);
    } catch (err: any) {
      next(err);
    }
  }
  private async addOrder(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const order = new OrderModel(request.body);
      const addedOrder = await ordersService.addOrder(order);
      response.status(StatusCode.Created).json(addedOrder);
    } catch (err: any) {
      next(err);
    }
  }
  private async updateOrder(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      request.body._id = request.params._id;
      const { _id, orderStatus } = request.body;
      const updatedOrder = await ordersService.updateOrderStatus(
        _id,
        orderStatus
      );
      response.json(updatedOrder);
    } catch (err: any) {
      next(err);
    }
  }
  private async deleteOrder(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _id = request.params._id;
      await ordersService.deleteOrder(_id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
}

const ordersController = new OrdersController();
export const ordersRouter = ordersController.router;
