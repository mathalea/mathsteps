const simplifyFractionSignsBefore = require('../../../lib/simplifyExpression/fractionsSearch/simplifyFractionSignsBefore');

const TestUtil = require('../../TestUtil');

function testSimplifyFractionSigns(exprStr, outputStr) {
  TestUtil.testSimplification(simplifyFractionSignsBefore, exprStr, outputStr);
}

function testSimplifyFractionSignsLatex(exprStr, outputStr) {
  TestUtil.testSimplificationLatex(simplifyFractionSignsBefore, exprStr, outputStr);
}

describe('simplify signs', function() {
  const tests = [
    ['-x / y', '-x / y'],
    ['x / -y', '-x / y'],
    ['-x / -y', 'x / y'],
  ];
  tests.forEach(t => testSimplifyFractionSigns(t[0], t[1]));
});

describe('simplify signs Latex', function() {
  const tests = [
    ['-4 / -5', '\\dfrac{4}{5}'],
    ['4 / -5', '\\dfrac{-4}{5}'],
    ['-x / y', '-\\dfrac{ x}{ y}'],
    ['x / -y', '-\\dfrac{ x}{ y}'],
    ['-x / -y', '\\dfrac{ x}{ y}'],
    ['y + -x / z', ' y - \\dfrac{ x}{ z}'],
    ['y + -x / -z', ' y+\\dfrac{ x}{ z}'],
  ];
  tests.forEach(t => testSimplifyFractionSignsLatex(t[0], t[1]));
});