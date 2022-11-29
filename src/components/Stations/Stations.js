import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss';
import { stationsApiCall } from "../../api";
import RemoveIcon from "../../assets/RemoveIcon";
import { gray2, green } from "../../styles/variables";

export default function Stations () {
    const [external_id, setExternalId] = useState('');
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [altitude, setAltitude] = useState('');

    const [stations, setStations] = useState([]);

    useEffect(() => {
        getStations();
    }, [])

    function resetState () {
        setExternalId('');
        setName('');
        setLatitude('');
        setLongitude('');
        setAltitude('');
    }

    async function addStation () {
        if (disabledButton()) return
        const data = {
            external_id,
            name,
            latitude,
            longitude,
            altitude
        }
        const res = await stationsApiCall('stations', 'POST', data)
        if (res.success) {
            setStations([...stations, data]);
            resetState();
        }
    }

    async function getStations () {
        const { data } = await stationsApiCall('stations')
        setStations(data);
    }

    async function deleteStation (id) {
        const station = stations.filter(el => el.external_id != id);
        const res = await stationsApiCall('stations', 'DELETE', { external_id: id })
        if (res.success) setStations(station);
    }

    function disabledButton () {
        return !external_id.length ||
        !name.length ||
        !longitude.length ||
        !latitude.length ||
        !altitude.length
    }

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.left}>
                <div className={classes.inputContainer}>
                    <input
                        className={classes.searchBox}
                        type="text"
                        value={external_id}
                        onInput={ev => setExternalId(ev.target.value)}
                        placeholder='id'
                    />

                    <input
                        className={classes.searchBox}
                        type="text"
                        value={name}
                        onInput={ev => setName(ev.target.value)}
                        placeholder='name'
                    />

                    <input
                        className={classes.searchBox}
                        type="text"
                        value={latitude}
                        onInput={ev => setLatitude(ev.target.value)}
                        placeholder='latitude'
                    />

                    <input
                        className={classes.searchBox}
                        type="text"
                        value={longitude}
                        onInput={ev => setLongitude(ev.target.value)}
                        placeholder='longitude'
                    />

                    <input
                        className={classes.searchBox}
                        type="text"
                        value={altitude}
                        onInput={ev => setAltitude(ev.target.value)}
                        placeholder='altitude'
                    />
                    <button
                        onClick={addStation}
                        className={disabledButton() ? classes.addStation + ' ' + classes.disabled : classes.addStation}
                        disabled={disabledButton()}
                    >
                        Add station
                    </button>
                </div>
            </div>

            <div className={classes.right}>
                {stations.length > 0 && stations.map((el, index) => (
                    <div className={classes.listCard} key={index}>
                        <button
                            onClick={() => deleteStation(el.external_id)}
                            className={classes.removeButton}>
                            <RemoveIcon size='16px' />
                        </button>
                        <p className={classes.stationInfo}>
                            <span className={classes.infoTitle}>Name</span>
                            <span className={classes.infoValue}>{el.name}</span>
                        </p>
                        <p className={classes.stationInfo}>
                            <span className={classes.infoTitle}>Latitude</span>
                            <span className={classes.infoValue}>{el.latitude}</span>
                        </p>
                        <p className={classes.stationInfo}>
                            <span className={classes.infoTitle}>Longitude</span>
                            <span className={classes.infoValue}>{el.longitude}</span>
                        </p>
                        <p className={classes.stationInfo}>
                            <span className={classes.infoTitle}>Altitude</span>
                            <span className={classes.infoValue}>{el.altitude}</span>
                        </p>
                        <p className={classes.stationInfo}>
                            <span className={classes.infoTitle}>Id</span>
                            <span className={classes.infoValue}>{el.external_id}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

var useStyles = createUseStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: "start"
    },
    searchBox: {
        width: '100%',
        outline: 'none',
        border: 'none',
        boxSizing: 'border-box',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
        padding: '8px',
        borderRadius: '6px',
        fontSize: '16px',
        margin: '0 0 12px 0',
        '@media (max-width: 600px)': {
            fontSize: '14px'
        }
    },
    addStation: {
        // background: 'white',
        outline: 'none',
        background: green,
        // border: `1px solid ${green}`,
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '6px',
        cursor: "pointer"
    },
    disabled: {
        background: gray2,
        cursor: "not-allowed"
    },
    inputContainer: {
        display: "flex",
        flexDirection: "column"
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: "column"
    },
    left: {
        width: '30%',
        marginTop: '32px'
    },
    right: {
        width: '60%',
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: 'end',
        marginTop: '20px'
    },
    noMargin: {
        margin: 0
    },
    listCard: {
        padding: '14px',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
        background: 'white',
        borderRadius: '6px',
        width: '40%',
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        margin: '14px 0 0 14px',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.02)'
        }
        // '&:nth-child(2n)': {
        //     margin: '14px 0',
        // },
        // '&:nth-child(2n+1)': {
        //     margin: '14px 14px 14px 0',
        // }
    },
    removeButton: {
        background: 'transparent',
        outline: 'none',
        border: 'none',
        cursor: "pointer",
        margin: '0 0 4px 0',
        padding: 0,
        alignSelf: 'end'
    },
    stationInfo: {
        margin: '2px 0',
        display: 'flex',
        justifyContent: "space-between",
        width: '100%',
    },
    infoTitle: {
        marginRight: '20px',
        color: gray2
    },
    infoValue: {
        textAlign: 'right',
        // width: '40%'
    }
})