import assert from 'assert';

import * as print from '../../../lib/util/print.js';
import { TestUtil } from '../../TestUtil.js';


function testSimplify(exprStr, outputStr, simplifyOperation) {
  it(exprStr + ' -> ' + outputStr, function () {
    const inputNode = TestUtil.parseAndFlatten(exprStr);
    const newNode = simplifyOperation(inputNode).newNode;
    assert.equal(
      print.ascii(newNode),
      outputStr);
  });
}

export {
  testSimplify
};
