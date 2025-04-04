import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import User from "@/model/userModel";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

// Add CORS headers to all responses
function corsHeaders(response: NextResponse) {
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://pi-app-coral.vercel.app"
  );
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, phoneNumber, password } = body;

    //Validate required fields
    if (!email || !phoneNumber || !password) {
      const response = NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
      return corsHeaders(response);
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email.trim())) {
      const response = NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
      return corsHeaders(response);
    }

    //Validate phone number format (10-digit)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      const response = NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
      return corsHeaders(response);
    }

    //Validate password strength
    if (password.length < 8) {
      const response = NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
      return corsHeaders(response);
    }

    //Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ phoneNumber: phoneNumber.trim() }, { email: email.trim() }],
    });

    if (existingUser) {
      const response = NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
      return corsHeaders(response);
    }

    // Create new user
    const user = await User.create({
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      password: password,
    });

    // Send welcome email (if credentials are available)
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        const mailOptions = {
          from: `"Pi Network" <${emailUser}>`,
          to: email,
          subject: "Welcome to PI Network",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Welcome to Pi Network!</h2>
              <p>Hello <strong>${email.split("@")[0]}</strong>,</p>
              <p>Thank you for registering with us.</p>
              <p>Your account will be recovered by your phone number.</p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    // Return success response
    const response = NextResponse.json(
      { message: "Registration successful", id: user._id },
      { status: 201 }
    );
    return corsHeaders(response);
  } catch (error: unknown) {
    console.error("Error processing registration:", error);

    // Handle MongoDB validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      const response = NextResponse.json(
        { error: Object.values(error.errors).map((err) => err.message) },
        { status: 400 }
      );
      return corsHeaders(response);
    }

    //Handle duplicate key errors (User already exists)
    if (
      error instanceof mongoose.Error &&
      "code" in error &&
      error.code === 11000
    ) {
      const response = NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
      return corsHeaders(response);
    }

    // Default internal server error
    const errorResponse = NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
    return corsHeaders(errorResponse);
  }
}

// Add OPTIONS handler for CORS preflight
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://pi-app-coral.vercel.app",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400", // 24 hours cache for preflight
    },
  });
}
