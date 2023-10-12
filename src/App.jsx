import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'

function App() {
  const apiKey = "e737a6a8a92d552a200e410bfb86db23"
 
  const [city, setCity] = useState('')

  function cityChange(e){
    setCity(e.target.value)
  }
  
  function search(e){
    e.preventDefault()
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const promise = axios.get(api)
    promise.then(res =>{
      console.log(res.data)
    })
    promise.catch((err) => console.log(err.response.data))
  }

  return (
    <Container> 
      <TopBar> 
        Levo um casaquinho?
      </TopBar>
      <SearchBar>
        <FormContainer onSubmit={search}>
          <input value={city} onChange={cityChange} required placeholder='Cidade' ></input>
          <button type="submit" >Buscar</button>
        </FormContainer>
      </SearchBar>
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
const SearchBar = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  margin-top: 25px;
`
const FormContainer = styled.form`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  input{
    width: 200px;
    font-size: 20px;
  } 
  button{
    width: 100px;
    font-size: 18px;
  }
`