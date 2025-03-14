/** @type {import('next').NextConfig} */

// This file runs before the Next.js build process
const { execSync } = require('child_process');

// Attempt to run Prisma generate before NextJS builds
try {
  console.log('🔄 Attempting to generate Prisma Client before Next.js build...');
  
  // Try with npx first
  try {
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('✅ Prisma Client generated successfully!');
  } catch (error) {
    console.error('❌ Error generating Prisma Client with npx:', error.message);
    
    // Try direct path as fallback
    try {
      const path = require('path');
      const fs = require('fs');
      const prismaPath = path.join(__dirname, 'node_modules', '.bin', 'prisma');
      
      if (fs.existsSync(prismaPath)) {
        console.log(`🔄 Attempting with direct path: ${prismaPath}`);
        execSync(`"${prismaPath}" generate`, { stdio: 'inherit' });
        console.log('✅ Prisma Client generated successfully with direct path!');
      } else {
        console.error('❌ Prisma binary not found at', prismaPath);
      }
    } catch (pathError) {
      console.error('❌ Failed to generate Prisma Client with direct path:', pathError.message);
    }
  }
} catch (e) {
  console.error('❌ Failed to run Prisma generation:', e.message);
  console.log('⚠️ Continuing with Next.js build anyway...');
}

const nextConfig = {
  reactStrictMode: true,
  // Used by Vercel to determine the install command
  experimental: {
    // Any experimental features can go here
  },
};

module.exports = nextConfig; 