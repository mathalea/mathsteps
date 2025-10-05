import math from '../../lib/node/MathjsInstance.js';
import * as print from '../../lib/util/print.js';
import { removeUnnecessaryParens } from '../../lib/util/removeUnnecessaryParens.js';
import { TestUtil } from '../TestUtil.js';

function testRemoveUnnecessaryParens(exprStr, outputStr) {
  const input = removeUnnecessaryParens(math.parse(exprStr));
  TestUtil.testFunctionOutput(print.ascii, input, outputStr);
}

describe('removeUnnecessaryParens', function () {
  const tests = [
    ['x-(2/y)', 'x - 2 / y'],
    ['x-(-2/y)', 'x - -2 / y'],
    ['(2x)^2', '(2 x) ^ 2'],
    ['(25)*x', '25 x'],
    ['x*(-2)', 'x * -2'],
    ['x-(y/2)', 'x - 1 / 2 y'],
    ['(x+4) + 12', 'x + 4 + 12'],
    ['-(x+4x) + 12', '-(x + 4 x) + 12'],
    ['x + (12)', 'x + 12'],
    ['x + (y)', 'x + y'],
    ['x + -(y)', 'x - y'],
    ['((3 - 5)) * x', '(3 - 5) x'],
    ['((3 - 5)) * (x)', '(3 - 5) x'],
    ['(((-5)))', '-5'],
    ['((4+5)) + ((2^3))', '(4 + 5) + 2 ^ 3'],
    ['(2x^6 + -50 x^2) - (x^4)', '2 x ^ 6 - 50 x ^ 2 - x ^ 4'],
    ['(x+4) - (12 + x)', 'x + 4 - (12 + x)'],
    ['((4+x)-5)^(2)', '(4 + x - 5) ^ 2'],
  ];
  tests.forEach(t => testRemoveUnnecessaryParens(t[0], t[1]));
});
