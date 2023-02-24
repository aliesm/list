import React from "react";
import "./vehiclesItem.css";

const VehiclesItem = (props) => {

    return (
        <div className="detailContainer">
            <img alt="" src="car-icon.png" width="52" height="52" loading="lazy"></img>
            <div className="detail">
                <div style={{ fontSize: 13 }}>{props.item.plate}</div>
            </div>
        </div>
    );
};

export default VehiclesItem;