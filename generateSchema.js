// generateSchema.js
const { exec } = require('child_process');

console.log('Generating Prisma schema...');

exec('npx prisma generate', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
  console.log('Prisma schema generated successfully!');
}); 