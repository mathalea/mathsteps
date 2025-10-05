import assert from 'assert';
import math from '../../lib/node/MathjsInstance.js';
import { addParenthesis } from '../../lib/util/addParenthesis.js';
import { NodeCreator } from '../../lib/node/Creator.js';


// to create nodes, for testing
const opNode = NodeCreator.operator;
const constNode = NodeCreator.constant;
const symbolNode = NodeCreator.symbol;
const parenNode = NodeCreator.parenthesis;

describe('addParenthesis', () => {
    it('should set addParenthesis for 2*-x => 2 * (-x)', () => {
        const node = math.parse('2*-x');
        const result = addParenthesis(node);
        assert.strictEqual(result.toString(), '2 * (-x)');
    });

    it('should set addParenthesis for 2 * node(x+3) = > 2 * (x + 3)', () => {
        const node = opNode('*', [
            constNode(2),
            parenNode(opNode('+', [symbolNode('x'), constNode(3)]))
        ]);
        const result = addParenthesis(node);
        assert.strictEqual(result.toString(), '2 * (x + 3)');
    });

    it('should set addParenthesis for node(2 + x) ^2 = > (2 + x) ^ 2', () => {
        const node = opNode('^', [
            parenNode(opNode('+', [constNode(2), symbolNode('x')])),
            constNode(2)
        ]);
        const result = addParenthesis(node);
        assert.strictEqual(result.toString(), '(2 + x) ^ 2');
    });
});