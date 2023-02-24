import React, { useState } from "react";
import vehiclesData from "../data/vehicles.json";
import "./vehiclesList.css";
import VehiclesItem from "../vehiclesItem/vehiclesItem";
import VehiclesMap from "../VehiclesMap/VehiclesMap";

const VehiclesList = () => {
    
    const [activeVehicles, setActiveVehicle] = useState(null);

    const handleVehicleClick = (vehicle) => {
        setActiveVehicle(vehicle);
    };

    return (
        <>
            <div className="container">
                <div className="containerList">
                    {vehiclesData.slice(0, 108).map((item, i) =>
                        <div onClick={() => handleVehicleClick(item)} className="slidedetail" key={i}>
                            <VehiclesItem item={item} index={i} />
                        </div>
                    )}
                </div>
                <div>
                    <VehiclesMap activeVehicles={activeVehicles} vehiclesData={vehiclesData} />
                </div>
            </div>
        </>
    )
}

export default VehiclesList;