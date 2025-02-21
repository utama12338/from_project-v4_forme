import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;
    console.log('Sending data:', body);
    
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        viewHistory: false,
        canCreateuser: false,
        canCreate: false,
        canEdit: false,
        canDelete: false,
        role: 'USER',
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Register endpoint error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}