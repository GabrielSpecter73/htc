import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

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

const { render } = await import(pathToFileURL(path.join(serverDir, serverEntry)).href);
const appHtml = render();

const template = fs.readFileSync(distIndexPath, 'utf-8');
const finalHtml = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`
);

// O bundle (React + app) passa a carregar depois da primeira pintura. O HTML pré-renderizado já mostra a
// página inteira e as entradas do hero são CSS; sem isso o celular simulado do PageSpeed punha a execução
// do JS (≈150 kB gzip) no caminho do LCP. Dois requestAnimationFrame = depois do 1º quadro pintado; a hidratação começa ~2 quadros depois.
const moduleTag = /<script type="module" crossorigin src="([^"]+)"><\/script>/;
const bundleSrc = finalHtml.match(moduleTag)?.[1];
if (!bundleSrc) {
  throw new Error('Não encontrei o <script type="module"> do bundle em dist/index.html.');
}
const loader =
  `<script>requestAnimationFrame(function(){requestAnimationFrame(function(){var s=document.createElement('script');` +
  `s.type='module';s.crossOrigin='anonymous';s.src='${bundleSrc}';document.head.appendChild(s)})})</script>`;
const htmlWithLoader = finalHtml.replace(moduleTag, loader);

if (finalHtml === template) {
  throw new Error('Não encontrei <div id="root"></div> em dist/index.html — pré-renderização não foi aplicada.');
}

fs.writeFileSync(distIndexPath, htmlWithLoader);
fs.rmSync(serverDir, { recursive: true, force: true });

console.log(`Pré-renderização concluída (${appHtml.length} caracteres injetados em dist/index.html).`);
