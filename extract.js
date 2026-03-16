import fs from 'fs';
import path from 'path';

const constantsPath = './constants.tsx';
let constantsContent = fs.readFileSync(constantsPath, 'utf-8');

const contentDir = './content';
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir);
}

// Regex to match `export const CH... = { ... content: \`...\` };`
// Since the content can contain backticks, we need a robust way to extract it.
// We can use a simple state machine or regex.
const regex = /export const (CH\d+_[A-Z_]+): BlogPost = \{[\s\S]*?content: `([\s\S]*?)`\n\};\n/g;

let match;
let imports = [];
let replacements = [];

while ((match = regex.exec(constantsContent)) !== null) {
  const varName = match[1];
  const markdownContent = match[2];
  
  const filename = `${varName.toLowerCase()}.md`;
  const filepath = path.join(contentDir, filename);
  
  fs.writeFileSync(filepath, markdownContent);
  
  imports.push(`import ${varName}_CONTENT from './content/${filename}?raw';`);
  
  const originalBlock = match[0];
  const newBlock = originalBlock.replace(/content: `[\s\S]*?`\n\};\n/, `content: ${varName}_CONTENT\n};\n`);
  
  replacements.push({ original: originalBlock, new: newBlock });
}

// Apply replacements
let newConstantsContent = constantsContent;
for (const rep of replacements) {
  newConstantsContent = newConstantsContent.replace(rep.original, rep.new);
}

// Add imports to the top
newConstantsContent = imports.join('\n') + '\n\n' + newConstantsContent;

fs.writeFileSync(constantsPath, newConstantsContent);
console.log('Extraction complete!');
