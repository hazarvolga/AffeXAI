import { NextResponse } from 'next/server';

// Health check endpoint for the frontend
export async function GET() {
  try {
    // Try to connect to the backend API
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9005/api';
    
    // Return health status
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      frontend: 'running',
      backendUrl: backendUrl,
      message: 'Frontend is running successfully'
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      frontend: 'running',
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Frontend is running but there may be connectivity issues'
    }, { status: 500 });
  }
}