import mongoose, { Document, Model, Schema, Types } from "mongoose";

// Define the interface for the Product document
interface IProduct extends Document {
  name: string;
  description?: string;
  images: string[];
  price?: number;
  originalPrice?: number;
  brand?: string;
  material?: string;
  bracelet?: string;
  condition?: string;
  user?: Types.ObjectId;
  reviews: Types.ObjectId[];
  averageRating: number;
  numReviews: number;
  featured: boolean;
  movement: string;
  thickness: string;
  glass: string;
  luminova: string;
  casematerial: string;
  crown: string;
  bandsize: string;
  lugs: string;
  water: string;
  hasUserPurchased(userId: Types.ObjectId): Promise<boolean>;
}

// Define the schema
const productSchema: Schema<IProduct> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    description: {
      type: String,
    },
    images: [{ type: String }],
    price: {
      type: Number,
    },
    originalPrice: {
      type: Number,
    },
    brand: {
      type: String,
    },
    material: {
      type: String,
    },
    bracelet: {
      type: String,
    },
    condition: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    featured: {
      type: Boolean,
      default: false,
    },
    movement: {
      type: String,
      enum: [
        "Rolex 3235 Automatik Movement",
        "Rolex 3225 Automatik Movement",
        "Rolex 3245 Automatik Movement",
        "Rolex 3265 Automatik Movement",
        "Patek Philipe 5711 Automatik Movement",
        "Patek Philipe 5712G Automatik Movement",
        "Audemars Piguet 412513 Automatik Movement",
        "Audemars Piguet 414221 Automatik Movement",
      ],
      default: "Rolex 3235 Automatik Movement",
    },
    thickness: {
      type: String,
      default: "12mm",
    },
    glass: {
      type: String,
      default: "Sapphire Glass",
    },
    luminova: {
      type: String,
      default: "Yes",
    },
    casematerial: {
      type: String,
      enum: ["316L Stainless Steel", "904L Stainless Steel"],
      default: "316L Stainless Steel",
    },
    crown: {
      type: String,
      default: "Screwed",
    },
    bandsize: {
      type: String,
      default: "14.5cm - 22.5cm adjustable",
    },
    lugs: {
      type: String,
      default: "20mm",
    },
    water: {
      type: String,
      default: "3 ATM",
    },
  },
  { timestamps: true }
);

// Define the custom method
productSchema.methods.hasUserPurchased = async function (
  userId: Types.ObjectId
): Promise<boolean> {
  const Order = mongoose.model("Order");
  const order = await Order.findOne({
    user: userId,
    cartProducts: this._id,
    status: "delivered",
    paid: true,
  });
  return !!order;
};

// Define the model
export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
