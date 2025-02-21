import React, { useEffect, useState } from 'react'
import { searchIP } from "../ip-api/Data";
import './livemap.css'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from "leaflet";
import 'leaflet/dist/leaflet.css'
import locationSvg from "../../assets/images/location.svg";

export default function MainPane({text}) {

  const [data, setData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [coordinate, setCoordinate] = useState([0.0, 0.0]);

  // Fetch user IP on page load or handle search
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await searchIP(text);
        console.log("Fetched IP data:", data);
        setData(data);
        setCoordinate([data.lat, data.lon]);
      } catch (error) {
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
      //   if (data.lat !== undefined && data.lon !== undefined) {
      //     map.setView(center);
      // }
        return null;
    }
  
  return (
    <div className="bg-gray-50">
        <div className="pt-12 text-3xl text-center font-QuicksandLight">
            <h3>IP Information</h3>
        </div>
        <div className="grid w-full max-w-6xl gap-4 p-10 p-12 mx-auto md:grid-cols-2 md:item-center">
          
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
                    <td colSpan="2" className="px-4 py-2 text-center">Loading...</td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
            <div className="w-full">

              {/* Live map view */}
                <MapContainer center={coordinate} zoom={7.5} scrollWheelZoom={false}>
                      <ChangeView center={coordinate} />
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={coordinate}  icon={svgIcon}>
                          
                        </Marker>
                </MapContainer>
            </div>
        </div> 
    </div>
  )
}