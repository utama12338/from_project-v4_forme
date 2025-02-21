import { NextResponse } from 'next/server';
import { PrismaAuthAdapter } from '../../adapters/prisma-auth.adapter';

import { cookies } from 'next/headers';

const authAdapter = new PrismaAuthAdapter();

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access-token')?.value;
    const refreshToken = cookieStore.get('refresh-token')?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { message: 'No tokens found' },
        { status: 400 }
      );
    }

    // Invalidate tokens
    await authAdapter.invalidateUserToken(accessToken);
    await authAdapter.invalidateUserToken(refreshToken);

    // Clear cookies
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
    response.cookies.set('access-token', '', { maxAge: -1 });
    response.cookies.set('refresh-token', '', { maxAge: -1 });

    return response;
  } catch (error) {
    console.error('logout endpoint error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
