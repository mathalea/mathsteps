import { removeDivisionByOne } from '../../../lib/simplifyExpression/basicsSearch/removeDivisionByOne.js';
import { testSimplify } from './testSimplify.js';

describe('removeDivisionByOne', function() {
  testSimplify('x/1', 'x', removeDivisionByOne);
});
