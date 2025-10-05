import * as canAddLikeTerms from '../lib/checks/canAddLikeTerms.js';
import { TestUtil } from './TestUtil.js';

function testCanBeAdded(expr, addable) {
  TestUtil.testBooleanFunction(
    canAddLikeTerms.canAddLikeTermPolynomialNodes, expr, addable);
}

describe('can add like term polynomials', () => {
  const tests = [
    ['x^2 + x^2', true],
    ['x + x', true],
    ['x^3 + x', false],
  ];
  tests.forEach(t => testCanBeAdded(t[0], t[1]));
});
