import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserHotel } from "../../../store/session";
import MiniMap from "../MiniMap"


const Hotel = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [position, setPosition] = useState((user?.hotel?.lat) ? { lat: user.hotel.lat, lng: user.hotel.lon } : null)
    const [isLoaded, setIsLoaded] = useState((user?.hotel?.lat) ? true : false)


    const popupText = 'Current Location'

    async function updatePosition(latlng) {
        setPosition(latlng)
        await dispatch(setUserHotel(user.id, latlng))
    }

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
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        if (!position) {
            navigator.geolocation.getCurrentPosition(success, error, options)
        }
    }, [position])

    return (
        <div className="hotel-container">
            {isLoaded &&
                <MiniMap position={position} popup={popupText} onPositionChanged={(latlng) => updatePosition(latlng)} />
            }
        </div>
    )
}

export default Hotel