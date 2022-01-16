const ChangeTypes = require('./lib/ChangeTypes');
const factor = require('./lib/factor');
const simplifyExpression = require('./lib/simplifyExpression');
const solveEquation = require('./lib/solveEquation');
const printMS = require('./lib/util/print');
const Node = require('./lib/node');
const Negative = require('./lib/Negative')
const flatten = require('./lib/util/flattenOperands');

module.exports = {
  factor,
  simplifyExpression,
  solveEquation,
  Node,
  Negative,
  printMS,
  flatten,
  ChangeTypes,
};
