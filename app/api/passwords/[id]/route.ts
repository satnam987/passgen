import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';

// PrismaClient met singleton patroon
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log(`DELETE /api/passwords/${params.id} - Wachtwoord verwijderen`);
  
  try {
    // Token uit de header halen
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log(`DELETE /api/passwords/${params.id} - Geen geldige authorizatie header`);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split(' ')[1];
    const userData = verifyToken(token);
    
    if (!userData) {
      console.log(`DELETE /api/passwords/${params.id} - Ongeldige token`);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Controleer of het wachtwoord bestaat en van de gebruiker is
    const password = await prisma.password.findUnique({
      where: {
        id: params.id
      }
    });

    if (!password) {
      console.log(`DELETE /api/passwords/${params.id} - Wachtwoord niet gevonden`);
      return NextResponse.json({ error: 'Password not found' }, { status: 404 });
    }

    if (password.userId !== userData.id) {
      console.log(`DELETE /api/passwords/${params.id} - Wachtwoord behoort niet tot de gebruiker`);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Wachtwoord verwijderen
    await prisma.password.delete({
      where: {
        id: params.id
      }
    });
    
    console.log(`DELETE /api/passwords/${params.id} - Wachtwoord succesvol verwijderd`);
    
    return NextResponse.json({ success: true, message: 'Wachtwoord is verwijderd' });
  } catch (error) {
    console.error(`DELETE /api/passwords/${params.id} - Error:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 