const CountryInfo = ({ countries, weatherData }) => {
    return (
        countries.map(el => (
            <div key={el.name.official}>
                <h1>{el.name.common}</h1>
                <p>capital {el.capital}</p>
                <p>area {el.area}</p>
                <strong>languages:</strong>
                {Object.values(el.languages).map((l, i) => <li key={i}>{l}</li>)}
                <img src={el.flags.svg} alt={el.flags.alt} width="250px" />
                <h2>Weather in {el.capital}</h2>
                <p>temperature {weatherData.main.temp} Celcius</p>
                <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} 
                alt={weatherData.weather.description} 
                />
                <p>wind {weatherData.wind.speed} m/s</p>
            </div>
        ))
    )
}

export default CountryInfo