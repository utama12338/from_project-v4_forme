// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import { cookies } from 'next/headers';
// import { PrismaAuthAdapter } from '../../adapters/prisma-auth.adapter';

// const authAdapter = new PrismaAuthAdapter();
// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// export async function GET() {
//   try {
//     const cookieStore =  await  cookies();
//     const accessToken = cookieStore.get('access-token')?.value;

//     if (!accessToken) {
//       return NextResponse.json(
//         { message: 'No active session' },
//         { status: 401 }
//       );
//     }

//     try {
//       // Verify token
//       const decoded = jwt.verify(accessToken, JWT_SECRET) as { userId: string; role: string };
      
//       // Check if token is valid in database
//       const tokenRecord = await authAdapter.findUserToken(accessToken);
      
//       if (!tokenRecord || tokenRecord.isRevoked) {
//         return NextResponse.json(
//           { message: 'Session expired' },
//           { status: 401 }
//         );
//       }

//       // Get user data
//       const user = await authAdapter.findUserById(decoded.userId);
      
//       if (!user) {
//         return NextResponse.json(
//           { message: 'User not found' },
//           { status: 401 }
//         );
//       }

//       // Update last used timestamp
//       await authAdapter.updateTokenLastUsed(accessToken);

//       // Remove sensitive data
    
//       const { password: _password, ...safeUser } = user;

//       return NextResponse.json({
//         session: {
//           user: safeUser,
//           expires: tokenRecord.expiresAt
//         }
//       }, { status: 200 });

//     } catch (error) {
//       if (error instanceof jwt.JsonWebTokenError) {
//         return NextResponse.json(
//           { message: 'Invalid token' },
//           { status: 401 }
//         );
//       }
//       throw error;
//     }

//   } catch (error) {
//     console.error('Session error:', error);
//     return NextResponse.json(
//       { message: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
