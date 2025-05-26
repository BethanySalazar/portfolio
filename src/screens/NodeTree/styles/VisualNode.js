import styled from 'styled-components'

export const NodeContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: ${props => (props.isDragging ? 1000 : props.isSelected ? 100 : 10)};
`

export const NodeCircle = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid ${props => (props.isSelected ? '#3b82f6' : '#d1d5db')};
  background: white;
  box-shadow: ${props =>
    props.isDragging
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'};
  cursor: move;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${props => (props.isDragging ? 'scale(1.1)' : 'scale(1)')};

  &:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`
export const ContentIcon = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 16px;
  height: 16px;
  color: ${props => {
    switch (props.contentType) {
      case 'code':
        return '#3b82f6'
      case 'table':
        return '#10b981'
      case 'image':
        return '#8b5cf6'
      case 'attachment':
        return '#f59e0b'
      default:
        return '#6b7280'
    }
  }};
`

export const NodeLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #1f2937;
  text-align: center;
  padding: 0 8px;
  line-height: 1.2;
  word-break: break-word;
`

export const EditInput = styled.input`
  width: 64px;
  height: 32px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 4px;
  outline: none;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`

export const SelectionRing = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid #60a5fa;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`

export const ControlButtons = styled.div`
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
`
export const AddButtonContainer = styled.div`
  position: absolute;
  inset: 0;
`
export const AddButton = styled.button`
  position: absolute;
  width: 24px;
  height: 24px;
  padding: 0;
  background: #10b981;
  color: white;
  border: 1px solid #059669;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transform: translate(-50%, -50%);
  transition: all 0.2s;

  &:hover {
    background: #059669;
    transform: translate(-50%, -50%) scale(1.1);
  }
`
