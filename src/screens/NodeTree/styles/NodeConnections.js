import styled from 'styled-components'

export const SVGContainer = styled.svg`
  position: absolute;
  inset: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  z-index: 1;
`

export const ConnectionPath = styled.path`
  stroke: #6b7280;
  stroke-width: 2;
  fill: none;
  marker-end: url(#arrowhead);
  transition: all 0.3s;
`
