import assert  from 'assert';

import { NodeCreator } from '../../../lib/node/Creator.js';
import { removeMultiplicationByNegativeOne } from '../../../lib/simplifyExpression/basicsSearch/removeMultiplicationByNegativeOne.js';
import { testSimplify } from './testSimplify.js';

describe('removeMultiplicationByNegativeOne', function() {
  const tests = [
    ['-1*x', '-x'],
    ['x^2*-1', '-x ^ 2'],
    ['2x*2*-1', '2 x * 2 * -1'], // does not remove multiplication by -1
  ];
  tests.forEach(t => testSimplify(t[0], t[1], removeMultiplicationByNegativeOne));
});

// to create nodes, for testing
const opNode = NodeCreator.operator;
const constNode = NodeCreator.constant;
const symbolNode = NodeCreator.symbol;
const unaryMinusNode = NodeCreator.unaryMinus;

describe('removeMultiplicationByNegativeOne', function() {
  it('should set addParenthesis for -1 * x = > -x', () => {
    const node = opNode('*', [
      unaryMinusNode(constNode(1)),symbolNode('x')]);
    const result = removeMultiplicationByNegativeOne(node);
    assert.strictEqual(result.newNode.toString(), '-x');
  });
});
