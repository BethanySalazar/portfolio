import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  background: white;
  overflow: hidden;
  cursor: default;
`

export const Instructions = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  max-width: 320px;
`

export const InstructionsTitle = styled.h3`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
  margin-top: 0;
`

export const InstructionsList = styled.ul`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  padding-left: 16px;

  li {
    margin-bottom: 4px;
  }
`

export const Header = styled.div`
  padding: 16px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #111827;
  margin: 0 0 8px 0;
`

export const Description = styled.p`
  color: #6b7280;
  margin: 0 0 16px 0;
`

export const ControlsContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 14px;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`

export const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: ${props =>
    props.primary ? '#3b82f6' : props.success ? '#10b981' : 'white'};
  color: ${props => (props.primary || props.success ? 'white' : '#374151')};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props =>
      props.primary ? '#2563eb' : props.success ? '#059669' : '#f9fafb'};
    border-color: ${props =>
      props.primary ? '#2563eb' : props.success ? '#059669' : '#9ca3af'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`

export const HiddenFileInput = styled.input`
  display: none;
`

export const SaveStatus = styled.span`
  font-size: 12px;
  color: ${props => (props.success ? '#10b981' : '#6b7280')};
  font-style: italic;
`
