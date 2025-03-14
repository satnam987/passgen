const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build preparation...');

try {
  console.log('Preparing Prisma environment...');
  
  // Try running Prisma generate with npx
  try {
    console.log('Running prisma generate with npx...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('Prisma generate completed successfully with npx.');
  } catch (error) {
    console.error('Error running prisma generate with npx:', error);
    
    // If npx fails, try finding the binary directly
    console.log('Trying to locate prisma binary...');
    const prismaPath = path.resolve('./node_modules/.bin/prisma');
    console.log(`Checking for prisma at: ${prismaPath}`);
    
    if (fs.existsSync(prismaPath)) {
      console.log('Found prisma binary, trying direct execution...');
      execSync(`"${prismaPath}" generate`, { stdio: 'inherit' });
      console.log('Prisma generate completed successfully with direct path.');
    } else {
      console.log('Prisma binary not found at expected location.');
      throw new Error('Could not locate prisma binary');
    }
  }

  console.log('Vercel build preparation completed successfully!');
} catch (error) {
  console.error('Error during build preparation:', error);
  // Don't exit with error - let the build continue
  console.log('Continuing build despite Prisma errors...');
} 