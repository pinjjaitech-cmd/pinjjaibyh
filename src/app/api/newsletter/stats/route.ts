import { NextRequest, NextResponse } from 'next/server';
import Newsletter from '@/models/Newsletter';
import dbConnect from '@/lib/db';

// GET - Get newsletter statistics
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get total subscribers count
    const totalSubscribers = await Newsletter.countDocuments();
    
    // Calculate date ranges
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of current week
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1); // Start of current month
    
    // Get subscribers for different time periods
    const [newToday, newThisWeek, newThisMonth] = await Promise.all([
      Newsletter.countDocuments({
        createdAt: { $gte: todayStart }
      }),
      Newsletter.countDocuments({
        createdAt: { $gte: weekStart }
      }),
      Newsletter.countDocuments({
        createdAt: { $gte: monthStart }
      })
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        totalSubscribers,
        newToday,
        newThisWeek,
        newThisMonth
      }
    });
    
  } catch (error) {
    console.error('Error fetching newsletter statistics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch newsletter statistics' },
      { status: 500 }
    );
  }
}
