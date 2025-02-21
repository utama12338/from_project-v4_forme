// // app/actions/auth.ts
// 'use server'
// import { AuthError } from 'next-auth';
// import { signIn } from '@/auth';
// type AuthResult = {
//     error?: string;
//     success?: boolean;
//   };
//   export async function authenticate(
//     username: string, 
//     password: string
//   ): Promise<AuthResult> {
//     try {
//       const result = await signIn('credentials', {
//         username,
//         password,
//         redirect: false
//       });
  
//       if (!result) {
//         return { error: 'Authentication failed' };
//       }
  
//       if (result.error) {
//         return { error: result.error };
//       }
  
//       return { success: true };
//     } catch (error) {
//       console.error('Authentication error:', error);
//       return { 
//         error: error instanceof AuthError 
//           ? 'Invalid credentials' 
//           : 'An unexpected error occurred' 
//       };
//     }
//   }