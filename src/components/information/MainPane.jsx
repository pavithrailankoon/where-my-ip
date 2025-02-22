import React, { useEffect, useState } from 'react'
import { searchIP } from "../ip-api/Data";
import './livemap.css'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from "leaflet";
import 'leaflet/dist/leaflet.css'
import locationSvg from "../../assets/images/location.svg";

export default function MainPane({text, sectionRef}) {

  const [data, setData] = useState("");
  const [coordinate, setCoordinate] = useState();

  // Fetch user IP on page load or handle search
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await searchIP(text);
        if (data && data.lat !== undefined && data.lon !== undefined) {
          setCoordinate([data.lat, data.lon]);
        } else {
          console.error("Invalid data received:", data);
          setCoordinate();
        }
        setData(data);
      } catch (error) {
        setCoordinate();
        console.error("Error fetching IP data:", error);
      }
    }
    fetchData();
  }, [text]);
  
    const keyMappings = {
      "query": "IP address",
      "status": "Status",
      "message": "Message",
      "continent": "Continent name",
      "continentCode": "Continent code",
      "country": "Country name",
      "countryCode": "Country code",
      "region": "Region",
      "regionName": "Region name",
      "city": "City",
      "district": "District",
      "zip": "Zip code",
      "lat": "Latitude",
      "lon": "Longitude",
      "timezone": "Timezone",
      "offset": "Offset",
      "currency": "National currency",
      "isp": "ISP name",
      "org": "Organization name",
      "as": "	AS number",
      "asname": "AS name",
      "reverse": "Reverse DNS",
      "mobile": "Mobile",
      "proxy": "Proxy",
      "hosting": "Hosting",
    };  

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
    <div className="bg-gray-50" ref={sectionRef}>
        <div className="pt-12 text-3xl text-center font-QuicksandLight">
            <h3>IP Information</h3>
        </div>
        <div className={`grid w-full max-w-6xl gap-4 p-10 p-12 mx-auto ${!coordinate ? 'md:grid-cols-1' : 'md:grid-cols-2'} md:item-center`}>
          
          {/* IP information table */}
            <div className="w-full">
              <table className="w-full bg-white border table-auto border-grey-300">
                <thead>
                  <tr className="text-white bg-red-500">
                    <th className="w-1/4 px-4 py-2 border">Field</th>
                    <th className="w-1/2 px-4 py-2 border">Response</th>
                  </tr>
                </thead>
                <tbody>
                {/* <Search onSearch={handleSearch} loading={false} /> */}
                {data ? Object.entries(data).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-4 py-2"><b>{keyMappings[key] || key}</b></td>
                    <td className="px-4 py-2">{value}</td>
                  </tr>
                    )) : (
                  <tr>
                    <td colSpan="2" className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center p-5 min-w-screen">
                      <div className="flex space-x-2 animate-pulse">
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      </div>
                    </div>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
            {coordinate && (
            <div className="w-full">
              {/* Live map view */}
                <MapContainer center={coordinate || [0,0]} zoom={7.5} scrollWheelZoom={coordinate ? true : false}>
                      <ChangeView center={coordinate || [0,0]}/>
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {coordinate && ( 
                          <Marker position={coordinate}  icon={svgIcon}/>
                        )}
                </MapContainer>
            </div>
            )}
        </div> 
    </div>
  )
}