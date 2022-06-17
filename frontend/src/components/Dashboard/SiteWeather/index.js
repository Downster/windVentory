import { useSelector } from "react-redux"
import { useEffect, useState } from "react";


const SiteWeather = () => {
    const weather = useSelector(state => state.currentSite.currentWeather)
    const [temperature, setTemperature] = useState("");
    const [city, setCity] = useState("istanbul");
    const [desc, setDesc] = useState("");
    const [name, setName] = useState("");
    const [humidity, setHumidity] = useState("");
    const [visibility, setVisibility] = useState("");
    const [windspeed, setWineSpeed] = useState("");
    const [wicon, setWicon] = useState("");

    useEffect(() => {
        setTemperature(Math.round(weather.main.temp - 273.15));
        setDesc(weather.weather[0].description);
        setName(weather.name);
        setHumidity(weather.main.humidity);
        setVisibility(weather.visibility / 1000);
        setWineSpeed(weather.wind.speed);
        setWicon(weather.weather[0].icon);
    }, [])


    return (
        <div
            className="background"
        >
            <div className="container">
                <div id="card" className="weather">
                    <div className="details">
                        <div className="temp">
                            {temperature}
                            <span>&deg;</span>
                        </div>
                        <div className="right">
                            <div id="summary">{desc}</div>
                            <div style={{ fontWeight: "bold", marginTop: "4px" }}>{name}</div>
                        </div>
                    </div>
                    <img className="weatherimg" alt="image1" src={`http://openweathermap.org/img/wn/${wicon}.png`} />
                    <div className="infos">
                        {/* <img
                            alt="humidity1"
                            className="humidityimg"
                            style={{ width: "5", height: "5" }}
                            src="http://openweathermap.org/img/w/humidity.svg"
                        ></img> */}
                        <div className="humidity">Humidity {humidity}%</div>
                        {/* <img
                            alt="visibility1"
                            className="visibilityimg"
                            style={{ width: "5", height: "5" }}
                            src="http://openweathermap.org/img/w/visibility.svg"
                        ></img> */}
                        <div className="visibility">Visibility {visibility} km</div>
                        {/* <img
                            alt="windspeed1"
                            className="windimg"
                            style={{ width: "5", height: "5" }}
                            src="http://openweathermap.org/img/w/wind.svg"
                        ></img> */}
                        <div className="windspeed">Wind Speed {windspeed} km</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteWeather