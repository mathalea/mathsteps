import * as canAddLikeTerms from './canAddLikeTerms.js';
import { canMultiplyLikeTermPolynomialNodes } from './canMultiplyLikeTermPolynomialNodes.js';
import { canRearrangeCoefficient } from './canRearrangeCoefficient.js';

// Returns true if the node is an operation node with parameters that are
// polynomial terms that can be combined in some way.
function canSimplifyPolynomialTerms(node) {
  return (canAddLikeTerms.canAddLikeTermPolynomialNodes(node) ||
          canMultiplyLikeTermPolynomialNodes(node) ||
          canRearrangeCoefficient(node));
}

export {
  canSimplifyPolynomialTerms
} 
