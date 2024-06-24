import { Document, Schema, model } from "mongoose";
import { Customer } from "../types/order-types/customer";
import { OrderItem } from "../types/order-types/order-item";

export interface IOrderModel extends Document {
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingMethod: string;
  orderStatus: string;
  orderDate: Date;
  expectedDeliveryDate: Date;
}

export const orderSchema = new Schema<IOrderModel>(
  {
    customer: {
      name: { type: String, required: [true, "Customer name is missing."] },
      email: { type: String, required: [true, "Email is missing."] },
      phone: { type: String, required: [true, "Customer Phone is missing."] },
      country: {
        type: String,
        required: [true, "Country is missing."],
      },
      city: {
        type: String,
        required: [true, "City Address is missing."],
      },
      street: {
        type: String,
        required: [true, "Street Address is missing."],
      },
      apartment: {
        type: String,
        required: [true, "Apartment is missing."],
      },
      paymentDetails: {
        type: { type: String, required: [true, "Payment type is missing."] },
        cardNumber: {
          type: String,
          required: [true, "Card number is missing."],
        },
        cvv: { type: String, required: [true, "Card cvv is missing."] },
        expirationDate: {
          type: String,
          required: [true, "Card expiration date is missing."],
          validate: {
            validator: function (value: string) {
              return /\d{2}\/\d{2}/.test(value);
            },
            message: "Invalid expiration date format. Must be in MM/YY format.",
          },
        },
      },
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: [true, "Product id is required."],
        },
        name: {
          type: String,
          required: [true, "Product name is missing."],
        },
        stock: [
          {
            stockId: {
              type: String,
              required: [true, "Stock id is required."],
            },
            quantity: {
              type: Number,
              required: [true, "Quantity is missing."],
            },
            color: {
              type: String,
              required: [true, "Color is missing."],
            },
            size: {
              type: String,
              required: [true, "Size is missing."],
            },
          },
        ],
        productType: {
          type: String,
          required: [true, "Product type missing."],
        },
        price: {
          type: Number,
          required: [true, "Price is required!."],
        },
        imageUrls: { type: [String], required: true },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      default: 17,
    },
    shipping: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },

    shippingMethod: {
      type: String,
      required: [true, "Shipping method is missing."],
    },
    orderStatus: {
      type: String,
      default: "Order Created",
    },
    orderDate: {
      type: Date,
      default: Date.now(),
    },
    expectedDeliveryDate: {
      type: Date,
      required: [true, "Expected delivery date is required."],
    },
  },
  {
    versionKey: false,
    id: false,
  }
);

export const OrderModel = model<IOrderModel>(
  "OrderModel",
  orderSchema,
  "orders"
);
