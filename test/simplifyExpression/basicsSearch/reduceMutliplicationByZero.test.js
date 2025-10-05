import { reduceMultiplicationByZero } from '../../../lib/simplifyExpression/basicsSearch/reduceMultiplicationByZero.js';
import { testSimplify } from './testSimplify.js';

describe('reduce multiplication by 0', function () {
  const tests = [
    ['0*x', '0'],
    ['0 x', '0'],
    ['2*0*z^2','0'],
  ];
  tests.forEach(t => testSimplify(t[0], t[1], reduceMultiplicationByZero));
});
