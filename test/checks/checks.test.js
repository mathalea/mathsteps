import assert  from 'assert';

import { ChangeTypes } from '../../lib/ChangeTypes.js';
import * as checks from '../../lib/checks/index.js';
import { Equation } from '../../lib/equation/Equation.js';
import {solveEquationString as solveEquation} from '../../lib/solveEquation/index.js';
import { TestUtil } from '../TestUtil.js';

function testCanCombine(exprStr, canCombine) {
  TestUtil.testBooleanFunction(checks.canSimplifyPolynomialTerms, exprStr, canCombine);
}

function testCanCrossMultiplication(exprStr, canCombine) {
  const equation = Equation.createEquationFromString(exprStr, '=');
  const cross = checks.canCrossMultiplication(equation);
  assert.equal(cross, canCombine);
}

function testSolveCrossMultiplication(exprStr, outputStr, debug=false, changeType) {
  const steps = solveEquation(exprStr, debug);
  const lastStep = steps[steps.length -1].newEquation.ascii();
  it(exprStr + ' -> ' + outputStr, (done) => {
    assert.equal(lastStep, outputStr);
    done();
  });

  if (changeType){
    let changeFound = '';
    steps.forEach(step => {
      if (changeType === step.changeType) {
        changeFound = step.changeType;
      }
    });
    it(changeType + ' -> ' + changeFound, (done) => {
      assert.equal(changeFound, changeType);
      done();
    });
  }
}

describe('canSimplifyPolynomialTerms multiplication', function() {
  const tests = [
    ['x^2 * x * x', true],
    // false b/c coefficient
    ['x^2 * 3x * x', false],
    ['y * y^3', true],
    ['5 * y^3', false], // just needs flattening
    ['5/7 * x', false], // just needs flattening
    ['5/7 * 9 * x', false],
  ];
  tests.forEach(t => testCanCombine(t[0], t[1]));
});


describe('canSimplifyPolynomialTerms addition', function() {
  const tests = [
    ['x + x',  true],
    ['4y^2 + 7y^2 + y^2',  true],
    ['4y^2 + 7y^2 + y^2 + y',  false],
    ['y',  false],
  ];
  tests.forEach(t => testCanCombine(t[0], t[1]));
});

describe('canCrossMultiplication detection', function() {
  const tests = [
    ['2/x = 4/9',  true],
    ['x/2 = 4/9',  false],
    ['2/(7x) = 4/9',  true],
    ['2/7 = 4/x',  true],
    ['2/2 = x/4',  false],
    ['4/9 = 2/(7x)',  true],
  ];
  tests.forEach(t => testCanCrossMultiplication(t[0], t[1]));
});

describe('canCrossMultiplication detection', function() {
  const tests = [
    ['2/x = 4/9',  'x = 9 / 2', ChangeTypes.CROSS_PRODUCT_EQUALITY],
  ];
  tests.forEach(t => testSolveCrossMultiplication(t[0], t[1], false, t[2]));
});
