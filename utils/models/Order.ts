import mongoose, { Document, Model, Schema, Types } from "mongoose";

// Define the interface for the CartProduct subdocument
interface ICartProduct {
  product: Types.ObjectId;
  quantity: number;
  price: number;
}

// Define the interface for the Order document
interface IOrder extends Document {
  name: string;
  email: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  country: string;
  paid: boolean;
  cartProducts: ICartProduct[];
  updatedAt: Date;
  status: string;
  total: number;
  user?: Types.ObjectId;
  createdAt: Date;
}

// Define the schema
const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the customer's full name"],
    },
    email: {
      type: String,
      required: [true, "Please provide the customer's email"],
    },
    city: {
      type: String,
      required: [true, "Please provide the city"],
    },
    postalCode: {
      type: String,
      required: [true, "Please provide the postal code"],
    },
    streetAddress: {
      type: String,
      required: [true, "Please provide the customer's address"],
    },
    country: {
      type: String,
      required: [true, "Please provide the country"],
    },
    paid: {
      type: Boolean,
      default: false,
    },
    cartProducts: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "payment_failed",
      ],
      default: "pending",
    },
    total: {
      type: Number,
      required: [true, "Total order amount is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Define the model
const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;
