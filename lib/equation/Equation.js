const math = require('../node/MathjsInstance');

const printNode = require('../util/print');
const setImplicityMultiplySign = require('../util/setImplicitMultiply');

// This represents an equation, made up of the leftNode (LHS), the
// rightNode (RHS) and a comparator (=, <, >, <=, or >=)
class Equation {
  constructor(leftNode, rightNode, comparator) {
    this.leftNode = setImplicityMultiplySign(leftNode);
    this.rightNode = setImplicityMultiplySign(rightNode);
    this.comparator = comparator;
  }

  // Prints an Equation properly using the print module
  ascii(showPlusMinus=false, forceMultiplySign=false) {
    const leftSide = printNode.ascii(this.leftNode, showPlusMinus, forceMultiplySign);
    const rightSide = printNode.ascii(this.rightNode, showPlusMinus, forceMultiplySign);
    const comparator = this.comparator;

    return `${leftSide} ${comparator} ${rightSide}`;
  }

  // Prints an Equation properly using LaTeX
  latex(showPlusMinus=false) {
    const leftSide = printNode.latex(this.leftNode, showPlusMinus);
    const rightSide = printNode.latex(this.rightNode, showPlusMinus);
    const comparator = this.comparator;
    return `${leftSide} ${comparator?.replaceAll('>=', '\\geqslant')
            .replaceAll('<=', '\\leqslant')} ${rightSide}`;
  }

  clone() {
    const newLeft = this.leftNode.cloneDeep();
    const newRight = this.rightNode.cloneDeep();
    return new Equation(newLeft, newRight, this.comparator);
  }
}

// Splits a string on the given comparator and returns a new Equation object
// from the left and right hand sides
Equation.createEquationFromString = function(str, comparator) {
  const sides = str.split(comparator);
  if (sides.length !== 2) {
    throw Error('Expected two sides of an equation using comparator: ' +
      comparator);
  }
  const leftNode = math.parse(sides[0]);
  const rightNode = math.parse(sides[1]);

  return new Equation(leftNode, rightNode, comparator);
};

module.exports = Equation;
