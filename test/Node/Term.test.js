import assert from 'assert';

import { Term } from '../../lib/node/Term.js';
import { NodeCreator } from '../../lib/node/Creator.js';
import { NodeType } from '../../lib/node/Type.js';

// Helper: baseNodeFunc for symbol nodes
const isSymbol = node => node.type === 'SymbolNode';

describe('Term.getCoeffValue', () => {
    it('returns coefficient value when coefficient is present', () => {
        // 2x
        const node = NodeCreator.operator('*', [
            NodeCreator.constant(2),
            NodeCreator.symbol('x')
        ]);
        const term = new Term(node, isSymbol);
        assert.strictEqual(term.getCoeffValue(), 2);
    });

    it('returns 1 when coefficient is absent', () => {
        // x
        const node = NodeCreator.symbol('x');
        const term = new Term(node, isSymbol);
        assert.strictEqual(term.getCoeffValue(), 1);
    });

    it('returns evaluated value for fraction coefficient', () => {
        // (3/4)x
        const fraction = NodeCreator.operator('/', [
            NodeCreator.constant(3),
            NodeCreator.constant(4)
        ]);
        const node = NodeCreator.operator('*', [
            fraction,
            NodeCreator.symbol('x')
        ]);
        const term = new Term(node, isSymbol);
        assert.ok(Math.abs(term.getCoeffValue() - 0.75) < 1e-10);
    });

    it('returns negative coefficient value', () => {
        // -5x
        const unaryMinus = NodeCreator.unaryMinus(
            NodeCreator.operator('*', [
                NodeCreator.constant(5),
                NodeCreator.symbol('x')
            ])
        );
        const term = new Term(unaryMinus, isSymbol);
        assert.strictEqual(term.getCoeffValue(), -5);
    });

    it('returns 3/5 x => true', () => {
        // (3/5)x
        const fraction = NodeCreator.operator('/', [
            NodeCreator.constant(3),
            NodeCreator.constant(5)
        ]);
        const node = NodeCreator.operator('*', [
            fraction,
            NodeCreator.symbol('x')
        ]);
        const baseNodeFunc = function(node) {
            return NodeType.isSymbol(node);
        };

        const term = Term.isTerm(node, baseNodeFunc);
        assert.ok(term);
    });

       it('returns (3/5) x => true', () => {
        // (3/5)x
        const fraction = NodeCreator.operator('/', [
            NodeCreator.constant(3),
            NodeCreator.constant(5)
        ]);
        const node = NodeCreator.operator('*', [
            NodeCreator.parenthesis(fraction),
            NodeCreator.symbol('x')
        ]);
        const baseNodeFunc = function(node) {
            return NodeType.isSymbol(node);
        };

        const term = Term.isTerm(node, baseNodeFunc);
        assert.ok(term);
    });
});