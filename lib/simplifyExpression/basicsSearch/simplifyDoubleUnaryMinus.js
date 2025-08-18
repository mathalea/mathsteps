const ChangeTypes = require('../../ChangeTypes');
const Node = require('../../node');

// Simplifies two unary minuses in a row by removing both of them.
// e.g. -(- 4) --> 4
function simplifyDoubleUnaryMinus(node) {
  if (Node.Type.isOperator(node) && node.op ==='*' && Node.Type.isUnaryMinus(node.args[0]) && Node.Type.isConstant(node.args[0].args[0])) {
    const newNode = node.cloneDeep();
    newNode.args[0] = Node.Creator.constant(node.args[0].args[0].value * -1);
    return Node.Status.nodeChanged(
      ChangeTypes.RESOLVE_DOUBLE_MINUS, node, newNode);
  }
  if (!Node.Type.isUnaryMinus(node)) {
    return Node.Status.noChange(node);
  }
  const unaryArg = node.args[0];
  // e.g. in - -x, -x is the unary arg, and we'd want to reduce to just x
  if (Node.Type.isUnaryMinus(unaryArg)) {
    const newNode = unaryArg.args[0].cloneDeep();
    return Node.Status.nodeChanged(
      ChangeTypes.RESOLVE_DOUBLE_MINUS, node, newNode);
  }
  // e.g. - -4, -4 could be a constant with negative value
  else if (Node.Type.isConstant(unaryArg)) {
    const newNode = unaryArg.cloneDeep();
    newNode.value = -1 * newNode.value; // negate the value
    return Node.Status.nodeChanged(
      ChangeTypes.RESOLVE_DOUBLE_MINUS, node, newNode);
  }
  // e.g. -(-(5+2)) -> 5 + 2
  //      -(-5)  -> 5
  //      -(-x)  -> x
  else if (Node.Type.isParenthesis(unaryArg)) {
    const parenthesisNode = unaryArg;
    const parenthesisContent = parenthesisNode.content;
    if (Node.Type.isUnaryMinus(parenthesisContent) && Node.Type.isParenthesis(parenthesisContent.args[0])) {
      const newNode = Node.Creator.parenthesis(parenthesisContent.args[0].content);
      return Node.Status.nodeChanged(
        ChangeTypes.RESOLVE_DOUBLE_MINUS, node, newNode);
    } else if (Node.Type.isUnaryMinus(parenthesisContent)) {
      const newNode = Node.Creator.parenthesis(parenthesisContent.args[0]);
      return Node.Status.nodeChanged(
        ChangeTypes.RESOLVE_DOUBLE_MINUS, node, newNode);
    } else if (Node.Type.isConstant(parenthesisContent)) {
      const newNode = Node.Creator.constant(parenthesisContent.value * -1)
      return Node.Status.nodeChanged(
        ChangeTypes.RESOLVE_DOUBLE_MINUS, node, newNode);
    } else if (Node.Type.isSymbol(parenthesisContent)) {
      const newNode = Node.Creator.symbol(parenthesisContent.name)
      return Node.Status.nodeChanged(
        ChangeTypes.RESOLVE_DOUBLE_MINUS, node, newNode);
    }
  }
  return Node.Status.noChange(node);
}

module.exports = simplifyDoubleUnaryMinus;
