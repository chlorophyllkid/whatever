/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const path = require('path');
const fs = require('fs');
const glob = require('glob');
const shell = require('shelljs');
const sass = require('node-sass');
const tildeImporter = require('node-sass-tilde-importer');
const log = require('../utils/log');

const srcFolder = 'src';
const distFolder = 'app';
const excludePattern = /ˆ$/;

function shorten(str) {
  let result = str.replace(/\.\.\//g, '');
  result = result.replace(/\//g, path.sep);
  return result;
}

function build(module) {
  const file = path.parse(module);
  const targetDir = file.dir.replace(srcFolder, distFolder);

  sass.render({
    file: module,
    importer: [tildeImporter],
    outFile: path.join(targetDir, `${file.name}.css`),
    outputStyle: 'expanded',
    sourceMap: true,
    includePaths: ['node_modules'],
  }, (error, result) => {
    if (error) {
      log.error('css', error);
    } else {
      if (!fs.existsSync(targetDir)) { shell.mkdir('-p', targetDir); }
      fs.writeFileSync(path.join(targetDir, `${file.name}.css`), result.css);
      fs.writeFileSync(path.join(targetDir, `${file.name}.css.map`), result.map);
    }
  });
}

function rebuild(event, module) {
  if (event === 'remove') {
    log.fileChange('css', 'remove', module);

    const targetPath = module.replace(srcFolder, distFolder).replace('.scss', '.css');
    if (fs.existsSync(targetPath)) {
      log.fileChange('css', 'remove', targetPath);
      fs.unlinkSync(targetPath);
    }
  } else {
    log.fileChange('css', 'build', module);
    build(module);
  }
}

async function run() {
  await new Promise((cssResolve) => {
    glob(`${srcFolder}/**/*.scss`, async (error, files) => {
      if (error) {
        log.error('css', error);
      } else {
        const modules = files.filter(file => !excludePattern.test(file));
        await Promise.all(modules.map(module => build(module)));

        cssResolve();
      }
    });
  });
}

if (require.main === module) run();

exports.rebuild = rebuild;
exports.run = run;
