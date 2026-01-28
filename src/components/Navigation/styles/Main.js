import styled from 'styled-components'
export const TabsContainer = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-end;
`
export const Tab = styled.div`
  // border: 1px solid red;
  height: fit-content;
  display: flex;
  word-wrap: break-word;
  justify-content: flex-end;
  padding: 0px 0px 0px 10px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
    font-weight: bold;
    filter: brightness(1.2);
  }
`

export const StyledIcon = styled.div`
  // border: 1px solid red;
  font-weight: bold;
  cursor: pointer;
  font-size: 40px;
  color: ${props => (props.$active === 'true' ? 'blue' : 'black')};
  position: relative;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;

  i {
    transition: all 0.3s ease-out;
  }

  &:hover {
    color: blue;

    svg {
      opacity: 0;
    }

    &:after {
      opacity: 1;
      transform: translate(-50%, -50%); /* Center the text */
    }
  }

  &:after {
    content: '${props => props.label}';
    font-size: 12px;
    letter-spacing: 2px;
    position: absolute;
    top: 50%; /* Center vertically */
    left: 50%; /* Center horizontally */
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    opacity: 0;
    transition: all 0.3s ease-out;
  }
}`
