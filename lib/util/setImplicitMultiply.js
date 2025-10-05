import { cloneDeepWithChangeGroup } from './cloneDeepWithChangGroup.js';

/**
 * Multiplication implicite:
 * 2*x devient 2x
 * 2*(x+3) devient 2(x+3)
 * 2*x^2 devient 2x^2
 * @param {MathNode} node
 * @returns {MathNode}
 */
export function setImplicityMultiplySign(node) {
  const copy = cloneDeepWithChangeGroup(node);
  let modif = false;
  copy.transform(function (nodeChild, path, parent) {
    if (nodeChild.type === 'OperatorNode' && nodeChild.op === '*') {
      if (
        (nodeChild.args[1].type === 'ParenthesisNode' || nodeChild.args[1].type === 'SymbolNode') ||
                (nodeChild.args[1].type === 'OperatorNode' && nodeChild.args[1].op === '^' && nodeChild.args[1].args[0].type === 'SymbolNode')
      ) {
        nodeChild.implicit = true;
        modif = true;
      }
      if (nodeChild.args[1].isOperatorNode && nodeChild.args[1].op === '^' && nodeChild.args[1].args[0].isSymbolNode) {
        nodeChild.args[1].implicit = true;
        modif = true;
      }
    }
    return nodeChild;
  });
  // if (modif) console.log('Found multiplication et modification:', copy.toString());
  return copy;
}
