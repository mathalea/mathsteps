const Equation = require('../equation/Equation.js');
const Node = require('../node/index.js');

/**
 * Returns true if the equation is a proportion that can be solved
 * by cross multiplication, e.g. 3/x = 8/9
 * @param {Equation} equation
 * @returns {boolean}
 */
function canCrossMultiplication(equation) {
  if (equation.comparator !== '=') return false;

  const left = equation.leftNode;
  const right = equation.rightNode;

  const isDivide = Node.Type.isOperator(left, '/') && Node.Type.isOperator(right, '/');

  if (!(isDivide)) {
    return false;
  }

  // 2/x = 4/9 => return true
  // x/2 = 4/9 => return false
  // 2/(7x) = 4/9 => return true
  if (Node.Type.isConstantOrConstantFraction(left.args[0]) &&
       Node.PolynomialTerm.isPolynomialTerm(left.args[1]) &&
       Node.Type.isConstantOrConstantFraction(right.args[0]) &&
       Node.Type.isConstantOrConstantFraction(right.args[1])){
    return true;
  }
  // 2/7 = 4/x => return true
  // 2/2 = x/4 => return false
  // 4/9 = 2/(7x) => return true
  if (Node.Type.isConstantOrConstantFraction(left.args[0]) &&
       Node.Type.isConstantOrConstantFraction(left.args[1]) &&
       Node.Type.isConstantOrConstantFraction(right.args[0]) &&
       Node.PolynomialTerm.isPolynomialTerm(right.args[1])){
    return true;
  }
  return false;
}

module.exports = canCrossMultiplication;

