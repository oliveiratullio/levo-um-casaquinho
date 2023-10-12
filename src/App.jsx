import axios from 'axios'
import { useState, useEffect } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import styled from 'styled-components'
import format from 'date-fns-tz/format'
import ptBR from 'date-fns/locale/pt-BR'

function App() {
  const apiKey = "e737a6a8a92d552a200e410bfb86db23"
  const [city, setCity] = useState('')
  const [temperatureList, setTemperatureList] = useState([])
  const [isACityDefined, setIsACityDefined] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [weatherText, setWeatherText] = useState('')
  const [weatherBackgroundColor, setWeatherBackgroundColor] = useState('')

  function cityChange(e) {
    setCity(e.target.value)
  }

  const search = (e) => {
    e.preventDefault()
    const unidades = "metric"
    const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unidades}&appid=${apiKey}`

    const promiseWeather = axios.get(apiWeather)
    promiseWeather.then(res => {
      const { temp, temp_max, temp_min } = res.data.main
      const weather = res.data.weather[0]

      const weatherInfo = mapWeatherInfo(weather.main)
      setWeatherText(weatherInfo.text)
      setWeatherBackgroundColor(weatherInfo.backgroundColor)

      console.log(temp, temp_max, temp_min, weather)
    })
    promiseWeather.catch((err) => console.log(err.response.data))

    const promiseForecast = axios.get(apiForecast)
    promiseForecast.then(res => {
      const temps = res.data.list.map((i) => ({
        time: i.dt_txt,
        temp: i.main.temp
      }))
      setTemperatureList(temps)
      setIsACityDefined(true)
      setDataLoaded(true)
      console.log(temps)
    })
    promiseForecast.catch((err) => console.log(err.response.data))
  }

  const formatarData = (data) => {
    return format(new Date(data), 'dd/MM (eee)', { locale: ptBR });
  }

  const mapWeatherInfo = (main) => {
    switch (main) {
      case 'Clear':
        return { text: 'Céu aberto', backgroundColor: 'yellow'};
      case 'Clouds':
        return { text: 'Nublado', backgroundColor: 'grey' };
      case 'Rain':
        return { text: 'Chovendo', backgroundColor: 'blue' };
      case 'Snow':
        return { text: 'Nevando', backgroundColor: 'lightgrey' };
      case 'Thunderstorm':
        return { text: 'Tempestade', backgroundColor: 'purple' };
      case 'Drizzle':
        return { text: 'Chuviscando', backgroundColor: 'lightblue' };
      case 'Mist':
        return { text: 'Neblina', backgroundColor: 'lightgrey' };
      default:
        return { text: '', backgroundColor: 'grey' };
    }
  }

  return (
    <Container>
      <TopBar>
        Levo um casaquinho?
      </TopBar>
      <SearchBar>
        <FormContainer onSubmit={search}>
          <input value={city} onChange={cityChange} required placeholder='Cidade'></input>
          <button type="submit">Buscar</button>
        </FormContainer>
      </SearchBar>
      {isACityDefined ? (
        <DataContainer style={{ backgroundColor: weatherBackgroundColor }}>
          <LeftSide>
            <Now>
              <h1>Agora: {city}</h1>
            </Now>
            <div>
              <MinMaxTemp>Mínima: {temperatureList.length > 0 ? temperatureList[0].temp : ""}°C</MinMaxTemp>
              <MinMaxTemp>Máxima: {temperatureList.length > 0 ? temperatureList[0].temp : ""}°C</MinMaxTemp>
            </div>
          </LeftSide>
          <RightSide>
            <div>
              <Sky>{weatherText}</Sky>
              <Temp>{temperatureList.length > 0 ? temperatureList[0].temp : ""}°C</Temp>
            </div>
          </RightSide>
        </DataContainer>
      ) : null}
      {dataLoaded && (
        <div>
          <ResponsiveContainer width={700} height={400}>
            <LineChart data={temperatureList} margin={{ right: 30, left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tickFormatter={formatarData} />
              <YAxis domain={[0, 42]} tickCount={6} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temp" name="Temperatura (°C)" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Container>
  );
}

export default App;

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
input {
  width: 200px;
  font-size: 20px;
}
button {
  width: 100px;
  font-size: 18px;
}
`

  const DataContainer = styled.div`
  width: 700px;
  height: 150px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  display: flex;
  color: white;
`

const LeftSide = styled.div`
width: 50%;
height: 150px;
display: flex;
flex-direction: column;
justify-content: space-between;
`

const RightSide = styled.div`
width: 50%;
height: 150px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: end;
`

const Now = styled.div`
width: 150px;
height: 40px;
margin-top: 15px;
margin-left: 15px;
display: flex;
justify-content: center;
align-items: center;
font-size: 20px;
`

const MinMaxTemp = styled.div`
width: 150px;
height: 20px;
margin-left: 10px;
margin-bottom: 10px;
display: flex;
justify-content: center;
align-items: baseline;
font-size: 14px;
`

const Sky = styled.div`
width: 150px;
height: 30px;
font-size: 15px;
display: flex;
justify-content: center;
`

const Temp = styled.div`
width: 150px;
height: 50px;
font-size: 35px;
display: flex;
justify-content: center;
`
