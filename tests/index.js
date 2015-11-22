/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0, no-console: 0 */

import * as Bootstrap from './bootstrap';

console.log('===================================================================\n');
console.log('If you want to run other tests, don\'t forget ton include them in the "tests" array.');
console.log('of $ROOT/tests/index.js)');
console.log('\n===================================================================\n');

Bootstrap.setupEnv();

const tests = [
  require('./basic.spec.js'),
];
