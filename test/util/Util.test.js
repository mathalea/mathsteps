import assert from 'assert';

import { Util } from '../../lib/util/Util.js';

describe('appendToArrayInObject', function () {
  it('creates empty array', function () {
    const object = {};
    Util.appendToArrayInObject(object, 'key', 'value');
    assert.deepEqual(
      object,
      {'key': ['value']}
    );
  });
  it('appends to array if it exists', function () {
    const object = {'key': ['old_value']};
    Util.appendToArrayInObject(object, 'key', 'new_value');
    assert.deepEqual(
      object,
      {'key': ['old_value', 'new_value']}
    );
  });
});
