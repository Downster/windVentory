import { useEffect, useState } from "react";
import MiniMap from "../MiniMap"


const Hotel = () => {
    const [position, setPosition] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        const crd = pos.coords;
        console.log(crd)
        const newPosition = {
            'lat': crd.latitude,
            'lng': crd.longitude
        }
        setPosition({ lat: newPosition.lat, lng: newPosition.lng })
        setIsLoaded(true)
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error, options)
    }, [])

    return (
        <>
            {isLoaded &&
                <MiniMap position={position} onPositionChanged={(latlng) => setPosition(latlng)} />
            }
        </>
    )
}

export default Hotel