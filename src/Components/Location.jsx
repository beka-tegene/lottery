import React from 'react'
import map from '../Image/Artboard 1 friday.jpg'
const Location = () => {
    return (
        <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(45deg , #503C3C 50%, #3E3232 50%)" }}>
            <img src={map} alt="map" style={{width:"fit-content",height:"100%"}} />
        </div>
    )
}

export default Location