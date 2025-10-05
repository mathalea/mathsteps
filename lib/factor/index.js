import math from '../node/MathjsInstance.js'
import { stepThrough } from './stepThrough.js'

function factorString(expressionString, debug=false) {
  let node;
  try {
    node = math.parse(expressionString);
  }
  catch (err) {
    return [];
  }

  if (node) {
    return stepThrough(node, debug);
  }
  return [];
}

export {
  factorString
}

