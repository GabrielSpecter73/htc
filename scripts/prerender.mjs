import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const serverDir = path.join(root, 'dist', 'server');
const distIndexPath = path.join(root, 'dist', 'index.html');

const serverEntry = fs
  .readdirSync(serverDir)
  .find((f) => f.startsWith('entry-server') && f.endsWith('.js'));

if (!serverEntry) {
  throw new Error(`Não encontrei o bundle SSR em ${serverDir}`);
}

const { render } = await import(path.join(serverDir, serverEntry));
const appHtml = render();

const template = fs.readFileSync(distIndexPath, 'utf-8');
const finalHtml = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`
);

if (finalHtml === template) {
  throw new Error('Não encontrei <div id="root"></div> em dist/index.html — pré-renderização não foi aplicada.');
}

fs.writeFileSync(distIndexPath, finalHtml);
fs.rmSync(serverDir, { recursive: true, force: true });

console.log(`Pré-renderização concluída (${appHtml.length} caracteres injetados em dist/index.html).`);
