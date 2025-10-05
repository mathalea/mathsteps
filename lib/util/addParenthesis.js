import { Creator, PolynomialTerm } from '../node/index.js';
import { NodeType } from '../node/Type.js';


function isNegatifTerm(node){
  if (PolynomialTerm.isPolynomialTerm(node)) {
    const polyTerm = new PolynomialTerm(node);
    const aValue = polyTerm.getCoeffValue();
    if (aValue < 0) {
      return true;
    }
  }
  return false;
}


/**
 * @param {MathNode} node
 * @returns {MathNode}
 */
function addParenthesis(node) {
  const copy = node.cloneDeep();
  let modif = false;
  copy.transform(function (nodeChild) {
    if (nodeChild.type === 'OperatorNode' && nodeChild.op === '*') {
      if (
        (NodeType.isUnaryMinus(nodeChild.args[1]) ||
                (NodeType.isConstant(nodeChild.args[1]) && nodeChild.args[1].value < 0) ||
                isNegatifTerm(nodeChild.args[1]) ||
                (NodeType.isOperator(nodeChild.args[1]) && (nodeChild.args[1].op === '+' || nodeChild.args[1].op === '-')))
      ) {
        const paren = Creator.parenthesis(nodeChild.args[1]);
        nodeChild.args[1] = paren;
        modif = true;
      }
    }
    else if (nodeChild.type === 'OperatorNode' && nodeChild.op === '^') {
      if (
        (NodeType.isUnaryMinus(nodeChild.args[0])) ||
                (NodeType.isConstantOrConstantFraction(nodeChild.args[0]) && nodeChild.args[0].value < 0) ||
                (NodeType.isOperator(nodeChild.args[0]))
      ) {
        const paren = Creator.parenthesis(nodeChild.args[0]);
        nodeChild.args[0] = paren;
        modif = true;
      }
    }
    return nodeChild;
  });
  // if (modif) console.log('Found multiplication et modification:', copy.toString());
  return copy;
}

export {
  addParenthesis
};
