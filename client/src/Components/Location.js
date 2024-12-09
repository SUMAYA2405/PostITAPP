// import React,{useEffect,useState} from "react";
// import axios from "axios";// connect to database

// const Location=()=>{
//     const[ip,setip]=useState(null);
//     const[geoDate,setGeoData]=useState(null);
//     const fetchAddress=async()=>{
        
//         try{
//             const response=await axios.get('https://api.ipify.org?format=json');
//             setip(response.data.ip);

//         } catch(error){
//             console.log("Error  fetching IP address:",error.message);
//         }
//     }
//     const getGeoLoctionData=async()=>{
//         if(!ip) return;
//         try{
//             const response=await axios.get("https://geo.ipify.org/api/v2/country?apiKey=at_tnFQRui0pGGPCcojONbpWkv2SOJQK&ipAddress=${ip}");
//             setGeoData.apply(response.data);
//             console.log("GeoLocation Data:", response.data);
//         }catch(error){
//             console.error("Error fetching geolocation data:", error.message);
//         }
//     }
//     useEffect(()=>{fetchAddress();},[]);
//     useEffect(()=>{if(ip){getGeoLoctionData}},[ip]);
//     return(
//         <div className="Location">
//            {ip ? <p>IP Address: {ip}</p> : <p>Loading IP address...</p>}
//       {geoDate ? (
//         <div>
//           Country: {geoDate.location.country}
//           <br />
//           Region: {geoDate.location.region}
//         </div>
//       ) : (
//         <p>Loading Geolocation Data...</p>
//       )}

//         </div>
//     )
// }

// export default Location;
import React, { useEffect, useState } from "react";
import axios from "axios"; // Connect to database

const Location = () => {
    const [ip, setIp] = useState(null);
    const [geoData, setGeoData] = useState(null);

    const fetchAddress = async () => {
        try {
            const response = await axios.get("https://api.ipify.org?format=json");
            setIp(response.data.ip);
        } catch (error) {
            console.error("Error fetching IP address:", error.message);
        }
    };

    const getGeoLocationData = async () => {
        if (!ip) return;
        try {
            const response = await axios.get(
                `https://geo.ipify.org/api/v2/country?apiKey=at_tnFQRui0pGGPCcojONbpWkv2SOJQK&ipAddress=${ip}`
            );
            setGeoData(response.data);
            console.log("GeoLocation Data:", response.data);
        } catch (error) {
            console.error("Error fetching geolocation data:", error.message);
        }
    };

    useEffect(() => {
        fetchAddress();
    }, []);

    useEffect(() => {
        if (ip) {
            getGeoLocationData();
        }
    }, [ip]);

    return (
        <div className="Location">
            {ip ? <p>IP Address: {ip}</p> : <p>Loading IP address...</p>}
            {geoData ? (
                <div>
                    <p>Country: {geoData.location.country}</p>
                    <p>Region: {geoData.location.region}</p>
                </div>
            ) : (
                <p>Loading Geolocation Data...</p>
            )}
        </div>
    );
};

export default Location;
