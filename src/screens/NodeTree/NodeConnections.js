import { ConnectionPath, SVGContainer } from './styles'

export default function NodeConnections ({ nodes }) {
  const getConnectionPath = (parent, child) => {
    const dx = child.position.x - parent.position.x
    const dy = child.position.y - parent.position.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Calculate connection points on circle edges (radius = 40px)
    const radius = 40
    const parentEdgeX = parent.position.x + (dx / distance) * radius
    const parentEdgeY = parent.position.y + (dy / distance) * radius
    const childEdgeX = child.position.x - (dx / distance) * radius
    const childEdgeY = child.position.y - (dy / distance) * radius

    // Create a curved path
    const midX = (parentEdgeX + childEdgeX) / 2
    const midY = (parentEdgeY + childEdgeY) / 2

    // Add some curve to the connection
    const controlOffset = Math.min(distance * 0.2, 30)
    const perpX = (-dy / distance) * controlOffset
    const perpY = (dx / distance) * controlOffset

    return `M ${parentEdgeX} ${parentEdgeY} Q ${midX + perpX} ${
      midY + perpY
    } ${childEdgeX} ${childEdgeY}`
  }

  // Calculate SVG viewBox to contain all nodes
  const positions = Object.values(nodes).map(node => node.position)
  const minX = Math.min(...positions.map(p => p.x)) - 100
  const maxX = Math.max(...positions.map(p => p.x)) + 100
  const minY = Math.min(...positions.map(p => p.y)) - 100
  const maxY = Math.max(...positions.map(p => p.y)) + 100

  return (
    <SVGContainer
      viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
      preserveAspectRatio='xMidYMid meet'
    >
      <defs>
        <marker
          id='arrowhead'
          markerWidth='10'
          markerHeight='7'
          refX='9'
          refY='3.5'
          orient='auto'
        >
          <polygon points='0 0, 10 3.5, 0 7' fill='#6b7280' />
        </marker>
      </defs>

      {Object.values(nodes).map(node =>
        node.children.map(childId => {
          const child = nodes[childId]
          if (!child) return null

          return (
            <ConnectionPath
              key={`${node.id}-${childId}`}
              d={getConnectionPath(node, child)}
            />
          )
        })
      )}
    </SVGContainer>
  )
}
