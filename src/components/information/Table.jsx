import React, { useEffect, useState } from 'react'
import { getUserIP, searchIP } from "../ip-api/Data";

export default function Table() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");

  // Fetch user IP on page load
  useEffect(() => {
    async function fetchIP() {
      try {
        const data = await getUserIP();
        console.log("Fetched IP data:", data); 
        setData(data);
      } catch (error) {
        console.error("Error fetching IP data:", error);
      }
    }
    fetchIP();
  }, []);

  // Handle search
  const handleSearch = async () => {
    if (query.trim() === "") return;
    const data = await searchIP(query);
    setData(data);
  }

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
  
  return (
    <div>
          <table className="w-full bg-white border table-auto border-grey-300">
            <thead>
              <tr className="text-white bg-red-500">
                <th className="w-1/4 px-4 py-2 border">Field</th>
                <th className="w-1/2 px-4 py-2 border">Response</th>
              </tr>
            </thead>
            <tbody>
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
  )
}