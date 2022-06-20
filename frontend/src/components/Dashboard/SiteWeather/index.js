import { useSelector } from "react-redux"
import ReactWeather, { useOpenWeather } from "react-open-weather";

const SiteWeather = () => {
    const coord = useSelector(state => state.currentSite.currentWeather.coord)
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: 'c99c8ad2b9ffda1cf1fca3aff99d07ae',
        lat: coord?.lat,
        lon: coord?.lon,
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    });


    return (
        <>
            <ReactWeather
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel="Munich"
                unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                showForecast
            />
        </>
    );
};

export default SiteWeather