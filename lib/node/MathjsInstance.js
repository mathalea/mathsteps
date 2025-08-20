const { create, NodeDependencies, lcmDependencies, nthRootDependencies, gcdDependencies, fractionDependencies, parseDependencies, evaluateDependencies, simplifyDependencies, formatDependencies } = require('mathjs')


const config = {
  // optionally, you can specify configuration
}

// Create just the functions we need
const math = create({
  fractionDependencies,
  lcmDependencies,
  gcdDependencies,
  nthRootDependencies,
  NodeDependencies,
  formatDependencies,
  parseDependencies,
  evaluateDependencies,
  simplifyDependencies
}, config)

module.exports = math;
