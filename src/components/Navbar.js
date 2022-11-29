import React from "react";
import { createUseStyles } from 'react-jss';
import { Paths } from "../routes";
import { Link } from 'react-router-dom';
import { green,textColor } from "../styles/variables";
import Cloudy from './../assets/cloudy.png'

export default function Navbar () {
    const classes = useStyles()
    return (
        <nav className={classes.navbarOuter}>
            <div className={classes.navbarInner}>
                <div>
                    <Link to={Paths.WEATHER_PATH}>
                        <img src={Cloudy} alt=""/>
                    </Link>
                </div>
                <div className={classes.menu}>
                    <Link className={classes.menuLink} to={Paths.WEATHER_PATH}>Weather</Link>
                    <Link className={classes.menuLink} to={Paths.STATIONS_PATH}>Stations</Link>
                </div>
            </div>
        </nav>
    )
}

var useStyles = createUseStyles({
    navbarOuter: {
        padding: '16px 0',
        background: green
    },
    navbarInner: {
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 12px',
        margin: 'auto',
        '@media screen and (min-width: 1024px) and (max-width: 1279px)': {
            width: '880px'
        },
        '@media screen and (min-width: 1280px)': {
            width: '1100px'
        }
    },
    menu: {
        display: "flex"
    },
    menuLink: {
        margin: '0 12px 0 0',
        color: 'white',
        textDecoration: 'none',
        transition: 'color 0.2s',
        '&:hover': {
            color: textColor
        },
        '&:last-child': {
            margin: 0
        }
    }
})