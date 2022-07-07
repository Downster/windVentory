import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
// import DraggableMarker from "../DraggableMarkerComponent/DraggableMarker";
import "leaflet-geosearch/dist/geosearch.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

function LeafletSearch({ onPositionChanged, admin }) {
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
            searchLabel: (admin) ? "Enter jobsite address" : 'Enter your hotels address'
        });
        map.addControl(searchControl);
        map.on("geosearch/showlocation", handlePositionChange);
        return () => map.removeControl(searchControl);
    }, [map, onPositionChanged]);

    return null;
}

export default function MiniMap({ position, onPositionChanged, popup, admin }) {
    return (
        <>
            <MapContainer center={position} zoom={12} scrollWheelZoom={false} className={(admin) ? 'jobsite-map' : 'hotel-map'}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} >
                    <Popup>
                        {popup}
                    </Popup>
                </Marker>
                <LeafletSearch onPositionChanged={onPositionChanged} admin={admin} />
            </MapContainer>
        </>
    );
}