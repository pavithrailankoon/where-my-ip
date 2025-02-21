import React, { useEffect, useState } from 'react'
import './livemap.css'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from "leaflet";
import { getUserIP, searchIP } from "../ip-api/Data";
import 'leaflet/dist/leaflet.css'
import locationSvg from "../../assets/images/location.svg";

export default function Livemap() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState([0.0, 0.0]);

  useEffect(() => {
      async function fetchIP() {
        try {
          const data = await getUserIP();
          console.log("Fetched IP data:", data); 
          setData(data);

        if (data?.lat && data?.lon) {
            console.log("Latitude:", data.lat, "Longitude:", data.lon);
            setLocation([data.lat, data.lon]);
        }
        } catch (error) {
          console.error("Error fetching IP data:", error);
        }
      }
      fetchIP();
  }, []);

    const handleSearch = async () => {
      if (query.trim() === "") return;
      const data = await searchIP(query);
      setData(data);

      if (data?.lat && data?.lon) {
        setLocation([data.lat, data.lon]);
      }
    }
  
  const svgIcon = L.icon({
    iconUrl: locationSvg,
    iconSize: [40, 40], 
    iconAnchor: [20, 40], 
    popupAnchor: [0, -40],
  });

  function ChangeView({ center }) {
    const map = useMap();
    map.setView(center);
    return null;
  }

  return (
    <div className='mapContainer'>
      <MapContainer center={location} zoom={7.5} scrollWheelZoom={false}>
      <ChangeView center={location} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location}  icon={svgIcon}>
          
        </Marker>
      </MapContainer>
    </div>
  )
}