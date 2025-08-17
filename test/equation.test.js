const assert = require('assert');
const math = require('mathjs');

const TestUtil = require('./TestUtil');

const Equation = require('../lib/equation/Equation');

function searchLastNode (node) {
  if (node.type === 'OperatorNode') {
    return searchLastNode(node.args[node.args.length - 1])
  } else if (node.type === 'ParenthesisNode') {
    return searchLastNode(node.content)
  } else {
    return node
  }
}

/**
 * 
 * @param {*} left : NodeMath
 * @param {*} right : NodeMath
 * @param {*} comp : string
 * @returns
 */
function constructAndPrintEquation(left, right, comp) {
  const leftNode = math.parse(left);
  leftNode.transform(function (node, path, parent) {
    // Peut-être faut-il mettre à jour le mathjs de mathsteps car il semble que le code suivant ne fonctionne pas
    // dans mathsteps lorsqu'il est placé dans print de mathsteps
    // alors qu'il fonctionne avec la version mathjs de mathalea
    if (node.type === 'OperatorNode' && node.op === '*') { // Multiplication implicite 2*x devient 2x et 2*(x+3) devient 2(x+3)
      console.log('==============')
      console.log(node.toString())
      console.log(node)
      if ((node.args[1].type === 'ParenthesisNode' || node.args[1].type === 'SymbolNode')) {
        console.log('==============')
        console.log(node.toString())
        console.log(node)
        node.implicit = true
      }
      if (node.args[1].type === 'OperatorNode' && node.args[1].op === '^' && node.args[1].args[0].type === 'SymbolNode') node.implicit = true
    }
    return node;
  });
  const rightNode = math.parse(right);
  const equation = new Equation(leftNode, rightNode, comp);
  return equation.ascii();
}

function constructAndPrintLatexEquation(left, right, comp) {
  const rightNode = TestUtil.parseAndFlatten(right);
  const leftNode = TestUtil.parseAndFlatten(left);
  const equation = new Equation(leftNode, rightNode, comp);
  return equation.latex();
}

function testLatexprint(left, right, comp, output) {
  it (output, () => {
    assert.equal(
      constructAndPrintLatexEquation(left, right, comp), output
    );
  });
}

function testEquationConstructor(left, right, comp, output) {
  it (output, () => {
    assert.equal(
      constructAndPrintEquation(left, right, comp), output
    );
  });
}

describe('Equation constructor', () => {
  const tests = [
    ['2*x^2 + x', '4', '=', '2x^2 + x = 4'],
    ['x^2 + 2*x + 2', '0', '>=', 'x^2 + 2x + 2 >= 0'],
    ['2*x - 1', '0', '<=', '2x - 1 <= 0']
  ];
  tests.forEach(t => testEquationConstructor(t[0], t[1], t[2], t[3]));
});

describe('Latex printer', () => {
  const tests = [
    ['2*x^2 + x', '4', '=', '2{ x}^{2}+ x = 4'],
    ['x^2 + 2*y + 2', '0', '>=', '{ x}^{2}+2 y+2 >= 0'],
    ['2x - 1', '0', '<=', '2~ x - 1 <= 0']
  ];
  tests.forEach(t => testLatexprint(t[0], t[1], t[2], t[3]));
});
