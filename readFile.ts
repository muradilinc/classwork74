import { promises as fs } from 'fs';

const fileName = './test.json';

interface FileContent {
  message: string;
  author: string;
}

const run = async () => {
  try {
    const fileContents = await fs.readFile(fileName);
    const result = JSON.parse(fileContents.toString()) as FileContent;
    console.log('Result: ', result);
  } catch (error) {
    console.log(error);
  }
};

void run();
