import React from "react";


const App= ()=>{
    const [query, setQuery]= React.useState("");
    const [weather, setWeather ]= React.useState({});
    
    
    const search = evt => {
        if (evt.key === "Enter") {
          fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
              setWeather(result);
              setQuery('');
              console.log(result);
            });
        }
      }
    
    
  
    const api ={
        key:"",
        base:"https://api.openweathermap.org/data/2.5/"
    }





    const DateBuilder= (d)=>{
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }
                                                                          
 

    return(
    <div className={(typeof weather.main != "undefined"?((weather.main.temp > 16) ? "app warm": "app"):"app")}>
    <main>
        <div className="search-box">
            <input type="text" 
            className="search-bar"
            placeholder="search...."
            value={query}
            onChange={evt=>{
                const {value} = evt.target;
                setQuery(value);
            }}
            onKeyPress={search}
            ></input>
        </div>
    {typeof weather.main != "undefined"? (
      <div>
        <div className="location-box">
            <div className="location">{weather.name }, { weather.sys.country}</div>
            <div className="date">{DateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°c</div>
            <div className="weather">{weather.weather[0].description}</div>
        
        </div>
        </div>
        ):("")
    }
    </main>
    </div>)
}
export default App;
