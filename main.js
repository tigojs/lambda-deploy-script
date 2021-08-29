#!/usr/bin/env node
const { program } = require('commander');
const chalk = require('chalk');
const path = require('path');
const sendSaveRequest = require('./deploy');

const outputError = (...msg) => {
  const args = [];
  if (!msg.length) {
    return;
  }
  if (typeof msg[0] === 'string') {
    const str = msg.shift();
    args.push(chalk.red(str));
  }
  args.push(...msg);
  console.error(...args);
};

program
  .option('-t, --tigo-dev-config <tigoDevConfig>')
  .action(async (options) => {
    if (!options.tigoDevConfig) {
      outputError('Please specify the tigo dev config file.');
      return process.exit(-1);
    }
    const tigoDevConfigPath = path.resolve(process.cwd(), options.tigoDevConfig);
    try {
      await sendSaveRequest(tigoDevConfigPath);
    } catch (e) {
      outputError('Cannot deploy lambda.', e);
      return process.exit(-1);
    }
  });

program.parse();
