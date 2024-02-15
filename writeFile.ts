import { promises as fs } from 'fs';

const fileName = './text.txt';
const run = async () => {
  try {
    await fs.writeFile(fileName, 'hello world!');
    console.log('file was saved');
  } catch (error) {
    console.log(error);
  }
};

void run();
