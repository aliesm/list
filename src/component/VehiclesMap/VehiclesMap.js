import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./VehiclesMap.css"


const VehiclesMap = (props) => {
    const mapRef = useRef(null);
    const [vehicleGeoCoordinate, setVehicleGeoCoordinate] = useState(null);

    useEffect(() => {
        if (props.activeVehicles) {
            setVehicleGeoCoordinate(props.activeVehicles.geoCoordinate)
        }
    }, [props.activeVehicles]);

    useEffect(() => {
        if (vehicleGeoCoordinate) {
            const { latitude, longitude } = vehicleGeoCoordinate;
            mapRef.current && mapRef.current.setView([latitude, longitude], 20);
        }
    }, [vehicleGeoCoordinate]);

    const popupMarker = (vehicle) => {
        return (
            <Popup>
                <h3><img alt="" src="vin.png" width="22" height="12" /> {vehicle.vin}</h3>
                <h3><img alt="" src="Address.png" width="15" height="15" />{vehicle.address}</h3>
                <h3><img alt="" src="fuel.jpg" width="15" height="15" />{`${vehicle.fuelType}  (fuelLevel ${vehicle.fuelLevel})`}</h3>
            </Popup>
        )
    };

    return (
        <>
            <MapContainer center={[53.5511, 9.9937]} ref={mapRef} zoom={10} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {props.vehiclesData.slice(0, 106).map((vehicle) => (
                    <Marker eventHandlers={{
                        click: () => {
                            mapRef.current.setView([vehicle.geoCoordinate.latitude, vehicle.geoCoordinate.longitude], 15);
                        },
                        mouseover: (e) => {
                            e.target.openPopup();
                        },
                        mouseout: (e) => {
                            e.target.closePopup();
                        }
                    }} position={[vehicle.geoCoordinate.latitude, vehicle.geoCoordinate.longitude]} key={vehicle.vin}>
                        {popupMarker(vehicle)}
                    </Marker>
                ))}
                {vehicleGeoCoordinate && (
                    <Marker eventHandlers={{
                        mouseover: (e) => {
                            e.target.openPopup();
                        },
                        mouseout: (e) => {
                            e.target.closePopup();
                        }
                    }} position={[vehicleGeoCoordinate.latitude, vehicleGeoCoordinate.longitude]}>
                        {popupMarker(props.activeVehicles)}
                    </Marker>
                )}
            </MapContainer>
        </>
    )
};

export default VehiclesMap;