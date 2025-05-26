// mygrowingtree.js - Auto-generated tree data
export const treeData = {
  trees: {
    default: {
      name: "Default Tree",
      nodes: {
        1: {
          id: "1",
          label: "Root Node",
          position: {
            x: 400,
            y: 300,
          },
          children: [],
          contentType: "text",
        },
      },
    },
  },
  currentTreeId: "default",
  lastSaved: "2024-01-01T00:00:00.000Z",
}

export const getCurrentTree = () => {
  return treeData.trees[treeData.currentTreeId] || treeData.trees.default
}

export const getAllTrees = () => {
  return treeData.trees
}

export const getTreeById = (id) => {
  return treeData.trees[id]
}
