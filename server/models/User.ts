import mongoose, { Document } from "mongoose";

export interface userDocument extends Document {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model<userDocument>("User", userSchema);
export default User;

// Auto hash password before saving.
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }

  next();
});
