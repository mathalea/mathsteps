import assert from 'assert';

import { Equation } from '../lib/equation/Equation.js';
import math from '../lib/node/MathjsInstance.js';
import { TestUtil } from './TestUtil.js';


/**
 *
 * @param {*} left : NodeMath
 * @param {*} right : NodeMath
 * @param {*} comp : string
 * @returns
 */
function constructAndPrintEquation(left, right, comp) {
  const leftNode = math.parse(left);
  const rightNode = math.parse(right);
  const equation = new Equation(leftNode, rightNode, comp);
  return equation.ascii();
}

function constructAndPrintLatexEquation(left, right, comp) {
  const rightNode = TestUtil.parseAndFlatten(right);
  const leftNode = TestUtil.parseAndFlatten(left);
  const equation = new Equation(leftNode, rightNode, comp);
  return equation.latex();
}

function testLatexprint(left, right, comp, output) {
  it (output, () => {
    assert.equal(
      constructAndPrintLatexEquation(left, right, comp), output
    );
  });
}

function testEquationConstructor(left, right, comp, output) {
  it (output, () => {
    assert.equal(
      constructAndPrintEquation(left, right, comp), output
    );
  });
}

describe('Equation constructor', () => {
  const tests = [
    ['2*x^2 + x', '4', '=', '2 x ^ 2 + x = 4'],
    ['x^2 + 2*x + 2', '0', '>=', 'x ^ 2 + 2 x + 2 >= 0'],
    ['2*x - 1', '0', '<=', '2 x - 1 <= 0'],
    ['2x - 1', '0', '<=', '2 x - 1 <= 0'],
    ['0 x - 1', '0', '<=', '0 x - 1 <= 0']
  ];
  tests.forEach(t => testEquationConstructor(t[0], t[1], t[2], t[3]));
});

describe('Latex printer', () => {
  const tests = [
    ['2*x^2 + x', '4', '=', '2 { x}^{2}+ x = 4'],
    ['x^2 + 2*y + 2', '0', '>=', '{ x}^{2}+2 y+2 \\geqslant 0'],
    ['2x - 1', '0', '<=', '2 x - 1 \\leqslant 0'],
    ['2x - 1', '0', '<=', '2 x - 1 \\leqslant 0'],
    ['0 x - 1', '0', '<=', '0 x - 1 \\leqslant 0']
  ];
  tests.forEach(t => testLatexprint(t[0], t[1], t[2], t[3]));
});
