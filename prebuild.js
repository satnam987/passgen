#!/usr/bin/env node

// prebuild.js - Script to run before the build process
console.log('🚀 Starting prebuild script...');

const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Ensures the Prisma Client is generated before building
 */
function generatePrismaClient() {
  console.log('📊 Generating Prisma Client...');
  
  // Try multiple methods to find and run prisma
  const methods = [
    { name: 'NPX', cmd: 'npx', args: ['prisma', 'generate'] },
    { 
      name: 'Direct binary', 
      cmd: path.join(__dirname, 'node_modules', '.bin', 'prisma'), 
      args: ['generate']
    },
    { name: 'Global prisma', cmd: 'prisma', args: ['generate'] },
  ];

  let success = false;

  for (const method of methods) {
    console.log(`🔄 Attempting to generate Prisma Client using ${method.name}...`);
    
    try {
      const result = spawnSync(method.cmd, method.args, { 
        stdio: 'inherit',
        shell: true 
      });
      
      if (result.status === 0) {
        console.log(`✅ Successfully generated Prisma Client using ${method.name}!`);
        success = true;
        break;
      } else {
        console.log(`❌ Failed to generate Prisma Client using ${method.name}. Exit code: ${result.status}`);
      }
    } catch (error) {
      console.error(`❌ Error with ${method.name}:`, error.message);
    }
  }

  if (!success) {
    // Create an empty models folder for Prisma as a last resort
    try {
      const generatedDir = path.join(__dirname, 'node_modules', '.prisma', 'client');
      console.log(`⚠️ Creating fallback directory structure at ${generatedDir}`);
      
      if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir, { recursive: true });
      }
      
      // Create a marker file
      fs.writeFileSync(
        path.join(generatedDir, 'fallback-generated.txt'), 
        'This is a fallback file created because Prisma generate failed.'
      );
      
      console.log('⚠️ Created fallback structure - app functionality may be limited.');
    } catch (err) {
      console.error('❌ Failed to create fallback directory:', err);
    }
  }
}

// Run the Prisma generation
generatePrismaClient();

console.log('✨ Prebuild script completed!'); 