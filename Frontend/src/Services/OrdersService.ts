import axios from "axios";
import { OrderModel } from "../Models/OrderModel";
import { appConfig } from "../Utils/AppConfig";

class OrdersService {
  public async getOrders(): Promise<OrderModel[]> {
    const response = await axios.get<OrderModel[]>(appConfig.ordersUrl);
    const orders = response.data;
    return orders;
  }
  public async getOrder(_id: string): Promise<OrderModel> {
    const response = await axios.get<OrderModel>(appConfig.ordersUrl + _id);
    const order = response.data;
    return order;
  }
  public async addOrder(order: OrderModel): Promise<OrderModel> {
    const response = await axios.post<OrderModel>(appConfig.ordersUrl, order);
    const addedOrder = response.data;
    return addedOrder;
  }
  public async updateOrder(order: OrderModel): Promise<void> {
    const response = await axios.put<OrderModel>(
      appConfig.ordersUrl + order._id,
      order
    );
    const updatedOrder = response.data;
    console.log(updatedOrder);
  }
  public async deleteOrder(_id: string): Promise<void> {
    await axios.delete<OrderModel>(appConfig.ordersUrl + _id);
  }
}

export const ordersService = new OrdersService();
