import { useState } from 'react'
import {
  AddButton,
  AddButtonContainer,
  Button,
  ContentIcon,
  ControlButtons,
  EditInput,
  NodeCircle,
  NodeContainer,
  NodeLabel,
  SelectionRing
} from './styles'

const getContentIcon = contentType => {
  switch (contentType) {
    case 'code':
      return '</>'
    case 'table':
      return '⊞'
    case 'image':
      return '🖼'
    case 'attachment':
      return '📎'
    default:
      return '📄'
  }
}

export default function VisualNode ({
  node,
  isSelected,
  isDragging,
  onMouseDown,
  onUpdateNode,
  onAddChild,
  onDeleteNode,
  availableAngles
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editLabel, setEditLabel] = useState(node.label)
  const [showAddButtons, setShowAddButtons] = useState(false)

  const handleDoubleClick = e => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleSaveLabel = () => {
    onUpdateNode(node.id, { label: editLabel })
    setIsEditing(false)
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSaveLabel()
    }
    if (e.key === 'Escape') {
      setEditLabel(node.label)
      setIsEditing(false)
    }
  }

  const handleAddChild = angle => {
    onAddChild(node.id, angle)
    setShowAddButtons(false)
  }

  return (
    <NodeContainer
      style={{
        left: node.position.x,
        top: node.position.y
      }}
      isDragging={isDragging}
      isSelected={isSelected}
    >
      {/* Main Node Circle */}
      <NodeCircle
        isSelected={isSelected}
        isDragging={isDragging}
        onMouseDown={onMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        {/* Content Type Icon */}
        {/* <ContentIcon contentType={node.contentType}>
          {getContentIcon(node.contentType)}
        </ContentIcon> */}

        {/* Node Label */}
        {isEditing ? (
          <EditInput
            value={editLabel}
            onChange={e => setEditLabel(e.target.value)}
            onKeyDown={handleKeyPress}
            onBlur={handleSaveLabel}
            autoFocus
          />
        ) : (
          <NodeLabel>{node.label}</NodeLabel>
        )}

        {/* Selection Ring */}
        {isSelected && <SelectionRing />}
      </NodeCircle>

      {/* Control Buttons */}
      {isSelected && !isEditing && (
        <ControlButtons>
          <Button
            onClick={() => setShowAddButtons(!showAddButtons)}
            title='Add child node'
          >
            +
          </Button>
          {node.id !== '1' && (
            <Button
              variant='delete'
              onClick={() => onDeleteNode(node.id)}
              title='Delete node'
            >
              ×
            </Button>
          )}
        </ControlButtons>
      )}

      {/* Add Child Buttons */}
      {showAddButtons && availableAngles.length > 0 && (
        <AddButtonContainer>
          {availableAngles.map((angle, index) => {
            const distance = 50
            const x = Math.cos(angle) * distance
            const y = Math.sin(angle) * distance

            return (
              <AddButton
                key={index}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`
                }}
                onClick={() => handleAddChild(angle)}
                title='Add branch here'
              >
                +
              </AddButton>
            )
          })}
        </AddButtonContainer>
      )}
    </NodeContainer>
  )
}
