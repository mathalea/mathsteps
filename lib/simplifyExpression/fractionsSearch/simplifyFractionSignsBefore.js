const ChangeTypes = require('../../ChangeTypes');
const Negative = require('../../Negative');
const Node = require('../../node');

// Simplifies negative signs if possible
// e.g. -1/-3 --> \frac{1}/{3}   4/-5 --> -\\frac{4}/\frac{5}
// Returns a Node.Status object
function simplifySignsBefore(fraction) {
  if (!Node.Type.isOperator(fraction)) {
    return Node.Status.noChange(fraction);
  }
  if (fraction.op === '/') {
    const oldFraction = fraction.cloneDeep();
    let numerator = fraction.args[0];
    let denominator = fraction.args[1];
    // The denominator should never be negative.
    if (Negative.isNegative(denominator) && Negative.isNegative(numerator)) {
      // -4/-5 devient 4/5
      denominator = Negative.negate(denominator);
      numerator = Negative.negate(numerator);
      const changeType = ChangeTypes.CANCEL_MINUSES;
      const newFraction = Node.Creator.operator('/', [numerator, denominator]);
      return Node.Status.nodeChanged(changeType, oldFraction, newFraction);
    } else if (Negative.isNegative(denominator) && !Negative.isNegative(numerator)) {
      // 4/-5 devient -4/5
      denominator = Negative.negate(denominator);
      const changeType = ChangeTypes.SIMPLIFY_SIGNS_BEFORE;
      const newFraction = Node.Creator.operator('/', [numerator, denominator]);
      const unaryMinus = Node.Creator.unaryMinus(newFraction);
      return Node.Status.nodeChanged(changeType, oldFraction, unaryMinus);
    }  else if (!Negative.isNegative(denominator) && Negative.isNegative(numerator)) {
      // {-4}/5 devient - {4/5}
      numerator = Negative.negate(numerator);
      const changeType = ChangeTypes.SIMPLIFY_SIGNS_BEFORE;
      const newFraction = Node.Creator.operator('/', [numerator, denominator]);
      const unaryMinus = Node.Creator.unaryMinus(newFraction);
      return Node.Status.nodeChanged(changeType, oldFraction, unaryMinus);
    } else {
      return Node.Status.noChange(fraction);
    }
  } else if (fraction.op === '-' && fraction.args.length === 2 && Node.Type.isOperator(fraction.args[1]) && fraction.args[1].op === '/') {
    const subFraction = fraction.args[1];
    let numerator = subFraction.args[0];
    let denominator = subFraction.args[1];
    let op = '-'
    if (Negative.isNegative(numerator) && Negative.isNegative(denominator)) {
      // -4/-5 devient 4/5
      numerator = Negative.negate(numerator);
      denominator = Negative.negate(denominator);
      op = '-'
    } else if (Negative.isNegative(denominator) && !Negative.isNegative(numerator)) {
      // 4/-5 devient 4/5
      denominator = Negative.negate(denominator);
      op = '+'
    } else if (!Negative.isNegative(denominator) && Negative.isNegative(numerator)) {
      // -4/5 devient 4/5
      numerator = Negative.negate(numerator);
      op = '+'
    }
    const changeType = ChangeTypes.SIMPLIFY_SIGNS_BEFORE;
    const newSubFraction = Node.Creator.operator(op, [fraction.args[0], Node.Creator.operator('/', [numerator, denominator])]);
    return Node.Status.nodeChanged(changeType, fraction, newSubFraction);
  } else if (fraction.op === '+' && fraction.args.length === 2 && Node.Type.isOperator(fraction.args[1]) && fraction.args[1].op === '/') {
    const subFraction = fraction.args[1];
    let numerator = subFraction.args[0];
    let denominator = subFraction.args[1];
    let op = '+'
    if (Negative.isNegative(numerator) && Negative.isNegative(denominator)) {
      // -4/-5 devient 4/5
      numerator = Negative.negate(numerator);
      denominator = Negative.negate(denominator);
      op = '+'
    } else if (Negative.isNegative(denominator) && !Negative.isNegative(numerator)) {
      // 4/-5 devient 4/5
      denominator = Negative.negate(denominator);
      op = '-'
    } else if (!Negative.isNegative(denominator) && Negative.isNegative(numerator)) {
      // -4/5 devient 4/5
      numerator = Negative.negate(numerator);
      op = '-'
    }
    const changeType = ChangeTypes.SIMPLIFY_SIGNS_BEFORE;
    const newSubFraction = Node.Creator.operator(op, [fraction.args[0], Node.Creator.operator('/', [numerator, denominator])]);
    return Node.Status.nodeChanged(changeType, fraction, newSubFraction);
  } else{
    return Node.Status.noChange(fraction);
  }
}

module.exports = simplifySignsBefore;