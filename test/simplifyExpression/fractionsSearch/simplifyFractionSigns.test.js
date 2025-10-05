import { simplifyFractionSigns } from '../../../lib/simplifyExpression/fractionsSearch/simplifyFractionSigns.js';

import { TestUtil } from '../../TestUtil.js';

function testSimplifyFractionSigns(exprStr, outputStr) {
  TestUtil.testSimplification(simplifyFractionSigns, exprStr, outputStr);
}

function testSimplifyFractionSignsLatex(exprStr, outputStr) {
  TestUtil.testSimplificationLatex(simplifyFractionSigns, exprStr, outputStr);
}

describe('simplify signs', function() {
  const tests = [
    ['-12x / -27', '12 x / 27'],
    ['x / -y', '-x / y'],
  ];
  tests.forEach(t => testSimplifyFractionSigns(t[0], t[1]));
});

describe('simplify signs Latex', function() {
  const tests = [
    ['-x / y', '\\dfrac{- x}{ y}'],
    ['x / -y', '\\dfrac{- x}{ y}'],
  ];
  tests.forEach(t => testSimplifyFractionSignsLatex(t[0], t[1]));
});