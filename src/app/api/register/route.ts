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

    // Validate required fields
    if (!email || !phoneNumber || !password) {
      return NextResponse.json(
        { error: "Email, phone number, and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Validate phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      return NextResponse.json(
        { error: "Phone number must be exactly 10 digits" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ phoneNumber: phoneNumber.trim() }, { email: email.trim() }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this phone number or email already exists." },
        { status: 409 }
      );
    }

    // Create user with email
    const user = await User.create({
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      password: password,
    });

    // Get email credentials from environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error("Email credentials not configured properly");
      // Continue with registration even if email fails
    } else {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for 587
          auth: {
            user: emailUser,
            pass: emailPass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        function extractName(email: string): string {
          return email.replace(
            /@gmail\.com$|@163\.com|@qq\.com|@sina\.com|@sohu\.com|@aliyun\.com|@foxmail\.com|@tom\.com|@yeah\.net/g,
            ""
          );
        }

        const mailOptions = {
          from: emailUser,
          to: email,
          subject: "Welcome to PI Network Email Service Recovery",
          text: "",
          html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">Welcome to Our Service!</h2>
      <p style="font-size: 16px; color: #555;">Hello <strong>${extractName(
        user.email
      )}</strong>,</p>
      <p style="font-size: 16px; color: #555;">Your email recovery request has been received. It will be processed within <strong>72 hours</strong>.</p>
      <p style="font-size: 16px; color: #555;">If you didn't request this, please contact our support team immediately.</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="pi.network.ap@gmail.com" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">
          Contact Support
        </a>
      </div>
      <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">Best regards,<br><strong>The PI Network Team</strong></p>
    </div>
  `,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
        // Continue with registration even if email fails
      }
    }

    return NextResponse.json(
      {
        message: "Registration successful",
        id: user._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing registration:", error);

    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = Object.values(error.errors)
        .filter(
          (err): err is mongoose.Error.ValidatorError =>
            err instanceof mongoose.Error.ValidatorError
        )
        .map((err) => err.message);

      return NextResponse.json({ error: validationErrors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
