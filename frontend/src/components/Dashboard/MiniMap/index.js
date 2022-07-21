import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
// import DraggableMarker from "../DraggableMarkerComponent/DraggableMarker";
import "leaflet-geosearch/dist/geosearch.css";
import L from 'leaflet'
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
            searchLabel: (admin) ? "Enter jobsite address" : (location) ? 'Search for a specific location' : 'Enter your hotels address to continue'
        });
        map.addControl(searchControl);
        map.on("geosearch/showlocation", handlePositionChange);
        return () => map.removeControl(searchControl);
    }, [map, onPositionChanged, admin]);

    return null;
}

function GenerateMarkers({ result }) {
    const map = useMap();
    let group = useRef(L.layerGroup())
    group.current.clearLayers()
    Object.values(result).forEach((place) => {
        let myIcon = new Icon({ iconUrl: (place?.icon) ? place.icon : markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })
        let marker = L.marker({ lat: place.geometry.location.lat, lng: place.geometry.location.lng }, {
            icon: myIcon,
            title: place.name,
            riseOnHover: true
        });
        const popup = L.popup()
            .setContent(place.name + '</br>' + place.vicinity)
        marker.bindPopup(popup).openPopup();

        group.current.addLayer(marker);

        place.marker_id = group.current.getLayerId(marker);
    })
    group.current.addTo(map)
}

function PanTo({ pan, place }) {
    const map = useMap();
    map.flyTo(pan);
    map.setZoom(14)
    map.openPopup(place?.vicinity, pan)
    return null;
}


export default function MiniMap({ place, pan, center, position, onPositionChanged, result, location, popup, admin, loading }) {


    return (
        <>
            <MapContainer center={(center) ? center : position} zoom={12} scrollWheelZoom={false} className={admin ? 'rounded-lg' : 'rounded-lg h-full w-full'}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {!admin && <GenerateMarkers result={result} />}
                {!admin && loading && <PanTo pan={pan} place={place} />}
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