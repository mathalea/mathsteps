const math = require('../node/MathjsInstance');

const checks = require('../checks');
const flattenOperands = require('../util/flattenOperands');
const print = require('../util/print');
const removeExp1 = require('../util/removeExp1');
const removeUnnecessaryParens = require('../util/removeUnnecessaryParens');
const stepThrough = require('./stepThrough');
const setImplicityMultiplySign = require('../util/setImplicitMultiply');


// Given a mathjs expression node, steps through simplifying the expression.
// Returns the simplified expression node.
function simplify(node, debug=false) {
  if (checks.hasUnsupportedNodes(node)) {
    return node;
  }

  const steps = stepThrough(node, debug);
  let simplifiedNode;
  if (steps.length > 0) {
    simplifiedNode = steps.pop().newNode;
  }
  else {
    // removing parens isn't counted as a step, so try it here
    simplifiedNode = removeUnnecessaryParens(flattenOperands(node), true);
  }
  // unflatten the node.
  return setImplicityMultiplySign(removeExp1(unflatten(simplifiedNode) ));
}

// Unflattens a node so it is in the math.js style, by printing and parsing it
// again
function unflatten(node) {
  return math.parse(print.ascii(node));
}


module.exports = simplify;
