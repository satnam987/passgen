// generateSchema.js
const { exec } = require('child_process');
const path = require('path');

console.log('Generating Prisma schema...');

// Use the local path to npx in node_modules
const npxPath = path.resolve('./node_modules/.bin/npx');
console.log(`NPX path: ${npxPath}`);

// Try running with npx directly first
exec('npx prisma generate', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error with npx command: ${error}`);
    console.log('Trying with full path...');
    
    // If the first attempt fails, try with the full path
    exec(`"${npxPath}" prisma generate`, (err2, stdout2, stderr2) => {
      if (err2) {
        console.error(`Error with full path: ${err2}`);
        return;
      }
      console.log(`stdout: ${stdout2}`);
      console.log(`stderr: ${stderr2}`);
      console.log('Prisma schema generated successfully with full path!');
    });
    return;
  }
  
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
  console.log('Prisma schema generated successfully!');
}); 