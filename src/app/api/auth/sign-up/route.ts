import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import UserModel from '@/models/User';
import { sendOTPEmail } from '@/lib/email';

// In-memory OTP storage (in production, use Redis or database)
const otpStore = new Map<string, { otp: string; expires: number; email: string }>();

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { email, password, fullName, phone } = await request.json();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const otp = generateOTP();
    const expires = Date.now() + 5 * 60 * 1000;
    otpStore.set(email, { otp, expires, email });

    const user = new UserModel({
      email,
      password,
      fullName,
      phone: phone || '0000000000',
      isVerified: false,
      role: 'user',
    });

    await user.save();

    // Send OTP via email
    const emailResult = await sendOTPEmail(email, otp, fullName);
    
    if (!emailResult.success) {
      console.error('Failed to send OTP email:', emailResult.error);
      // In production, you might want to handle this more gracefully
      // For now, we'll continue but log the error
    }

    return NextResponse.json({
      message: 'User created successfully. Please verify your email with the OTP sent.',
      otp,
      userId: user._id,
      requiresVerification: true
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    const storedOTP = otpStore.get(email);
    if (!storedOTP) {
      return NextResponse.json(
        { error: 'OTP not found or expired' },
        { status: 400 }
      );
    }

    if (Date.now() > storedOTP.expires) {
      otpStore.delete(email);
      return NextResponse.json(
        { error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    if (storedOTP.otp !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await UserModel.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    otpStore.delete(email);

    return NextResponse.json({
      message: 'Email verified successfully',
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        isVerified: user.isVerified,
        role: user.role
      }
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const otp = generateOTP();
    const expires = Date.now() + 5 * 60 * 1000;

    otpStore.set(email, { otp, expires, email });

    // Send new OTP via email
    const emailResult = await sendOTPEmail(email, otp, user.fullName);
    
    if (!emailResult.success) {
      console.error('Failed to send OTP email:', emailResult.error);
      // In production, you might want to handle this more gracefully
      // For now, we'll continue but log the error
    }

    return NextResponse.json({
      message: 'New OTP sent successfully',
      otp
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
