import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Call backend API
    const response = await fetch('http://localhost:9006/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
      return NextResponse.json(
        { error: errorData.message || 'Login failed' },
        { status: response.status }
      );
    }

    const responseData = await response.json();

    console.log('🔍 Backend response data:', JSON.stringify(responseData, null, 2));

    // Backend might wrap response in { success, data, meta } format
    const data = responseData.data || responseData;

    if (!data.access_token) {
      console.error('❌ No access_token in backend response. Response keys:', Object.keys(data));
      console.error('❌ Full response structure:', Object.keys(responseData));
      return NextResponse.json(
        { error: 'No access token received' },
        { status: 500 }
      );
    }

    // Set cookies server-side
    const cookieStore = await cookies();

    cookieStore.set('auth_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    cookieStore.set('aluplan_access_token', data.access_token, {
      httpOnly: false, // Client-side accessible for API calls
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    if (data.refresh_token) {
      cookieStore.set('aluplan_refresh_token', data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Login API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
