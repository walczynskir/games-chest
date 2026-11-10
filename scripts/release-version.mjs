import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const at = path => new URL(path, root);
const read = path => readFileSync(at(path), 'utf8');
const write = (path, content) => writeFileSync(at(path), content);
const has = path => existsSync(at(path));
const dist = has('dist/index.html') ? 'dist/' : '';
const argument = process.argv[2];
const checking = argument === '--check';
const version = checking ? read('VERSION').trim() : argument;
const semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
if (!semver.test(version || '')) {
  throw new Error('Użycie: node scripts/release-version.mjs X.Y.Z lub --check');
}
if (checking && process.env.GITHUB_REF_TYPE === 'tag' && process.env.GITHUB_REF_NAME !== `v${version}`) {
  throw new Error('Tag wydania różni się od VERSION.');
}

if (has('scripts/version.mjs')) {
  execFileSync(process.execPath, [at('scripts/version.mjs').pathname, argument], { stdio: 'inherit' });
}

if (has('package.json')) {
  const packageJson = read('package.json');
  const packageVersion = JSON.parse(packageJson).version;
  if (packageVersion && packageVersion !== version) {
    if (checking) throw new Error('Wersja package.json różni się od VERSION.');
    write('package.json', packageJson.replace(/("version"\s*:\s*")[^"]+/, `$1${version}`));
  }
}

const indexPath = dist + 'index.html';
const index = read(indexPath);
const footer = /(<span\b[^>]*\bid="footer-version"[^>]*>)v[^<]+(<\/span>)/;
const updatedIndex = index.replace(footer, `$1v${version}$2`);
if (index !== updatedIndex) {
  if (checking) throw new Error('Wersja stopki różni się od VERSION.');
  write(indexPath, updatedIndex);
}

const manifest = dist + 'version.json';
if (checking) {
  if (JSON.parse(read(manifest)).version !== version) {
    throw new Error('Publiczny version.json różni się od VERSION.');
  }
} else {
  write('VERSION', version + '\n');
  write(manifest, JSON.stringify({ version }, null, 2) + '\n');
}
console.log(`Wersja ${version} jest gotowa do oznaczenia tagiem v${version}.`);
