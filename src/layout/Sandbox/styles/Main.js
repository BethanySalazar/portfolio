import styled from 'styled-components'
export const MainContainer = styled.div`
  border: 1px solid red;
  // border-bottom: 1px solid black;
  display: flex;
  width: 100%;
  // height: 100%;
  justify-content: space-between;
  padding: 20px;
`
export const Title = styled.h1``
export const TabsContainer = styled.div`
  display: flex;
`
export const Tab = styled.div`
  // border: 1px solid red;
  height: fit-content;
  display: flex;
  padding: 0px 0px 0px 10px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    font-weight: bold;
    filter: brightness(1.2);
  }
`