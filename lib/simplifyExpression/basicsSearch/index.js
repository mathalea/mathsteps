/*
 * Performs simpifications that are more basic and overaching like (...)^0 => 1
 * These are always the first simplifications that are attempted.
 */

import * as Node from '../../node/index.js';
import { TreeSearch } from '../../TreeSearch.js';

import { convertMixedNumberToImproperFraction } from './convertMixedNumberToImproperFraction.js';
import { rearrangeCoefficient } from './rearrangeCoefficient.js';
import { reduceExponentByZero } from './reduceExponentByZero.js';
import { reduceMultiplicationByZero } from './reduceMultiplicationByZero.js';
import { reduceZeroDividedByAnything } from './reduceZeroDividedByAnything.js';
import { removeAdditionOfZero } from './removeAdditionOfZero.js';
import { removeDivisionByOne } from './removeDivisionByOne.js';
import { removeExponentBaseOne } from './removeExponentBaseOne.js';
import { removeExponentByOne } from './removeExponentByOne.js';
import { removeMultiplicationByNegativeOne } from './removeMultiplicationByNegativeOne.js';
import { removeMultiplicationByOne } from './removeMultiplicationByOne.js';
import { simplifyDoubleUnaryMinus } from './simplifyDoubleUnaryMinus.js';


const SIMPLIFICATION_FUNCTIONS = [
  // convert mixed numbers to improper fractions
  convertMixedNumberToImproperFraction,
  // multiplication by 0 yields 0
  reduceMultiplicationByZero,
  // division of 0 by something yields 0
  reduceZeroDividedByAnything,
  // ____^0 --> 1
  reduceExponentByZero,
  // Check for x^1 which should be reduced to x
  removeExponentByOne,
  // Check for 1^x which should be reduced to 1
  // if x can be simplified to a constant
  removeExponentBaseOne,
  // - - becomes +
  simplifyDoubleUnaryMinus,
  // If this is a + node and one of the operands is 0, get rid of the 0
  removeAdditionOfZero,
  // If this is a * node and one of the operands is 1, get rid of the 1
  removeMultiplicationByOne,
  // In some cases, remove multiplying by -1
  removeMultiplicationByNegativeOne,
  // If this is a / node and the denominator is 1 or -1, get rid of it
  removeDivisionByOne,
  // e.g. x*5 -> 5x
  rearrangeCoefficient,
];

const search = TreeSearch.preOrder(basics);

// Look for basic step(s) to perform on a node. Returns a Node.Status object.
function basics(node) {
  for (let i = 0; i < SIMPLIFICATION_FUNCTIONS.length; i++) {
    const nodeStatus = SIMPLIFICATION_FUNCTIONS[i](node);
    if (nodeStatus.hasChanged()) {
      return nodeStatus;
    }
    else {
      node = nodeStatus.newNode;
    }
  }
  return Node.Status.noChange(node);
}

export {
  search as basicsSearch,
}
