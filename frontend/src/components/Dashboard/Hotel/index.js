import { useEffect, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserHotel } from "../../../store/session";
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XIcon, ExclamationIcon } from '@heroicons/react/outline'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import MiniMap from "../MiniMap"
import { tokenFetch } from "../../../store/csrf";
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'




const Hotel = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [position, setPosition] = useState((user?.hotel?.lat) ? { lat: user.hotel.lat, lng: user.hotel.lon } : null)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [isLoaded, setIsLoaded] = useState((user?.hotel?.lat) ? true : false)
    const [loading, setLoading] = useState((user?.hotel?.lat) ? false : true)
    const [open, setOpen] = useState(user?.hotel?.lat ? true : false)
    const [location, setLocation] = useState(user?.hotel?.lat ? true : false)
    const [query, setQuery] = useState('')
    const [firstLoad, setFirstLoad] = useState(false)
    const [result, setResult] = useState([])
    const [center, setCenter] = useState((user?.hotel?.lat) ? { lat: user.hotel.lat, lng: user.hotel.lon } : null)
    const [pan, setPan] = useState(null)
    const [place, setPlace] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [selectedAmenity, setSelecetedAmenity] = useState('Airport')
    const amenity = useRef([])


    const popupText = 'Hotel Location'

    const amenities = [
        {
            name: 'Accounting',
            type: 'accounting',
        },
        { name: 'Airport', type: 'airport' },
        { name: 'Amusement park', type: 'amusement_park' },
        { name: 'Aquarium', type: 'aquarium' },
        { name: 'Art gallery', type: 'art_gallery' },
        { name: 'Atm', type: 'atm' },
        { name: 'Bakery', type: 'bakery' },
        { name: 'Bank', type: 'bank' },
        { name: 'Bar', type: 'bar' },
        { name: 'Beauty salon', type: 'beauty_salon' },
        { name: 'Bike store', type: 'bicycle_store' },
        { name: 'Book store', type: 'book_store' },
        { name: 'Bowling alley', type: 'bowling_alley' },
        { name: 'Bus station', type: 'bus_station' },
        { name: 'Cafe', type: 'cafe' },
        { name: 'Campground', type: 'campground' },
        { name: 'Car dealer', type: 'car_dealer' },
        { name: 'Car rental', type: 'car_rental' },
        { name: 'Car repair', type: 'car_repair' },
        { name: 'Car wash', type: 'car_wash' },
        { name: 'Casino', type: 'casino' },
        { name: 'Cemetary', type: 'cemetery' },
        { name: 'Church', type: 'church' },
        { name: 'City hall', type: 'city_hall' },
        { name: 'Clothing store', type: 'clothing_store' },
        { name: 'Convenience store', type: 'convenience_store' },
        { name: 'Courthouse', type: 'courthouse' },
        { name: 'Dentist', type: 'dentist' },
        { name: 'Department store', type: 'department_store' },
        { name: 'Doctor', type: 'doctor' },
        { name: 'Drugstore', type: 'drugstore' },
        { name: 'Electrician', type: 'electrician' },
        { name: 'Electronics store', type: 'electronics_store' },
        { name: 'Embassy', type: 'embassy' },
        { name: 'Fire station', type: 'fire_station' },
        { name: 'Florist', type: 'florist' },
        { name: 'Funeral home', type: 'funeral_home' },
        { name: 'Furniture store', type: 'furniture_store' },
        { name: 'Gas station', type: 'gas_station' },
        { name: 'Gym', type: 'gym' },
        { name: 'Hair care', type: 'hair_care' },
        { name: 'Hardware store', type: 'hardware_store' },
        { name: 'Hindu temple', type: 'hindu_temple' },
        { name: 'Home goods store', type: 'home_goods_store' },
        { name: 'Hospital', type: 'hospital' },
        { name: 'Insurance agency', type: 'insurance_agency' },
        { name: 'Jewelry store', type: 'jewelry_store' },
        { name: 'Laundry', type: 'laundry' },
        { name: 'Lawyer', type: 'lawyer' },
        { name: 'Library', type: 'library' },
        { name: 'Light rail station', type: 'light_rail_station' },
        { name: 'Liquor store', type: 'liquor_store' },
        { name: 'Local governement office', type: 'local_government_office' },
        { name: 'Locksmith', type: 'locksmith' },
        { name: 'Lodging', type: 'lodging' },
        { name: 'Meal delivery', type: 'meal_delivery' },
        { name: 'Meal takeaway', type: 'meal_takeaway' },
        { name: 'Mosque', type: 'mosque' },
        { name: 'Movie rental', type: 'movie_rental' },
        { name: 'Movie theater', type: 'movie_theater' },
        { name: 'Moving company', type: 'moving_company' },
        { name: 'Museum', type: 'museum' },
        { name: 'Night club', type: 'night_club' },
        { name: 'Painter', type: 'painter' },
        { name: 'Park', type: 'park' },
        { name: 'Parking', type: 'parking' },
        { name: 'Pet store', type: 'pet_store' },
        { name: 'Pharmacy', type: 'pharmacy' },
        { name: 'Physiotherapist', type: 'physiotherapist' },
        { name: 'Plumber', type: 'plumber' },
        { name: 'Police', type: 'police' },
        { name: 'Post office', type: 'post_office' },
        { name: 'Primary school', type: 'primary_school' },
        { name: 'Real estate agency', type: 'real_estate_agency' },
        { name: 'Restaurant', type: 'restaurant' },
        { name: 'Roofing contractor', type: 'roofing_contractor' },
        { name: 'RV park', type: 'rv_park' },
        { name: 'School', type: 'school' },
        { name: 'Secondary school', type: 'secondary_school' },
        { name: 'Shoe store', type: 'shoe_store' },
        { name: 'Shopping mall', type: 'shopping_mall' },
        { name: 'Spa', type: 'spa' },
        { name: 'Stadium', type: 'stadium' },
        { name: 'Storage', type: 'storage' },
        { name: 'Store', type: 'store' },
        { name: 'Subway station', type: 'subway_station' },
        { name: 'Supermarket', type: 'supermarket' },
        { name: 'Synagogue', type: 'synagogue' },
        { name: 'Taxi stand', type: 'taxi_stand' },
        { name: 'Tourist attraction', type: 'tourist_attraction' },
        { name: 'Train station', type: 'train_station' },
        { name: 'Transit station', type: 'transit_station' },
        { name: 'Travel agency', type: 'travel_agency' },
        { name: 'University', type: 'university' },
        { name: 'Veternarian', type: 'veterinary_care' },
        { name: 'Zoo', type: 'zoo' },

    ]

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };



    const filteredPeople =
        query === ''
            ? amenities
            : amenities.filter((thing) => {
                return thing.name.toLowerCase().includes(query.toLowerCase())
            })

    async function updatePosition(latlng) {
        setPosition(latlng)
        await dispatch(setUserHotel(user.id, latlng))
        setOpen(true)
        setLocation(true)
    }

    async function getAirports() {
        const res2 = await tokenFetch('/users/nearby/airport')
        const { results } = await res2.json()
        const places = {}
        results.forEach(place => {
            places[place.place_id] = place;
        });
        setResult(places)
    }
    async function getThings(e) {
        amenity.current = e
        const res = await tokenFetch(`/users/nearby/${amenity.current.type}`)
        const { results } = await res.json()
        const places = {}
        results.forEach(place => {
            places[place.place_id] = place;
        });
        setResult(places)
    }

    function success(pos) {
        const crd = pos.coords;
        const newPosition = {
            'lat': crd.latitude,
            'lng': crd.longitude
        }
        setPosition({ lat: newPosition.lat, lng: newPosition.lng })
        setLoading(false)
        setIsLoaded(true)
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        setShowModal(true)
    }

    // const handleKeyDown = async (event, value) => {
    //     if (event.key === 'Enter') {
    //         setSelecetedAmenity(value)
    //         const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${amenity}%20${city.current}%20${state.current}&format=json&addressdetails=1&polygon_svg=1`)
    //         const thing = await res.json()
    //         setResult(thing)
    //     }
    // }

    function currentSuccess(pos) {
        const crd = pos.coords;
        const newPosition = {
            'lat': crd.latitude,
            'lng': crd.longitude
        }
        setCurrentLocation({ lat: newPosition.lat, lng: newPosition.lng })
    }

    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(currentSuccess, error, options)
    }


    useEffect(() => {
        if (!position) {
            navigator.geolocation.getCurrentPosition(success, error, options)
        }
        getAirports()
        getCurrentLocation()
    }, [position])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    function PanTo(place) {
        setPlace(place)
        setPan({ lat: place.geometry.location.lat, lng: place.geometry.location.lng })
        setFirstLoad(true)
    }




    return (
        <>
            <div className="h-full w-1/2 xl:w-7/12 2xl:w-8/12">

                {
                    loading &&
                    <>
                        <img src='https://windventory.s3.amazonaws.com/turbine.gif'>
                        </img>
                    </>
                }
                {isLoaded &&
                    <MiniMap loading={firstLoad} place={place} pan={pan} center={center} position={position} popup={popupText} onPositionChanged={(latlng) => updatePosition(latlng)} location={location} result={result} />
                }


                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative" onClose={(e) => setOpen(true)}>
                        {/* <div className="fixed inset-0" /> */}
                        {/* <div className="fixed inset-0 overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden"> */}

                        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl z-100 mt-16">
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <Combobox as="div" value={selectedAmenity} onChange={(e) => getThings(e)}>
                                                    <Combobox.Label className="block text-sm font-medium text-gray-700">Nearby amenities</Combobox.Label>
                                                    <div className="relative mt-1">
                                                        <Combobox.Input
                                                            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                            onChange={(event) => setQuery(event.target.value)}
                                                            displayValue={(thing) => selectedAmenity.name}
                                                        // onKeyDown={(e, value) => handleKeyDown(e, e.target.value)}

                                                        />
                                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </Combobox.Button>

                                                        {filteredPeople.length > 0 && (
                                                            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                {filteredPeople.map((amenity) => (
                                                                    <Combobox.Option
                                                                        key={amenity.name}
                                                                        value={amenity}
                                                                        className={({ active }) =>
                                                                            classNames(
                                                                                'relative cursor-default select-none py-2 pl-8 pr-4',
                                                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                                            )
                                                                        }
                                                                        onClick={(e) => setSelecetedAmenity(amenity)}
                                                                    >
                                                                        {({ active, selected }) => (
                                                                            <>
                                                                                <span className={classNames('block truncate', selected && 'font-semibold')}>{amenity.name}</span>

                                                                                {selected && (
                                                                                    <span
                                                                                        className={classNames(
                                                                                            'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                                                                            active ? 'text-white' : 'text-indigo-600'
                                                                                        )}
                                                                                    >
                                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                    </span>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                    </Combobox.Option>
                                                                ))}
                                                            </Combobox.Options>
                                                        )}
                                                    </div>
                                                </Combobox>
                                                {/* <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="border-b border-gray-200">
                                        </div>

                                        <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto overflow-x-hidden mb-16">
                                            {Object.values(result).map((place) => (
                                                <li key={place.place_id}>
                                                    <div className="group relative flex items-center py-6 px-5">
                                                        <button
                                                            className="-m-1 block flex-1 p-1"
                                                            onClick={() => PanTo(place)}
                                                        >
                                                            <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true" />
                                                            <div className="relative flex min-w-0 flex-1 items-center">
                                                                <span className="relative inline-block flex-shrink-0">
                                                                    <img className="h-10 w-10 rounded-full" src={place.icon} alt="" />

                                                                </span>
                                                                <div className="ml-4 truncate">
                                                                    <p className="truncate text-sm font-medium text-gray-900">{place.name}</p>
                                                                    <p className="truncate text-sm text-gray-500">{place.vicinity}</p>
                                                                </div>
                                                            </div>
                                                        </button>
                                                        <Menu as="div" className="relative ml-2 inline-block flex-shrink-0 text-left">
                                                            <Menu.Button className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                                <span className="sr-only">Open options menu</span>
                                                                <span className="flex h-full w-full items-center justify-center rounded-full">
                                                                    <DotsVerticalIcon
                                                                        className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                        aria-hidden="true"
                                                                    />
                                                                </span>
                                                            </Menu.Button>
                                                            <Transition
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items className="absolute top-0 right-9 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                    <div className="py-1">
                                                                        <Menu.Item>
                                                                            {({ active }) => (
                                                                                <a
                                                                                    href={`https://maps.google.com/maps?saddr=${currentLocation.lat},${currentLocation.lng}&daddr=${place.geometry.location.lat},${place.geometry.location.lng}`}
                                                                                    className={classNames(
                                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                        'block px-4 py-2 text-sm'
                                                                                    )}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                >
                                                                                    Navigate here
                                                                                </a>
                                                                            )}
                                                                        </Menu.Item>
                                                                    </div>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </Menu>
                                                    </div>

                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                        {/* </div>
                        </div> */}
                    </Dialog>
                </Transition.Root>
            </div>
            <Transition.Root show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setShowModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                    <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                        <button
                                            type="button"
                                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                We're sorry, there was an error fetching your current location, please enable location access, or contact your internet provider.
                                            </Dialog.Title>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Okay
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>


        </>
    )
}

export default Hotel