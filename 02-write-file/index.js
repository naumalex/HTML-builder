const fs = require('fs');
const { stdout, stdin } = process;
let writer = fs.createWriteStream('./02-write-file/entered-text.txt');
stdout.write('Please enter text:\n');
stdin.on('data', (data) => {
  if (data.toString() === 'exit\r\n') {
    process.exit();
  }
  writer.write(data);
});
process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => stdout.write('\nData has been sent to file.'));
