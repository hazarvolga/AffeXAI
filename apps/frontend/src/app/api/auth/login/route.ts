import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('🔐 Login attempt for:', email);

    // Call backend API
    const response = await fetch('http://localhost:9006/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('🔐 Backend response status:', response.status, response.statusText);

    const responseData = await response.json();
    console.log('🔐 Backend response:', JSON.stringify(responseData, null, 2));

    // Handle error responses
    if (!response.ok) {
      const errorMessage =
        responseData.error?.message ||
        responseData.message ||
        responseData.error ||
        'Login failed';

      console.error('❌ Login failed:', errorMessage);
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    // Handle success: false responses (even with 200 status)
    if (responseData.success === false) {
      const errorMessage =
        responseData.error?.message ||
        responseData.message ||
        responseData.error ||
        'Login failed';

      console.error('❌ Login failed (success: false):', errorMessage);
      return NextResponse.json(
        { error: errorMessage },
        { status: 401 }
      );
    }

    // Backend wraps response in { success, data, meta } format
    const data = responseData.data || responseData;

    if (!data.access_token) {
      console.error('❌ No access_token in backend response');
      console.error('Response keys:', Object.keys(data));
      console.error('Full response structure:', Object.keys(responseData));
      return NextResponse.json(
        { error: 'No access token received from server' },
        { status: 500 }
      );
    }

    console.log('✅ Login successful, setting cookies');

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

    console.log('✅ Cookies set, returning login data');
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Login API route error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
