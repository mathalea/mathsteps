const mathsteps = require('../mathsteps/index.js');

console.log('=====================')
let steps = mathsteps.simplifyExpression('2x + 2x + x + x')
steps.forEach(step => {
  console.log("before change: " + step.oldNode.toString());   // before change: 2 x + 2 x + x + x
  console.log("change: " + step.changeType);                  // change: ADD_POLYNOMIAL_TERMS
  console.log("after change: " + step.newNode.toString());    // after change: 6 x
  console.log("# of substeps: " + step.substeps.length);      // # of substeps: 3
})

console.log('=====================')
steps = mathsteps.solveEquation('3*x+6=5');

steps.forEach(step => {
    console.log("before change: " + step.oldEquation.ascii());  // e.g. before change: 2x + 3x = 35
    console.log("change: " + step.changeType);                  // e.g. change: SIMPLIFY_LEFT_SIDE
    console.log("after change: " + step.newEquation.ascii());   // e.g. after change: 5x = 35
    console.log("# of substeps: " + step.substeps.length);      // e.g. # of substeps: 2
})

console.log('=====================')
steps = mathsteps.solveEquation('3*x+6=5');

steps.forEach(step => {
    console.log("before change: " + step.oldEquation.ascii());  // e.g. before change: 2x + 3x = 35
    console.log("change: " + step.changeType);                  // e.g. change: SIMPLIFY_LEFT_SIDE
    console.log("after change: " + step.newEquation.ascii());   // e.g. after change: 5x = 35
    console.log("# of substeps: " + step.substeps.length);      // e.g. # of substeps: 2
})

console.log('=====================')
steps = mathsteps.solveEquation('4x-8=6x+10');

steps.forEach(step => {
    console.log("before change: " + step.oldEquation.ascii());  // e.g. before change: 2x + 3x = 35
    console.log("change: " + step.changeType);                  // e.g. change: SIMPLIFY_LEFT_SIDE
    console.log("after change: " + step.newEquation.ascii());   // e.g. after change: 5x = 35
    console.log("# of substeps: " + step.substeps.length);      // e.g. # of substeps: 2
})

steps.forEach(step => {
    console.log("before change: " + step.oldEquation.latex());  // e.g. before change: 2x + 3x = 35
    console.log("change: " + step.changeType);                  // e.g. change: SIMPLIFY_LEFT_SIDE
    console.log("after change: " + step.newEquation.latex());   // e.g. after change: 5x = 35
    console.log("# of substeps: " + step.substeps.length);      // e.g. # of substeps: 2
})

console.log('=====================')
steps = mathsteps.solveEquation('5/x + 4 = 7/3');

steps.forEach(step => {
    console.log("before change: " + step.oldEquation.ascii());  // e.g. before change: 2x + 3x = 35
    console.log("change: " + step.changeType);                  // e.g. change: SIMPLIFY_LEFT_SIDE
    console.log("after change: " + step.newEquation.ascii());   // e.g. after change: 5x = 35
    console.log("# of substeps: " + step.substeps.length);      // e.g. # of substeps: 2
})

steps.forEach(step => {
    console.log("before change: " + step.oldEquation.latex());  // e.g. before change: 2x + 3x = 35
    console.log("change: " + step.changeType);                  // e.g. change: SIMPLIFY_LEFT_SIDE
    console.log("after change: " + step.newEquation.latex());   // e.g. after change: 5x = 35
    console.log("# of substeps: " + step.substeps.length);      // e.g. # of substeps: 2
})



const changes = mathsteps.ChangeTypes
