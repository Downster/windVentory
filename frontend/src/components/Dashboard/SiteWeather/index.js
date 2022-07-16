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
import './SiteWeather.css'
import { useRef, useState } from 'react'

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
                text: `Forecasted wind speed for ${new Date(forecast.list[0].dt_txt).toLocaleDateString('en-US')} (meters/second)`,
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
                borderColor: ["#A9C2F4"],
            },
            {
                label: "Gusts",
                data: forecast?.list.filter((hour, idx) => {
                    if (idx < 12) {
                        return hour
                    }
                }).map((hour) => hour.wind.gust),
                backgroundColor: ["#fff"],
                borderColor: ["#4F5B73"],
            },
        ],
    };

    const tabs = useRef(
        [
            { name: 'Forecast', to: '#', current: true },
            { name: 'Wind Speed', to: '#', current: false },
            { name: 'Humidity', to: '#', current: false },
        ]
    )
    const [category, setCategory] = useState('Forecast')



    function setTab(inputTab) {
        const currentTab = tabs.current.find((tab) => tab.current)
        tabs.current[tabs.current.indexOf(currentTab)].current = false
        const changeTab = tabs.current.find((tab) => tab.name === inputTab)
        tabs.current[tabs.current.indexOf(changeTab)].current = true
        setCategory(inputTab)
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    onChange={({ target: { value } }) => setCategory(value)}
                    defaultValue={tabs.current.find((tab) => tab.current).name}

                >
                    {tabs.current.map((tab) => (
                        <option key={tab.name} value={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
                    {tabs.current.map((tab, tabIdx) => (
                        <button
                            key={tab.name}
                            className={classNames(
                                tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                                tabIdx === 0 ? 'rounded-l-lg' : '',
                                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                                'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                            )}
                            aria-current={tab.current ? 'page' : undefined}
                            onClick={() => setTab(tab.name)}
                        >
                            <span>{tab.name}</span>
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    tab.current ? 'bg-indigo-500' : 'bg-transparent',
                                    'absolute inset-x-0 bottom-0 h-0.5'
                                )}
                            />
                        </button>
                    ))}
                </nav>
            </div>
            <div className="mt-10">

                {category === 'Forecast' && <ReactWeather
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    data={data}
                    lang="en"
                    locationLabel={currentWeather?.name}
                    unitsLabels={{ temperature: 'C', windSpeed: 'm/s' }}
                    showForecast
                />}
                {category === 'Wind Speed' &&
                    <div className="weather-data">
                        <Line options={options} data={graphData} />
                    </div>
                }
            </div>
        </>
    );
};

export default SiteWeather