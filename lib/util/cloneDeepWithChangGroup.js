
function cloneDeepWithChangeGroup(node) {
  const cloned = node.cloneDeep();

  const originalList = [];
  const cloneList = [];

  node.traverse((n) => originalList.push(n));
  cloned.traverse((n) => cloneList.push(n));

  for (let i = 0; i < originalList.length; i++) {
    const src = originalList[i];
    const dst = cloneList[i];

    if (Object.prototype.hasOwnProperty.call(src, 'changeGroup')) {
      dst.changeGroup = src.changeGroup; // copie brute
    }
  }
  return cloned;
}

module.exports = cloneDeepWithChangeGroup;