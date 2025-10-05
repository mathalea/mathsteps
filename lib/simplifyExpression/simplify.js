import * as checks from '../checks/index.js';
import math from '../node/MathjsInstance.js';
import { flattenOperands } from '../util/flattenOperands.js';
import * as print from '../util/print.js';
import { removeExp1 } from '../util/removeExp1.js';
import { removeUnnecessaryParens } from '../util/removeUnnecessaryParens.js';
import { setImplicityMultiplySign } from '../util/setImplicitMultiply.js';
import { stepThrough } from './stepThrough.js';


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


export {
  simplify
};

