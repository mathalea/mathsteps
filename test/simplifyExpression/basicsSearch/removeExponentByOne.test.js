import { removeExponentByOne } from '../../../lib/simplifyExpression/basicsSearch/removeExponentByOne.js';

import { testSimplify } from './testSimplify.js';

describe('removeExponentByOne', function() {
  testSimplify('x^1', 'x', removeExponentByOne);
});
