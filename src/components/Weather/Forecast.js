import { capitalize, formatDate } from "../../utils";
import { createUseStyles } from "react-jss";
import {gray, gray2} from "../../styles/variables";

export default function ForecastWeather ({ weatherData }) {
    const classes = useStyles()

    const windDirection = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"]

    if (!weatherData) return <p>empty forecast</p>
    return weatherData.map((el, index) => {
        const { speed, deg } = el.wind;
        const { humidity, temp, feels_like } = el.main;
        const { description } = el.weather[0]

        return (
            <div className={classes.weatherCard} key={index}>
                <div className={classes.left}>
                    <div className={classes.dateTime}>
                        <p className={classes.noMargin}>{formatDate(el.dt)}</p>
                        <p className={classes.noMargin}>{formatDate(el.dt, 'time')}</p>
                    </div>
                    <div className={classes.tempContainer}>
                        <p className={classes.temp}>
                            <span className={classes.tempText}>{Math.round(temp)}</span>
                            <span className={classes.tempDeg}>&#176;</span>
                        </p>
                        <p className={classes.feelsLike}>/ {Math.round(feels_like)}&#176;</p>
                    </div>
                </div>
                <div className={classes.right}>
                    <p className={classes.description}>{capitalize(description)}</p>
                    <div>
                        <p className={classes.endInfo}>
                            <span className={classes.conditionName}>Wind</span>
                            <span className={classes.noWrap}>{Math.round(speed)}m/s {windDirection[Math.floor(deg / 22.5)]}</span>
                        </p>
                        <p className={classes.endInfo}>
                            <span className={classes.conditionName}>Hum.</span>
                            <span className={classes.noWrap}>{humidity} %</span>
                        </p>
                    </div>
                </div>
            </div>
        )
    })
}

var useStyles = createUseStyles({
    weatherCard: {
        padding: '14px',
        fontSize: '14px',
        margin: '20px 12px 0',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
        background: 'white',
        borderRadius: '6px',
        // display: 'grid',
        display: "flex",
        // gridTemplateColumns: '176px auto',
        // gridTemplateColumns: '90px 86px auto 90px',
        justifyContent: "space-between",
        alignItems: "center",
        '@media (max-width: 500px)': {
            padding: '16px'
            // flexDirection: "column"
            // gridTemplateColumns: '22% 18% 40% 20%',
            // display: 'flex',
            // flexWrap: 'wrap',
            // flexDirection: 'column'
        }
    },
    left: {
        display: "flex",
        alignItems: 'center',
        width: '42%',
        justifyContent: "space-between",
        '@media (max-width: 500px)': {
            width: '100px',
            flexDirection: "column",
            alignItems: "start"
            // width: '100%'
        }
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        width: '55%',
        justifyContent: "space-between",
        // flexWrap: 'wrap',
        '@media (max-width: 500px)': {
            width: '60%'
        },
        '@media (max-width: 400px)': {
            flexDirection: "column",
            alignItems: "end"
            // width: '100%'
        }
    },
    innerData: {
      display: "flex"
    },
    noMargin: {
        margin: 0
    },
    dateTime: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: '14px',
        '@media (max-width: 500px)': {
            margin: '0 0 14px 0',
        }
    },
    tempContainer: {
        display: "flex",
        alignItems: 'end',
        textAlign: "center"
    },
    temp: {
        display: 'flex',
        margin: 0,
    },
    tempText: {
        fontSize: '36px'
    },
    tempDeg: {
        fontSize: '26px'
    },
    feelsLike: {
        margin: 0,
        fontSize: '18px',
        color: '#AAAAAA',
    },
    description: {
        margin: '0 14px 0 0',
        textAlign: 'left',
        '@media (max-width: 400px)': {
            margin: '0 0 14px 0',
        },
        '@media (max-width: 300px)': {
            textAlign: 'right',
        }
    },
    endInfo: {
        display: "flex",
        justifyContent: "space-between",
        padding: '6px 0',
        margin: 0,
        borderBottom: `1px solid ${gray}`,
        '&:last-child': {
            border: 'none'
        }
    },
    conditionName: {
        color: gray2,
        marginRight: '10px'
    },
    noWrap: {
        whiteSpace: "nowrap"
    }
})