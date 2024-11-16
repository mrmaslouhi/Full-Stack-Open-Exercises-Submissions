import { useState, useEffect } from 'react'
import CountryInfo from './components/CountryInfo'
import axios from 'axios'

const App = () => {
  const api_key = import.meta.env.VITE_SOME_KEY;
  const [country, setCountry] = useState("")
  const [newCountry, setNewCountry] = useState("")
  const [countries, setCountries] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const handleCountryChange = event => {
    setNewCountry(event.target.value)
  }

  const onSearch = event => {
    event.preventDefault()
    setCountry(newCountry)
    if (newCountry) {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          const matchedCountries = response.data.filter(el => el.name.common.toLowerCase().includes(newCountry.toLowerCase()))
          setCountries(matchedCountries)
        })
    }
  }

  const handleShowCountry = el => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${el.capital}&units=metric&appid=${api_key}`)
    .then(response => {
      setWeatherData(response.data)
    })
    .catch(error => {
      console.log("an error happened")
    })
    
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${el.name.common.toLowerCase()}`)
      .then(response => {
        setCountries([response.data])
      })
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries <input value={newCountry} onChange={handleCountryChange} />
        {
          countries.length > 10 ?
            <p>Too many matches specify another filter</p> :
            countries.length === 1 && weatherData.length !== 0 ?
              <CountryInfo countries={countries} weatherData={weatherData} /> :
              countries.map(el => (
                <p key={el.name.official}>{el.name.common}
                  <button type='button' onClick={() => handleShowCountry(el)}>show</button>
                </p>
              ))
        }
      </form>
    </div>
  )
}

export default App