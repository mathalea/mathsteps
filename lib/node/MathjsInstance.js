// Import sélectif des dépendances nécessaires, sans charger toute la lib
import { create,
  NodeDependencies,
  parseDependencies,
  evaluateDependencies,
  simplifyDependencies,
  formatDependencies,
  lcmDependencies,
  gcdDependencies,
  nthRootDependencies,
  fractionDependencies
} from 'mathjs'


// Configuration optionnelle
const config = {}

// Création d’une instance "light" de mathjs
const math = create(
  {
    NodeDependencies,
    lcmDependencies,
    nthRootDependencies,
    gcdDependencies,
    fractionDependencies,
    parseDependencies,
    evaluateDependencies,
    simplifyDependencies,
    formatDependencies,
  },
  config
)

export default math
