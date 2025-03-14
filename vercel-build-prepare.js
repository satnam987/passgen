const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Vercel build preparation...');

try {
  // Check if prisma is globally installed
  try {
    console.log('Checking if Prisma is globally installed...');
    execSync('prisma -v', { stdio: 'inherit' });
    console.log('Prisma is globally installed.');
  } catch (error) {
    console.log('Prisma is not globally installed. Installing...');
    execSync('npm install -g prisma', { stdio: 'inherit' });
    console.log('Prisma installed globally.');
  }

  // Try running Prisma generate
  try {
    console.log('Running prisma generate...');
    execSync('prisma generate', { stdio: 'inherit' });
    console.log('Prisma generate completed successfully.');
  } catch (error) {
    console.log('Error running prisma generate directly. Trying with npx...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('Prisma generate with npx completed successfully.');
  }

  // Create a script to run prisma generate during build
  console.log('Creating a custom script for Prisma...');
  const customScript = `
    #!/bin/bash
    echo "Running custom Prisma script"
    export PATH="$PATH:./node_modules/.bin"
    npx prisma generate
  `;
  
  fs.writeFileSync('run-prisma.sh', customScript);
  execSync('chmod +x run-prisma.sh', { stdio: 'inherit' });
  console.log('Custom script created and made executable.');

  console.log('Vercel build preparation completed successfully!');
} catch (error) {
  console.error('Error during build preparation:', error);
  process.exit(1);
} 