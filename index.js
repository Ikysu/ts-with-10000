#!/usr/bin/env node

// Usage: npx ts-with-10000 my-app

const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];

const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);
fs.mkdirSync(projectDir, { recursive: true });

const templateDir = path.resolve(__dirname, 'template');
fs.cpSync(templateDir, projectDir, { recursive: true });

fs.renameSync(
    path.join(projectDir, 'gitignore'),
    path.join(projectDir, '.gitignore')
);

fs.renameSync(
    path.join(projectDir, 'devcontainer'),
    path.join(projectDir, '.devcontainer')
);

const projectPackageJson = require(path.join(projectDir, 'package.json'));
projectPackageJson.name = projectName;

fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(projectPackageJson, null, 2)
);

console.log('Success! Your new project is ready.');
console.log(`Created ${projectName} at ${projectDir}`);