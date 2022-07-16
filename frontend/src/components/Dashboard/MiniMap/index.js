import 'leaflet/dist/leaflet.css';
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
// import DraggableMarker from "../DraggableMarkerComponent/DraggableMarker";
import "leaflet-geosearch/dist/geosearch.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

function LeafletSearch({ onPositionChanged, admin, location }) {
    const map = useMap();
    useEffect(() => {
        const handlePositionChange = (e) => {
            const garbledLocation = e.location;
            const newPosition = { lat: garbledLocation.y, lng: garbledLocation.x };
            onPositionChanged(newPosition);
        };
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider,
            showMarker: false,
            style: "bar",
            keepResult: true,
            searchLabel: (admin) ? "Enter jobsite address" : (location) ? 'Search for a specific location' : 'Enter your hotels address'
        });
        map.addControl(searchControl);
        map.on("geosearch/showlocation", handlePositionChange);
        return () => map.removeControl(searchControl);
    }, [map, onPositionChanged, admin]);

    return null;
}

export default function MiniMap({ center, position, onPositionChanged, result, location, popup, admin }) {
    return (
        <>
            <MapContainer center={center} zoom={12} scrollWheelZoom={false} className={'rounded-lg h-100 w-100'}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {result && result.map((place) => (
                    <Marker key={place.place_id} id={place.place_id} position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }} icon={new Icon({ iconUrl: (place?.icon) ? place.icon : markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} >
                        <Popup>
                            {place.vicinity}
                        </Popup>
                    </Marker>
                ))}
                <Marker position={position} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} >
                    <Popup>
                        {popup}
                    </Popup>
                </Marker>
                {!location && <LeafletSearch onPositionChanged={onPositionChanged} admin={admin} location={location} />}
            </MapContainer>
        </>
    );
}