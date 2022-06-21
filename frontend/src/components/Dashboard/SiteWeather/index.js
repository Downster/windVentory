import { useSelector } from "react-redux"
import ReactWeather, { useOpenWeather } from "react-open-weather";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { HashRouter } from "react-router-dom";
import './SiteWeather.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SiteWeather = () => {
    const currentWeather = useSelector(state => state.currentSite.currentWeather)
    const forecast = useSelector(state => state.currentSite.forecast)
    const coord = currentWeather?.coord
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: process.env.REACT_APP_OPENWEATHER_API_KEY,
        lat: coord?.lat,
        lon: coord?.lon,
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    });
    const labels = forecast?.list.filter((hour, idx) => {
        if (idx < 8) {
            return hour
        }
    }).map((hour) => new Date(hour.dt_txt).toLocaleTimeString("en-US"))
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: `Forecasted wind speed for ${new Date(forecast.list[0].dt_txt).toLocaleDateString('en-US')}`,
            },
        },
    };

    const graphData = {
        labels,
        datasets: [
            {
                label: "Average",
                data: forecast?.list.filter((hour, idx) => {
                    if (idx < 12) {
                        return hour
                    }
                }).map((hour) => hour.wind.speed),
                backgroundColor: ["#fff"],
                borderColor: ["#03dac5"],
            },
            {
                label: "Gusts",
                data: forecast?.list.filter((hour, idx) => {
                    if (idx < 12) {
                        return hour
                    }
                }).map((hour) => hour.wind.gust),
                backgroundColor: ["#fff"],
                borderColor: ["#03dac5"],
            },
        ],
    };


    return (
        <>
            <div className="weather-container">
                <div className="weather-div">
                    <ReactWeather
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        data={data}
                        lang="en"
                        locationLabel={currentWeather?.name}
                        unitsLabels={{ temperature: 'C', windSpeed: 'm/s' }}
                        showForecast
                    />
                </div>
                <div className="weather-data">
                    <Line options={options} data={graphData} />
                </div>
            </div>
        </>
    );
};

export default SiteWeather