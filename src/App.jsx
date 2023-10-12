import { useState } from 'react'
import styled from 'styled-components'

function App() {
  return (
    <Container>
      <TopBar> Levo um casaquinho?
        
      </TopBar>
    </Container>
  )

  
}

export default App

const Container = styled.div`
  width: 100%;
  height: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffff0;
  
`
const TopBar = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
  color: purple;
  font-size: 35px;
  font-weight: 600;
  font-style: bold;
  margin-top: 40px;

`