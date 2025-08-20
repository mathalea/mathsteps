const assert = require('assert');
const math = require('../../lib/node/MathjsInstance');
const setImplicityMultiplySign = require('../../lib/util/setImplicitMultiply');

describe('setImplicityMultiplySign', () => {
    it('should set implicit multiply for 2*x', () => {
        const node = math.parse('2*x');
        const result = setImplicityMultiplySign(node);
        assert.strictEqual(result.toString(), '2 x');
    });

    it('should set implicit multiply for 2*(x+3)', () => {
        const node = math.parse('2*(x+3)');
        const result = setImplicityMultiplySign(node);
        assert.strictEqual(result.toString(), '2 (x + 3)');
    });

    it('should set implicit multiply for 2*x^2', () => {
        const node = math.parse('2*x^2');
        const result = setImplicityMultiplySign(node);
        assert.strictEqual(result.toString(), '2 x ^ 2');
    });

    it('should not set implicit multiply for 2+3', () => {
        const node = math.parse('2+3');
        const result = setImplicityMultiplySign(node);
        assert.strictEqual(result.toString(), '2 + 3');
    });

    it('should not set implicit multiply for x^2', () => {
        const node = math.parse('x^2');
        const result = setImplicityMultiplySign(node);
        assert.strictEqual(result.toString(), 'x ^ 2');
    });
});