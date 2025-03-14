'use server';

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../lib/auth';

// Eén PrismaClient instantie voor de huidige request
const prisma = new PrismaClient();

export async function GET(request: Request) {
  console.log('GET /api/passwords - Ophalen van wachtwoorden');
  
  try {
    // Token uit de header halen
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('GET /api/passwords - Geen geldige authorizatie header');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    const userData = verifyToken(token);
    
    if (!userData) {
      console.log('GET /api/passwords - Ongeldige token');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Wachtwoorden ophalen voor de gebruiker
    const passwords = await prisma.password.findMany({
      where: {
        userId: userData.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    console.log(`GET /api/passwords - ${passwords.length} wachtwoorden gevonden`);
    
    return NextResponse.json(passwords);
  } catch (error) {
    console.error('GET /api/passwords - Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  console.log('POST /api/passwords - Nieuw wachtwoord opslaan');
  
  try {
    // Token uit de header halen
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('POST /api/passwords - Geen geldige authorizatie header');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    const userData = verifyToken(token);
    
    if (!userData) {
      console.log('POST /api/passwords - Ongeldige token');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Wachtwoordgegevens uit het request halen
    const { title, password } = await request.json();
    
    if (!title || !password) {
      console.log('POST /api/passwords - Ontbrekende gegevens:', { title, password: password ? '[REDACTED]' : 'missing' });
      return NextResponse.json({ error: 'Title and password are required' }, { status: 400 });
    }

    // Wachtwoord opslaan in de database
    const savedPassword = await prisma.password.create({
      data: {
        website: title,
        username: '', // Lege standaardwaarde voor backward compatibility
        password,
        userId: userData.id
      }
    });
    
    console.log('POST /api/passwords - Wachtwoord succesvol opgeslagen:', { id: savedPassword.id, title });
    
    return NextResponse.json(savedPassword);
  } catch (error) {
    console.error('POST /api/passwords - Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 