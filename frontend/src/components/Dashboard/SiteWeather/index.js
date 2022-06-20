import { useSelector } from "react-redux"
import ReactWeather, { useOpenWeather } from "react-open-weather";

const SiteWeather = () => {
    const currentWeather = useSelector(state => state.currentSite.currentWeather)
    const coord = currentWeather.coord
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: process.env.REACT_APP_OPENWEATHER_API_KEY,
        lat: coord?.lat,
        lon: coord?.lon,
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    });


    return (
        <>
            <div className="weather-div">
                <ReactWeather
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    data={data}
                    lang="en"
                    locationLabel={currentWeather.name}
                    unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                    showForecast
                />
            </div>
        </>
    );
};

export default SiteWeather