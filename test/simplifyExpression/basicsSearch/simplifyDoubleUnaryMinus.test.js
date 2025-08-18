const simplifyDoubleUnaryMinus = require('../../../lib/simplifyExpression/basicsSearch/simplifyDoubleUnaryMinus');

const testSimplify = require('./testSimplify');

describe('simplifyDoubleUnaryMinus', function() {
  var tests = [
      ['-(-5)', '5'],
      ['--5', '5'],
      ['-(-(5+2))', '(5 + 2)'],
      ['-(-5)', '5'],
      ['--x', '1 x'],
      ['--5x', '5 x'],
      ['-(-5x)', '5 x']
  ];
  tests.forEach(t => testSimplify(t[0], t[1], simplifyDoubleUnaryMinus));
});
