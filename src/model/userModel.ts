import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  phoneNumber: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          const trimmedValue = value.trim();
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegex.test(trimmedValue);
        },
        message: "Please enter a valid email address",
      },
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (value: string): boolean {
          const trimmedValue = value.trim();
          const phoneRegex = /^\d{10}$/;
          return phoneRegex.test(trimmedValue);
        },
        message: "Phone number must be exactly 10 digits long",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// userSchema.index({ phoneNumber: 1 });

userSchema.pre("save", function (next) {
  if (this.email) this.email = this.email.trim();
  if (this.phoneNumber) this.phoneNumber = this.phoneNumber.trim();
  if (this.password) this.password = this.password.trim();
  next();
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
