import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;