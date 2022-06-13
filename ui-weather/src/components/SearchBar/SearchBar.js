import React, { useEffect, useRef, useState } from 'react';
import { Route, Switch } from 'react-router';
import { fetchWeather } from '../../config/service';
import './SearchBar.css';
const initialHours = [{ hour: '', temp_c: '' }]
const initialWeather = {
    name: '',
    country: '',
    condition: '',
    wind: '',
    temp_c: '',
    localtime: '',
    latitude: '',
    longitude: '',
    accurateTo: ''
}


export default function SearchBar() {

    const [city, setCity] = useState('tel aviv');
    const [error, setError] = useState(null);

    const [weather, setWeather] = useState(initialWeather);
    const [hours, setHours] = useState(initialHours);
    const cityRef = useRef();
    useEffect(() => {
        if (!city.trim().length) {
            setWeather(initialWeather);
            setHours([]);
            return;
        }

        fetchWeather(city)
            .then(({ weather, hours }) => {

                setWeather(weather)
                console.log(hours[0].temp_c)
                const uiHours = hours.map(hour => {
                    const newHour = {}
                    newHour.hour = new Date(hour.hour).toTimeString().split(' ')[0].slice(0, 5);
                    console.log(newHour.hour);
                    newHour.temp_c = hour.temp_c + '°';
                    return newHour
                });
                setHours(uiHours)
            })
            .catch(e => {
                console.log(e.message);
                // setError(e.message);
                setError('404: Location not found. Please search again');
                setWeather(initialWeather);
                setHours([]);
            });
    }, [city]);

    async function onSubmit(e) {
        e.preventDefault();
        setCity(cityRef.current.value)
    }
    console.log(hours)

    function backToSearch() {
        setError(null);
        setCity('tel aviv');
    }

    return (
        <>
            {error && <div className='error'>{error}
                <button className='error-btn' onClick={backToSearch}>New Search</button>
            </div>}
            {!error && (
                <div className='container'>
                    <div className='search-container'>
                        <form>
                            <div className='title'>
                                Use our weather app to see the weather around the world
                            </div>
                            <div className='city-name'>City name</div>
                            <input type="text" ref={cityRef} placeholder="Search for a city" />
                            <input type="submit" onClick={onSubmit} value="Check" />
                        </form>
                        <div className='footer-container'>
                            <span className='footer-lat'> latitude: {weather.latitude}  </span>
                            <span className='footer-lon'> longitude: {weather.longitude} </span>
                            <div className='footer accurate'> accurate to {weather.accurateTo} </div>
                        </div>

                    </div>

                    <div className='results-container'>
                        <div className='results'>
                            <div className='details city' >{weather.name}</div>
                            <div className='details country' >{weather.country}</div>
                            <div className='details date'> {weather.localtime.replaceAll('-', '/')} </div>
                            <div className='details temperature'>{weather.temp_c}°</div>
                            <div className='details condition'>{weather.condition}</div>
                            <div className='row-details'>
                                <div className='titles'>
                                    <div className='details-title'> precipitation </div>
                                    <div className='details-value'>{weather.precipitation} mm</div>
                                </div>
                                <div>
                                    <div className='details-title'>humidity</div>
                                    <div className='details-value'>{weather.humidity}% </div>
                                </div>
                                <div>
                                    <div className='details-title'> wind</div>
                                    <div className='details-value'> {weather.wind} km/h </div>
                                </div>
                            </div>
                            <div className='hours'>
                                {hours && hours.map(hour =>
                                    <div key={hour.hour}>
                                        <div className='hours-hours' key={hour.hour}>{hour.hour}
                                        </div>
                                        <div className='hours-temp'>{hour.temp_c}
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};
