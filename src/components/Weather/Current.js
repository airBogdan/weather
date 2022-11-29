import { createUseStyles } from 'react-jss';
import { capitalize } from "../../utils";
import { gray, gray2 } from "../../styles/variables";

export default function CurrentWeather ({ weatherData, locationApi }) {
    const classes = useStyles()

    function currentTime () {
        const d = new Date()
        let mins = d.getMinutes()
        mins = mins < 10 ? `0${mins}` : mins
        let hours = d.getHours()
        hours = hours < 10 ? `0${hours}` : hours
        return hours + ' : ' + mins
    }

    const { temp, feels_like, pressure, humidity } = weatherData.main
    const { speed } = weatherData.wind
    const { description } = weatherData.description

    return (
        <div className={classes.weatherCard}>
            <div className={classes.heading}>
                <p className={classes.flexCol + ' ' + classes.noMargin}>
                    <span className={classes.headingTitle}>CURRENT WEATHER</span>
                    <span>{currentTime()}</span>
                </p>
                <span className={classes.textSm}>{locationApi.city}, {locationApi.country}</span>
            </div>
            <div className={classes.weatherData}>
                <div className={classes.left}>
                    <div className={classes.crtWeatherContainer}>
                        <p className={classes.crtTemp}>{Math.round(temp)}</p>
                        <div className={classes.crtTempUnits}>
                            <span className={classes.degrees}>o</span>
                            <span className={classes.degreeUnit}>C</span>
                        </div>
                    </div>
                    <p className={classes.realFeel}>Feels like {Math.round(feels_like)}&#8451;</p>
                </div>
                <div className={classes.right}>
                    <p className={classes.rightSideData}>
                        <span className={classes.conditionName}>Conditions</span>
                        <span>{capitalize(description)}</span>
                    </p>
                    <p className={classes.rightSideData}>
                        <span className={classes.conditionName}>Humidity</span>
                        <span>{humidity} %</span>
                    </p>
                    <p className={classes.rightSideData}>
                        <span className={classes.conditionName}>Pressure</span>
                        <span>{pressure} hPa</span>
                    </p>
                    <p className={classes.rightSideData}>
                        <span className={classes.conditionName}>Wind speed</span>
                        <span>{speed} m/s</span>
                    </p>
                </div>
            </div>
            {/*{Object.keys(weatherData).map(key => <p key={key}>{key} - {weatherData[key]}</p>)}*/}
        </div>
    )
}

var useStyles = createUseStyles({
    weatherCard: {
        padding: '14px',
        margin: '40px 12px 0',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
        background: 'white',
        borderRadius: '6px'
    },
    textSm: {
        fontSize: '12px'
    },
    heading: {
        margin: '0 0 14px 0',
        display: "flex",
        // flexDirection: "column",
        justifyContent: 'space-between'
    },
    flexCol: {
        display: "flex",
        flexDirection: 'column'
    },
    noMargin: {
        margin: 0
    },
    marginSm: {
      margin: '2px 0 4px 0'
    },
    headingTitle: {
        letterSpacing: '0.1px',
        fontSize: '15px',
        fontWeight: 500
    },
    weatherData: {
        display: "flex",
        justifyContent: "space-between"
    },
    left: {
        // display: 'flex',
        width: '40%'
    },
    crtWeatherContainer: {
        display: 'flex'
    },
    crtTemp: {
        fontSize: '60px',
        margin: 0
    },
    crtTempUnits: {
        display: "flex",
        flexDirection: "column",
        // alignItems: 'center',
        marginLeft: '4px'
    },
    degrees: {
        fontSize: '40px',
        lineHeight: '40px'
    },
    degreeUnit: {
        color: '#AAAAAA',
        fontSize: '20px'
    },
    realFeel: {
        margin: '14px 0 0 0'
    },
    right: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: '50%',
        '@media (max-width: 500px)': {
            maxWidth: '45%'
        }
    },
    rightSideData: {
        margin: 0,
        borderBottom: `1px solid ${gray}`,
        padding: '0 0 4px 0',
        display: "flex",
        justifyContent: "space-between",
        '&:last-child': {
            border: 'none'
        },
        '@media (max-width: 500px)': {
            flexWrap: "wrap",
            // flexDirection: "column",
            // textAlign: 'end',
            fontSize: '14px'
        }
    },
    conditionName: {
        color: gray2,
        marginRight: '10px'
    }
})