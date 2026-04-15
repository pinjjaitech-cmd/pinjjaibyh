import { NextRequest, NextResponse } from 'next/server';
import Newsletter from '@/models/Newsletter';
import dbConnect from '@/lib/db';
import { z } from 'zod';

// Validation schema
const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// GET - Get all newsletter subscribers
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    // Build query
    let query: any = {};
    if (search) {
      query.email = { $regex: search, $options: 'i' };
    }
    
    const [subscribers, total] = await Promise.all([
      Newsletter.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Newsletter.countDocuments(query)
    ]);
    
    return NextResponse.json({
      success: true,
      data: subscribers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch newsletter subscribers' },
      { status: 500 }
    );
  }
}

// POST - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Validate input
    const validatedData = newsletterSchema.parse(body);
    
    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({
      email: validatedData.email.toLowerCase()
    });
    
    if (existingSubscriber) {
      return NextResponse.json(
        { success: false, error: 'Email already subscribed' },
        { status: 409 }
      );
    }
    
    // Create new subscriber
    const subscriber = await Newsletter.create({
      email: validatedData.email.toLowerCase()
    });
    
    return NextResponse.json({
      success: true,
      data: subscriber,
      message: 'Successfully subscribed to newsletter'
    });
    
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

// DELETE - Unsubscribe from newsletter
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }
    
    const result = await Newsletter.deleteOne({
      email: email.toLowerCase()
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Email not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
    
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    );
  }
}
