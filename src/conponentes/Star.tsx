import React, { useEffect, useState } from 'react'
import { FiActivity, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import '../styles/conponents/star.css'


const Star: React.FC = () => {




    return (
        <div id="star">

            <span className="star-icon">
                <input id="tab" type="radio" value="1" name="star" className="sign" />
                ☆</span>
            <span className="star-icon">
                <input id="tab" type="radio" value="2" name="star" className="sign" />
                ☆</span>
            <span className="star-icon">
                <input id="tab" type="radio" value="3" name="star" className="sign" />
                ☆</span>
            <span className="star-icon">
                <input id="tab" type="radio" value="4" name="star" className="sign" />
                ☆</span>
            <span className="star-icon">
                <input id="tab" type="radio" value="5" name="star" className="sign" />
                ☆</span>

        </div>
    )
}

export default Star