import math from '../node/MathjsInstance.js'

/**
 * 
 * @param node 
 * @returns 
 * @Example
 * Exemple :
 * const expr = math.parse('2 * x^1 + (y^1)^1')
 * const simplified = removeExp1(expr)
 * console.log('Avant :', expr.toString())       // "2 * (x ^ 1) + ((y ^ 1) ^ 1)"
 * console.log('Après :', simplified.toString()) // "2 * x + y"
 * console.log('Après TEX :', simplified.toTex()) // "2 \\cdot x + y"
 */
function removeExp1(node) {
  const copy = node.cloneDeep()
  return node.transform(function (child, path, parent) {
    // Vérifie si on est sur un noeud d'opérateur "^"
    if (child.isOperatorNode && child.op === '^') {
      const [base, exponent] = child.args
      // Vérifie si l'exposant est un ConstantNode égal à 1
      if (exponent.isConstantNode && exponent.value === 1) {
        return base // remplace "x^1" par "x"
      }
    }
    return child
  })
}

export {
  removeExp1
}
