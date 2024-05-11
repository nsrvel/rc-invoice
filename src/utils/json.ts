import fs from 'fs';

export const parseJSONFile = (filename: string): any => {
  // Read the file synchronously
  const jsonString = fs.readFileSync(filename, 'utf8');

  // Parse JSON string into JavaScript object
  const parsedObject = JSON.parse(jsonString);

  return parsedObject;
};
