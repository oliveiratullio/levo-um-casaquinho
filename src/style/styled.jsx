import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  height: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fffff0;
`

export const TopBar = styled.div`
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

export const SearchBar = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    margin-top: 25px;
`

export const FormContainer = styled.form`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    input {
    width: 200px;
    font-size: 20px;
    }
    button {
    width: 100px;
    font-size: 18px;
    }
`

export const DataContainer = styled.div`
  width: 700px;
  height: 150px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  display: flex;
  color: white;
`

export const LeftSide = styled.div`
    width: 50%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const RightSide = styled.div`
    width: 50%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
`

export const Now = styled.div`
    width: 150px;
    height: 40px;
    margin-top: 15px;
    margin-left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
`

export const MinMaxTemp = styled.div`
    width: 150px;
    height: 20px;
    margin-left: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: baseline;
    font-size: 14px;
`

export const Sky = styled.div`
    width: 150px;
    height: 30px;
    font-size: 15px;
    display: flex;
    justify-content: center;
`

export const Temp = styled.div`
    width: 150px;
    height: 50px;
    font-size: 35px;
    display: flex;
    justify-content: center;
`
