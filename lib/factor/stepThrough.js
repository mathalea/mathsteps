import * as checks from '../checks/index.js';
import { factorQuadratic } from './factorQuadratic.js';
import { flattenOperands } from '../util/flattenOperands.js';
import { removeUnnecessaryParens} from '../util/removeUnnecessaryParens.js';


// Given a mathjs expression node, steps through factoring the expression.
// Currently only supports factoring quadratics.
// Returns a list of details about each step.
function stepThrough(node, debug=false) {
  if (debug) {
    // eslint-disable-next-line
    console.log('\n\nFactoring: ' + print.ascii(node, false, true));
  }

  if (checks.hasUnsupportedNodes(node)) {
    return [];
  }

  let nodeStatus;
  const steps = [];

  node = flattenOperands(node);
  node = removeUnnecessaryParens(node, true);
  if (checks.isQuadratic(node)) {
    nodeStatus = factorQuadratic(node);
    if (nodeStatus.hasChanged()) {
      steps.push(nodeStatus);
    }
  }
  // Add factoring higher order polynomials...

  return steps;
}

export {
  stepThrough
}
