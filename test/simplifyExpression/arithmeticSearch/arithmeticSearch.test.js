import { arithmeticSearch } from '../../../lib/simplifyExpression/arithmeticSearch/index.js';
import { TestUtil } from '../../TestUtil.js';

function testArithmeticSearch(exprStr, outputStr) {
  TestUtil.testSimplification(arithmeticSearch, exprStr, outputStr);
}

describe('evaluate arithmeticSearch', function () {
  const tests = [
    ['2+2', '4'],
    ['2*3*5', '30'],
    ['6*6', '36'],
    ['9/4', '9 / 4'], //  does not divide
    ['16 - 1953125', '-1953109'], // verify large negative number round correctly
  ];
  // const node = math.parse('16 - 1953125')
  // console.log(math.format(node, { notation: 'fixed' }));
  // console.log(node.toString({ notation: 'fixed' }));
  tests.forEach(t => testArithmeticSearch(t[0], t[1]));
});
