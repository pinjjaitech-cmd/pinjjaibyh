import { NextRequest, NextResponse } from 'next/server';
import Newsletter from '@/models/Newsletter';
import dbConnect from '@/lib/db';
import { z } from 'zod';

// Validation schema for bulk operations
const bulkOperationSchema = z.object({
  emails: z.array(z.string().email('Invalid email address')).min(1, 'At least one email is required'),
});

// POST - Bulk subscribe emails to newsletter
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Validate input
    const validatedData = bulkOperationSchema.parse(body);
    
    // Normalize emails to lowercase
    const normalizedEmails = validatedData.emails.map(email => email.toLowerCase());
    
    // Filter out existing subscribers
    const existingEmails = await Newsletter.find({
      email: { $in: normalizedEmails }
    }).select('email').lean();
    
    const existingEmailSet = new Set(existingEmails.map(sub => sub.email));
    const newEmails = normalizedEmails.filter(email => !existingEmailSet.has(email));
    
    if (newEmails.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'All emails are already subscribed',
        data: {
          subscribed: [],
          alreadySubscribed: normalizedEmails
        }
      });
    }
    
    // Bulk insert new subscribers
    const newSubscribers = await Newsletter.insertMany(
      newEmails.map(email => ({ email }))
    );
    
    return NextResponse.json({
      success: true,
      message: `Successfully subscribed ${newSubscribers.length} email(s)`,
      data: {
        subscribed: newSubscribers,
        alreadySubscribed: Array.from(existingEmailSet)
      }
    });
    
  } catch (error) {
    console.error('Error bulk subscribing to newsletter:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid email addresses provided' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to bulk subscribe to newsletter' },
      { status: 500 }
    );
  }
}

// DELETE - Bulk unsubscribe emails from newsletter
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    // Validate input
    const validatedData = bulkOperationSchema.parse(body);
    
    // Normalize emails to lowercase
    const normalizedEmails = validatedData.emails.map(email => email.toLowerCase());
    
    // Bulk delete subscribers
    const result = await Newsletter.deleteMany({
      email: { $in: normalizedEmails }
    });
    
    return NextResponse.json({
      success: true,
      message: `Successfully unsubscribed ${result.deletedCount} email(s)`,
      data: {
        deletedCount: result.deletedCount,
        requestedEmails: normalizedEmails
      }
    });
    
  } catch (error) {
    console.error('Error bulk unsubscribing from newsletter:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid email addresses provided' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to bulk unsubscribe from newsletter' },
      { status: 500 }
    );
  }
}
