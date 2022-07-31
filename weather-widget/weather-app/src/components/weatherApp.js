import { useEffect, useState } from "react"
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";

import styles from './weatherApp.module.css';
import Loading from "./loading";

export default function WeatherApp() {
    const [weather, setWeather] = useState(null);
    
    useEffect(() => {
      loadInfo();
    }, []);

    useEffect(() =>{
      document.title = `Weather | ${weather?.location.name ?? ''}`;
    }, [weather]);

    async function loadInfo(city = "london"){
        try {
          const request = await fetch(
            `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
          );
          const json = await request.json();
          
          setTimeout(() => {
            setWeather(json);
          }, 2000);
          
          console.log(json);

        } catch(e){
          console.log(e);
        }
    }

    function handleOnChangeCity(city){
        setWeather(null);
        loadInfo(city);
    }

    return (
      <div className={styles.weatherContainer}>
        <WeatherForm onChangeCity={handleOnChangeCity} />
        {weather ? <WeatherMainInfo weather={weather} /> : <Loading />}
      </div>
    );
}