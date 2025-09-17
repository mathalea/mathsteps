const { Creator } = require('../node');
const NodeType = require('../node/Type');

/**
 * Multiplication implicite:
 * 2*x devient 2x 
 * 2*(x+3) devient 2(x+3)
 * 2*x^2 devient 2x^2
 * @param {MathNode} node 
 * @returns {MathNode}
 */
function addParenthesis(node) {
    const copy = node.cloneDeep()
    let modif = false;  
    copy.transform(function (nodeChild, path, parent) {
        if (nodeChild.type === 'OperatorNode' && nodeChild.op === '*') {
            if (
                (NodeType.isUnaryMinus(nodeChild.args[1]) ||
                (NodeType.isConstant(nodeChild.args[1]) && nodeChild.args[1].value < 0) ||
                (NodeType.isOperator(nodeChild.args[1]) && nodeChild.args[1].op !== '*'))
            ) {
                const paren = Creator.parenthesis(nodeChild.args[1])
                nodeChild.args[1] = paren
                modif = true
            }
        } else if (nodeChild.type === 'OperatorNode' && nodeChild.op === '^') {
            if (
                (NodeType.isUnaryMinus(nodeChild.args[0])) ||
                (NodeType.isConstantOrConstantFraction(nodeChild.args[0]) && nodeChild.args[0].value < 0) ||
                (NodeType.isOperator(nodeChild.args[0]))
            ) {
                const paren = Creator.parenthesis(nodeChild.args[0])
                nodeChild.args[0] = paren
                modif = true
            }
        }
        return nodeChild;
    });
    // if (modif) console.log('Found multiplication et modification:', copy.toString());
    return copy;
}

module.exports = addParenthesis;
