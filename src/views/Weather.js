import React, { useState } from 'react'
import CurrentWeather from "../components/Weather/Current";
import ForecastWeather from "../components/Weather/Forecast";
import { apiCall } from "../api";
import { createUseStyles } from 'react-jss';
import countryCodes from '../assets/countryCodes.json';
import { green } from "../styles/variables";
import ChevronDown from "../assets/chevronDown";
import MagnifyingGlass from "../assets/MagnifyingGlass";
import TickIcon from "../assets/TickIcon";
import useViewport from "../utils/useViewport";

import { useDispatch } from 'react-redux'
import { toggleLoading } from "../store/slices/loadingSlice";

export default function Weather () {
    const dispatch = useDispatch();

    const CURRENT_WEATHER = { label: 'Current weather', value: 'weather' };
    const FORECAST = { label: 'Forecasted weather', value: 'forecast' };

    const [infoType, setInfoType] = useState({ label: 'Current weather', value: 'weather' });
    const [weatherData, setWeather] = useState(null);

    const [locationSearch, setLocationSearch] = useState('');
    const [locationApi, setLocationApi] = useState({ city: '', country: '' });
    const [showDropdown, setShowDropdown] = useState(false);

    const { viewportWidth } = useViewport();

    async function getWeather () {
        dispatch(toggleLoading(true));
        const coords = await apiCall(`geo/1.0/direct?q=${locationSearch}`);
        if (coords && coords[0]) {
            let { lon, lat, name, country } = coords[0]
            const countryFull = countryCodes.find(el => el.code == country)
            country = countryFull?.name || country
            setLocationApi({ city: name, country })
            const weather = await apiCall(`data/2.5/${infoType.value}?lat=${lat}&lon=${lon}&units=metric`)
            if ('list' in weather) setWeather({ list: weather.list })
            if ('main' in weather) setWeather({ main: weather.main, wind: weather.wind, description: weather.weather[0] })
            dispatch(toggleLoading(false));
        }
    }

    const weatherTypeDropdownClass = (value) => infoType.value == value ?
        `${classes.dropdownElement} ${classes.selected}`:
        classes.dropdownElement

    async function selectWeatherType (type) {
        setShowDropdown(!showDropdown);
        setInfoType(type);
    }

    const classes = useStyles();

    return (
        <div className={classes.weatherPage}>
            <div className={classes.searchContainerOuter}>
                <div className={classes.searchContainerInner}>
                    <button disabled={!locationSearch.length} className={classes.searchButton} onClick={getWeather}>
                        <MagnifyingGlass width='18px' />
                    </button>
                    <input
                        className={classes.searchBox}
                        type="text"
                        id="location"
                        onInput={ev => setLocationSearch(ev.target.value)}
                        onKeyDown={e => e.code == 'Enter' ? getWeather() : null}
                        placeholder={viewportWidth > 800 ? 'Search city, country, zip' : 'Search'}
                    />
                    <div className={classes.selectContainerOuter}>
                        <div onClick={() => setShowDropdown(!showDropdown)} className={classes.selectContainerInner}>
                            <p className={classes.selectedChoice}>{infoType.label}</p>
                            <ChevronDown customClass={showDropdown ? classes.selectIcon + ' ' + classes.iconDown : classes.selectIcon} />
                        </div>    
                    </div>
                    <ul className={showDropdown ? `${classes.choiceDropdown} ${classes.showDropdown}` : `${classes.choiceDropdown} ${classes.hideDropdown}`}>
                        <li onClick={() => selectWeatherType(CURRENT_WEATHER)} className={weatherTypeDropdownClass(CURRENT_WEATHER.value)}>
                            {CURRENT_WEATHER.label}
                            {infoType.value == CURRENT_WEATHER.value && <TickIcon fill={green} style={{marginLeft: '12px'}} />}
                        </li>
                        <li onClick={() => selectWeatherType(FORECAST)} className={weatherTypeDropdownClass(FORECAST.value)}>
                            {FORECAST.label}
                            {infoType.value == FORECAST.value && <TickIcon fill={green} style={{marginLeft: '12px'}} />}
                        </li>
                    </ul>
                </div>
            </div>
            {weatherData && weatherData.main && <CurrentWeather weatherData={weatherData} locationApi={locationApi} />}
            {weatherData && weatherData.list && <ForecastWeather weatherData={weatherData.list} locationApi={locationApi} />}
        </div>
    )
}

var useStyles = createUseStyles({
    weatherPage: {
        width: '100%',
        maxWidth: '480px',
        marginLeft: 'auto',
        marginRight: "auto",
        paddingBottom: '20px'
    },
    searchContainerOuter: {
        margin: '80px 12px 0',
    },
    searchContainerInner: {
        padding: '14px',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
        background: 'white',
        borderRadius: '6px',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '32px auto 160px',
        alignItems: 'center',
        '@media (max-width: 600px)': {
            gridTemplateColumns: 'auto auto auto',
        }
    },
    searchButton: {
        outline: 'none',
        border: 'none',
        background: 'white',
        cursor: 'pointer',
    },
    searchBox: {
        width: '100%',
        outline: 'none',
        border: 'none',
        boxSizing: 'border-box',
        padding: '0 12px',
        fontSize: '16px',
        '@media (max-width: 600px)': {
            fontSize: '14px'
        }
    },
    selectContainerOuter: {
        display: "flex",
        justifyContent: "end"
    },
    selectContainerInner: {
        display: 'flex',
        cursor: "pointer",
        alignItems: "center",
    },
    selectBox: {
        appearance: 'none',
        background: 'white',
        outline: 'none',
        border: 'none'
    },
    selectIcon: {
        transition: 'transform 0.2s',
        marginLeft: '4px'
    },
    iconDown: {
        transform: 'rotate(180deg)',
    },
    selectedChoice: {
        whiteSpace: "nowrap",
        margin: 0,
        fontSize: '14px',
        '@media (max-width: 600px)': {
            fontSize: '12px'
        },
    },
    choiceDropdown: {
        position: "absolute",
        top: '53px',
        right: 0,
        background: 'white',
        margin: 0,
        flexDirection: "column",
        alignItems: 'start',
        listStyleType: 'none',
        boxShadow: '0 1px 1px 0 rgba(0,0,0,0.1)',
        borderRadius: '6px',
        padding: '5px 10px'
    },
    showDropdown: {
        display: 'flex'
    },
    hideDropdown: {
        display: "none"
    },
    dropdownElement: {
        fontSize: '12px',
        whiteSpace: "nowrap",
        margin: '10px 0',
        cursor: 'pointer',
    },
    selected: {
        color: green
    }
})