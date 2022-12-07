// Evaluates a node to a numerical value
// e.g. the tree representing (2 + 2) * 5 would be evaluated to the number 20
// it's important that `node` does not contain any symbol nodes

function evaluate(node) {
if (node.evaluate != null) return node.evaluate()
  else if (node.eval != null) return node.eval()
  else throw Error(`Problem, no method for evaluate this : ${node}`)
}

module.exports = evaluate;
