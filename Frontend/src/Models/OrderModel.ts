import { Customer } from "../types/Customer";
import { OrderItem } from "../types/OrderItems";

export class OrderModel {
  public _id: string;
  public customer: Customer;
  public items: OrderItem[];
  public subtotal: number;
  public tax: number;
  public shipping: number;
  public total: number;
  public shippingMethod: string;
  public orderStatus: string;
  public orderDate: Date;
  public expectedDeliveryDate: Date;
}
