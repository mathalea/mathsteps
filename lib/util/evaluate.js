// Evaluates a node to a numerical value
// e.g. the tree representing (2 + 2) * 5 would be evaluated to the number 20
// it's important that `node` does not contain any symbol nodes

function evaluate(node) {
  // TODO: once we swap in math-parser, call its evaluate function instead
  if (node.eval) return node.eval
  else if (node.evaluate) return node.evaluate
  else throw Error('node is not evaluable by eval() or evaluate() method')
}

module.exports = evaluate;
