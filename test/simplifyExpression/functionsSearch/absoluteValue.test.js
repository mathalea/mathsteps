import { absoluteValue } from '../../../lib/simplifyExpression/functionsSearch/absoluteValue.js';
import { TestUtil } from '../../TestUtil.js';

function testAbsoluteValue(exprString, outputStr) {
  TestUtil.testSimplification(absoluteValue, exprString, outputStr);
}

describe('abs', function () {
  const tests = [
    ['abs(4)', '4'],
    ['abs(-5)', '5'],
  ];
  tests.forEach(t => testAbsoluteValue(t[0], t[1]));
});
