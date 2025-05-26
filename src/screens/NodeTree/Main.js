import { useState, useRef, useCallback, useEffect } from 'react'
import VisualNode from './VisualNode'
import NodeConnections from './NodeConnections'
import {
  Button,
  Container,
  ControlsContainer,
  Description,
  Header,
  HiddenFileInput,
  Input,
  Instructions,
  InstructionsList,
  InstructionsTitle,
  SaveStatus,
  Select,
  Title
} from './styles'

export default function NodeTree () {
  const [nodes, setNodes] = useState({
    1: {
      id: '1',
      label: 'Root Node',
      position: { x: 400, y: 300 },
      children: [],
      contentType: 'text'
    }
  })

  const [savedTrees, setSavedTrees] = useState({
    default: {
      name: 'Default Tree',
      nodes: {
        1: {
          id: '1',
          label: 'Root Node',
          position: { x: 400, y: 300 },
          children: [],
          contentType: 'text'
        }
      }
    }
  })

  const [currentTreeId, setCurrentTreeId] = useState('default')
  const [newTreeName, setNewTreeName] = useState('')
  const [selectedNodeId, setSelectedNodeId] = useState('1')
  const [draggedNodeId, setDraggedNodeId] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [showCombinedView, setShowCombinedView] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')
  const containerRef = useRef(null)
  const fileInputRef = useRef(null)

  // Load saved trees from localStorage on mount
  useEffect(() => {
    loadFromFile()
  }, [])

  // Update current tree when nodes change
  useEffect(() => {
    if (currentTreeId && !showCombinedView) {
      setSavedTrees(prev => ({
        ...prev,
        [currentTreeId]: {
          ...prev[currentTreeId],
          nodes: nodes
        }
      }))
    }
  }, [nodes, currentTreeId, showCombinedView])

  const updateNode = (nodeId, updates) => {
    setNodes(prev => ({
      ...prev,
      [nodeId]: { ...prev[nodeId], ...updates }
    }))
  }

  const addChildNode = useCallback(
    (parentId, angle = 0) => {
      const parentNode = nodes[parentId]
      if (!parentNode) return

      const newNodeId = Date.now().toString()
      const distance = 150
      const newPosition = {
        x: parentNode.position.x + Math.cos(angle) * distance,
        y: parentNode.position.y + Math.sin(angle) * distance
      }

      const newNode = {
        id: newNodeId,
        label: 'New Node',
        position: newPosition,
        parentId,
        children: [],
        contentType: 'text'
      }

      setNodes(prev => ({
        ...prev,
        [newNodeId]: newNode,
        [parentId]: {
          ...prev[parentId],
          children: [...prev[parentId].children, newNodeId]
        }
      }))

      setSelectedNodeId(newNodeId)
    },
    [nodes]
  )

  const deleteNode = nodeId => {
    if (nodeId === '1') return // Don't delete root

    const nodeToDelete = nodes[nodeId]
    if (!nodeToDelete) return

    // Remove from parent's children
    if (nodeToDelete.parentId) {
      const parent = nodes[nodeToDelete.parentId]
      if (parent) {
        updateNode(nodeToDelete.parentId, {
          children: parent.children.filter(id => id !== nodeId)
        })
      }
    }

    // Delete all descendants
    const deleteRecursively = id => {
      const node = nodes[id]
      if (node) {
        node.children.forEach(deleteRecursively)
        setNodes(prev => {
          const newNodes = { ...prev }
          delete newNodes[id]
          return newNodes
        })
      }
    }

    deleteRecursively(nodeId)
    setSelectedNodeId(null)
  }

  const handleMouseDown = (nodeId, event) => {
    const node = nodes[nodeId]
    if (!node) return

    setDraggedNodeId(nodeId)
    setSelectedNodeId(nodeId)

    const rect = event.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: event.clientX - rect.left - rect.width / 2,
      y: event.clientY - rect.top - rect.height / 2
    })
  }

  const handleMouseMove = useCallback(
    event => {
      if (!draggedNodeId || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const newPosition = {
        x: event.clientX - containerRect.left - dragOffset.x,
        y: event.clientY - containerRect.top - dragOffset.y
      }

      updateNode(draggedNodeId, { position: newPosition })
    },
    [draggedNodeId, dragOffset]
  )

  const handleMouseUp = useCallback(() => {
    setDraggedNodeId(null)
    setDragOffset({ x: 0, y: 0 })
  }, [])

  // Add event listeners for mouse move and up
  useEffect(() => {
    if (draggedNodeId) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [draggedNodeId, handleMouseMove, handleMouseUp])

  const getAvailableAngles = parentId => {
    const parent = nodes[parentId]
    if (!parent) return []

    const existingAngles = parent.children.map(childId => {
      const child = nodes[childId]
      if (!child) return 0
      return Math.atan2(
        child.position.y - parent.position.y,
        child.position.x - parent.position.x
      )
    })

    // Generate 8 possible angles (every 45 degrees)
    const possibleAngles = Array.from(
      { length: 8 },
      (_, i) => (i * Math.PI) / 4
    )

    // Filter out angles that are too close to existing ones
    return possibleAngles.filter(angle => {
      return !existingAngles.some(
        existing => Math.abs(angle - existing) < Math.PI / 6 // 30 degree minimum separation
      )
    })
  }

  const saveNewTree = () => {
    if (!newTreeName.trim()) return

    const newTreeId = Date.now().toString()
    setSavedTrees(prev => ({
      ...prev,
      [newTreeId]: {
        name: newTreeName.trim(),
        nodes: { ...nodes }
      }
    }))
    setCurrentTreeId(newTreeId)
    setNewTreeName('')
  }

  const switchTree = treeId => {
    if (treeId === 'combined') {
      setShowCombinedView(true)
      generateCombinedView()
    } else {
      setShowCombinedView(false)
      setCurrentTreeId(treeId)
      setNodes(savedTrees[treeId].nodes)
      setSelectedNodeId('1')
    }
  }

  const generateCombinedView = () => {
    const combinedNodes = {}

    // Create root node for combined view
    combinedNodes['combined-root'] = {
      id: 'combined-root',
      label: 'All Main Ideas',
      position: { x: 400, y: 200 },
      children: [],
      contentType: 'text'
    }

    // Add each tree's root as a child of the combined root
    const treeIds = Object.keys(savedTrees)
    const angleStep = (2 * Math.PI) / treeIds.length

    treeIds.forEach((treeId, index) => {
      const tree = savedTrees[treeId]
      const rootNode = tree.nodes['1']
      if (!rootNode) return

      const angle = index * angleStep
      const distance = 200
      const newId = `combined-${treeId}`

      combinedNodes[newId] = {
        id: newId,
        label: `${tree.name}: ${rootNode.label}`,
        position: {
          x: 400 + Math.cos(angle) * distance,
          y: 200 + Math.sin(angle) * distance
        },
        children: [],
        contentType: rootNode.contentType,
        originalTreeId: treeId
      }

      combinedNodes['combined-root'].children.push(newId)
    })

    setNodes(combinedNodes)
    setSelectedNodeId('combined-root')
  }

  const saveToFile = async () => {
    try {
      const dataToSave = {
        trees: savedTrees,
        currentTreeId: currentTreeId,
        lastSaved: new Date().toISOString()
      }

      console.log('dataToSave', dataToSave)

      // Create the data folder structure
      const dataContent = `// mygrowingtree.js - Auto-generated tree data
      export const treeData = ${JSON.stringify(dataToSave, null, 2)};

      export const getCurrentTree = () => {
        return treeData.trees[treeData.currentTreeId] || treeData.trees.default;
      };

      export const getAllTrees = () => {
        return treeData.trees;
      };

      export const getTreeById = (id) => {
        return treeData.trees[id];
      };
      `

      // Create a blob and download it
      const blob = new Blob([dataContent], { type: 'text/javascript' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'mygrowingtree.js'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setSaveStatus('Saved successfully!')
      setTimeout(() => setSaveStatus(''), 3000)
    } catch (error) {
      setSaveStatus('Save failed!')
      setTimeout(() => setSaveStatus(''), 3000)
    }
  }

  const loadFromFile = () => {
    // Try to load from localStorage first
    const saved = localStorage.getItem('mygrowingtree')
    if (saved) {
      try {
        const parsedData = JSON.parse(saved)
        if (parsedData.trees) {
          setSavedTrees(parsedData.trees)
          if (
            parsedData.currentTreeId &&
            parsedData.trees[parsedData.currentTreeId]
          ) {
            setCurrentTreeId(parsedData.currentTreeId)
            setNodes(parsedData.trees[parsedData.currentTreeId].nodes)
          }
        }
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }

  const importFromFile = event => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
      try {
        let imported
        const content = e.target.result

        // Check if it's a .js file with export syntax
        if (file.name.endsWith('.js')) {
          // Extract JSON from the exported treeData
          const match = content.match(/export const treeData = ({[\s\S]*?});/)
          if (match) {
            imported = JSON.parse(match[1])
          }
        } else {
          // Regular JSON file
          imported = JSON.parse(content)
        }

        if (imported && imported.trees) {
          setSavedTrees(imported.trees)
          const treeId =
            imported.currentTreeId || Object.keys(imported.trees)[0]
          if (treeId && imported.trees[treeId]) {
            setCurrentTreeId(treeId)
            setNodes(imported.trees[treeId].nodes)
          }
          setSaveStatus('Imported successfully!')
          setTimeout(() => setSaveStatus(''), 3000)
        }
      } catch (error) {
        setSaveStatus('Import failed!')
        setTimeout(() => setSaveStatus(''), 3000)
      }
    }
    reader.readAsText(file)
    event.target.value = '' // Reset file input
  }

  // Auto-save to localStorage
  useEffect(() => {
    const dataToSave = {
      trees: savedTrees,
      currentTreeId: currentTreeId,
      lastSaved: new Date().toISOString()
    }
    localStorage.setItem('mygrowingtree', JSON.stringify(dataToSave))
  }, [savedTrees, currentTreeId])

  const getCurrentMainIdea = () => {
    if (showCombinedView) return 'Combined View'
    const currentTree = savedTrees[currentTreeId]
    const rootNode = currentTree?.nodes?.['1']
    return rootNode ? `${currentTree.name}: ${rootNode.label}` : 'Unknown'
  }

  return (
    <div>
      <Header>
        <Title>My Growing Tree 🌱</Title>
        <Description>
          Develop and save your growing ideas. Each tree represents a different
          concept or project.
        </Description>

        <ControlsContainer>
          <Select
            value={showCombinedView ? 'combined' : currentTreeId}
            onChange={e => switchTree(e.target.value)}
          >
            {Object.entries(savedTrees).map(([id, tree]) => (
              <option key={id} value={id}>
                {tree.name}
              </option>
            ))}
            <option value='combined'>🔗 Combined View</option>
          </Select>

          <Button
            success
            onClick={saveToFile}
            title='Save current tree to mygrowingtree.js file'
          >
            💾 Save to File
          </Button>

          <Input
            type='text'
            placeholder='New tree name...'
            value={newTreeName}
            onChange={e => setNewTreeName(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && saveNewTree()}
          />

          <Button onClick={saveNewTree} disabled={!newTreeName.trim()}>
            Create New Tree
          </Button>

          <Button onClick={() => fileInputRef.current?.click()}>
            📁 Load File
          </Button>

          <HiddenFileInput
            ref={fileInputRef}
            type='file'
            accept='.json,.js'
            onChange={importFromFile}
          />

          {saveStatus && (
            <SaveStatus success={saveStatus.includes('success')}>
              {saveStatus}
            </SaveStatus>
          )}
        </ControlsContainer>

        <div style={{ marginTop: '8px', fontSize: '14px', color: '#6b7280' }}>
          <strong>Current Main Idea:</strong> {getCurrentMainIdea()}
        </div>
      </Header>

      <Container ref={containerRef}>
        {/* SVG for connections */}
        <NodeConnections nodes={nodes} />

        {/* Render all nodes */}
        {Object.values(nodes).map(node => (
          <VisualNode
            key={node.id}
            node={node}
            isSelected={selectedNodeId === node.id}
            isDragging={draggedNodeId === node.id}
            onMouseDown={e => handleMouseDown(node.id, e)}
            onUpdateNode={updateNode}
            onAddChild={addChildNode}
            onDeleteNode={deleteNode}
            availableAngles={getAvailableAngles(node.id)}
            isReadOnly={showCombinedView}
          />
        ))}

        {/* Instructions */}
        <Instructions>
          <InstructionsTitle>My Growing Tree Controls:</InstructionsTitle>
          <InstructionsList>
            <li>Click to select a node</li>
            <li>Drag to move nodes around</li>
            <li>Double-click to edit labels</li>
            <li>Use + button to add branches</li>
            <li>Use × button to delete nodes</li>
            <li>💾 Save to mygrowingtree.js file</li>
            <li>Switch between different idea trees</li>
            <li>View combined overview of all ideas</li>
          </InstructionsList>
        </Instructions>
      </Container>
    </div>
  )
}
