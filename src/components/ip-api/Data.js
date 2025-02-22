import axios from 'axios';

const API_URL = "https://ip-api.com/json/";
const FIELDS = "status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query";

//Search any IP or domain
export const searchIP = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/${query}?fields=${FIELDS}`);
        console.log("Fetched IP data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching search result: ",error);
        return null;
    }
}