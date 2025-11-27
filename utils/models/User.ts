import mongoose, { Document, Model, Schema, Types } from "mongoose";

// Define the interface for the User document
interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional since it might not be required in all cases
  admin: boolean;
  profileImage: string;
  wishlist: Types.ObjectId[];
  notificationPreferences: {
    orderUpdates: boolean;
    promotions: boolean;
  };
  reviews: Types.ObjectId[];
}

// Define the schema
const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your full name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
  },
  password: {
    type: String,
    required: false, // Optional field
  },
  admin: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  notificationPreferences: {
    orderUpdates: { type: Boolean, default: true },
    promotions: { type: Boolean, default: false },
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Define the model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
