import { rearrangeCoefficient } from '../../../lib/simplifyExpression/basicsSearch/rearrangeCoefficient.js';
import { testSimplify } from './testSimplify.js';

describe('rearrangeCoefficient', function() {
  const tests = [
    ['2 * x^2', '2 x ^ 2'],
    ['y^3 * 5', '5 y ^ 3'],
    ['x * 5', '5 x'],
    ['x * y + z', 'x y + z'],
    ['x * y', 'x y'],
    ['x * (-5)', '-5 x'],
  ];
  tests.forEach(t => testSimplify(t[0], t[1], rearrangeCoefficient));
});
