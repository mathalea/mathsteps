import math from '../node/MathjsInstance.js';
import { stepThrough } from './stepThrough.js';


function simplifyExpressionString(expressionString, debug=false) {
  let exprNode;
  try {
    exprNode = math.parse(expressionString);
  }
  catch (err) {
    return [];
  }
  if (exprNode) {
    return stepThrough(exprNode, debug);
  }
  return [];
}

export {
  simplifyExpressionString,
}

