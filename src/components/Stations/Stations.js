import { apiCall } from "../../api";

export default function Stations () {
    async function addStation () {
        await apiCall('data/3.0/stations?', 'POST', {
            external_id: "SF_TEST001",
            name: "San Francisco Test Station",
            latitude: 37.76,
            longitude: -122.43,
            altitude: 150
        })
    }

    async function getStations () {
        const resp = await apiCall('data/3.0/stations?')
        console.log('getStations resp', resp)
    }

    // async function deleteStation (id) {
    //     await apiCall(`data/3.0/stations/${id}`, 'DELETE')
    // }

    return (
        <div>
            <p>Stations</p>
            <button onClick={addStation}>Add station</button>
            <button onClick={getStations}>Get station</button>

        </div>
    )
}