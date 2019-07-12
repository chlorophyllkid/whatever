/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const path = require('path');
const fs = require('fs');
const glob = require('glob');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const log = require('../utils/log');

const srcFolder = 'src';
const distFolder = 'app';
const excludePattern = /ˆ$/;

function shorten(str) {
  let result = str.replace(/\.\.\//g, '');
  result = result.replace(/\//g, path.sep);
  return result;
}

function dashCaseToCamelCase(str) {
  return str.replace(/(-\w)/g, m => m[1].toUpperCase());
}

async function build(module) {
  const file = path.parse(module);
  const targetDir = file.dir.replace(srcFolder, distFolder);
  const moduleName = dashCaseToCamelCase(file.name);

  const bundle = await rollup.rollup({
    input: module,
    plugins: [
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: [['@babel/preset-env', { modules: false }]],
      }),
      resolve(),
      commonjs(),
    ],
  }).catch(error => log.error('javascript', error));

  const outputOptions = {
    name: moduleName,
    format: 'iife',
    file: path.join(targetDir, `${file.name}.js`),
    sourcemap: true,
    intro: `document.addEventListener('DOMContentLoaded',function(){${moduleName}()});`,
  };

  if (bundle) {
    await bundle.write(outputOptions);
  }
}

async function rebuild(event, module) {
  if (event === 'remove') {
    log.fileChange('javascript', 'remove', module);

    const targetPath = module.replace(srcFolder, distFolder);
    if (fs.existsSync(targetPath)) {
      log.fileChange('javascript', 'remove', targetPath);
      fs.unlinkSync(targetPath);
    }
  } else {
    log.fileChange('javascript', 'build', module);
    build(module);
  }
}

async function run() {
  await new Promise((jsResolve) => {
    glob(`${srcFolder}/**/*.js`, async (error, files) => {
      if (error) {
        log.error('javascript', error);
      } else {
        const modules = files.filter(file => !excludePattern.test(file));
        await Promise.all(modules.map(async (module) => {
          await build(module);
        }));

        jsResolve();
      }
    });
  });
}

if (require.main === module) run();

exports.rebuild = rebuild;
exports.run = run;
