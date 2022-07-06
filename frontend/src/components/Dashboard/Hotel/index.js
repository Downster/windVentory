import { useEffect, useState } from "react";
import MiniMap from "../MiniMap"


const Hotel = () => {
    const [position, setPosition] = useState('')

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        const crd = pos.coords;
        console.log(crd)
        setPosition(crd)
        console.log(position)
        reverseLookup()
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const reverseLookup = async () => {
        const address = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}`)
        const res = await address.json()
        console.log(res)
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error, options)
    }, [])

    return (
        <>
            <MiniMap position={position} onPositionChanged={(latlng) => setPosition(latlng)} />
        </>
    )
}

export default Hotel