import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import User from "@/model/userModel";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, phoneNumber, password } = body;

    //Validate required fields
    if (!email || !phoneNumber || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    //Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    //Validate phone number format (10-digit)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    //Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ phoneNumber: phoneNumber.trim() }, { email: email.trim() }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    //Create new user
    const user = await User.create({
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      password: password,
    });

    //Send welcome email (if credentials are available)
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: emailUser, pass: emailPass },
        });

        const mailOptions = {
          from: emailUser,
          to: email,
          subject: "Welcome to PI Network",
          html: `<p>Hello <strong>${
            email.split("@")[0]
          }</strong>,<br>Welcome!</p>`,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    //Return success response
    return NextResponse.json(
      { message: "Registration successful", id: user._id },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error processing registration:", error);

    //Handle MongoDB validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { error: Object.values(error.errors).map((err) => err.message) },
        { status: 400 }
      );
    }

    //Handle duplicate key errors (User already exists)
    if (
      error instanceof mongoose.Error &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    //Default internal server error
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
