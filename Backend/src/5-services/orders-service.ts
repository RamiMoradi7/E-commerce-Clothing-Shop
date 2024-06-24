import { cyber } from "../2-utils/cyber";
import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
import { IOrderModel, OrderModel } from "../3-models/order-model";
import { OrderItem } from "../types/order-types/order-item";
import {
  accessoriesService,
  clothesService,
  shoesService,
} from "./base-products-service";

class OrdersService {
  public async getOrders(): Promise<IOrderModel[]> {
    return OrderModel.find().exec();
  }

  public async getOrder(_id: string): Promise<IOrderModel> {
    const order = await OrderModel.findById(_id).exec();
    if (!order) {
      throw new ResourceNotFoundError(_id);
    }
    return order;
  }

  public async addOrder(order: IOrderModel): Promise<IOrderModel> {
    const errors = order.validateSync();
    if (errors) {
      throw new ValidationError(errors.message);
    }

    order.customer.paymentDetails.cardNumber = cyber.hashPaymentCard(
      order.customer.paymentDetails.cardNumber
    );
    const savedOrder = await OrderModel.create(order);
    order = await this.getOrder(savedOrder._id);
    await this.processOrder(order.items);
    return order;
  }

  public async processOrder(orderItems: OrderItem[]): Promise<void> {
    for (const orderItem of orderItems) {
      switch (orderItem.productType) {
        case "Cloth":
          await clothesService.updateProductStock(orderItem);
          break;
        case "Shoe":
          await shoesService.updateProductStock(orderItem);
          break;
        case "Accessory":
          await accessoriesService.updateProductStock(orderItem);
          break;
      }
    }
  }

  public async updateOrderStatus(
    orderId: string,
    orderStatus: string
  ): Promise<IOrderModel> {
    const order = await OrderModel.findById(orderId).exec();
    if (!order) {
      throw new ResourceNotFoundError(orderId);
    }
    order.orderStatus = orderStatus;
    const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, order, {
      new: true,
    });
    return updatedOrder;
  }

  public async deleteOrder(_id: string): Promise<void> {
    const orderToDelete = await OrderModel.findByIdAndDelete(_id);
    if (!orderToDelete) {
      throw new ResourceNotFoundError(_id);
    }
  }
}

export const ordersService = new OrdersService();
