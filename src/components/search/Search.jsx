import React, { useState } from 'react';
import { AnimatedBackground } from 'animated-backgrounds';

export default function Search({onSubmit}) {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    
    // Handle query change
    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    // Validate input and extract domain if necessary
    const validateInput = (input) => {
        const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)$/;
        const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*$/;

        if (ipv4Pattern.test(input)) {
            return input; // Valid IPv4
        } else if (ipv6Pattern.test(input)) {
            return input; // Valid IPv6
        } else if (urlPattern.test(input)) {
            const url = new URL(input.startsWith('http') ? input : `http://${input}`);
            return url.hostname; // Extract domain from URL
        } else {
            return null; // Invalid input
        }
    };

      //Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(query); // Call the onSubmit function passed from App.js
        //setQuery(""); // Clear the input field
        const validatedQuery = validateInput(query);
        if (validatedQuery) {
            setQuery(validatedQuery); // Update input field with validated query
            onSubmit(validatedQuery); // Call the onSubmit function passed from App.js
        } else {
            setError("Invalid input. Please enter a valid IP address or domain.");
        }
      }; 
    
    return (
        <div className="w-full max-w-6xl p-5 p-10 mx-auto">
            <AnimatedBackground animationName="gradientWave"  style={{ opacity: 0.4 , zIndex: -1  }} />
            <div>
                <h1 className="pb-5 text-5xl font-QuicksandMedium">IP Address Tracker</h1>
                <h2 className="text-3xl font-QuicksandLight">Know Your IP, Protect Your Privacy, Track with Confidence!</h2>
            </div>
            <div className="flex items-center justify-center flex-1 p-6">
                <div className="w-full max-w-lg">
                    <form className="mt-5 sm:flex sm:items-center"  onSubmit={handleSubmit}>
                        <input  
                            onChange={handleQueryChange}
                            value={query} 
                            className="inline w-full py-2 pl-3 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:border-gray-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" 
                            placeholder="Search for any IP address or domain" 
                            type="text" />
                        <button 
                            type="submit"
                            className="inline-flex items-center justify-center w-full px-4 py-2 mt-3 font-medium text-white bg-gray-800 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            
                                    Search
                            
                        </button>
                    </form>
                </div>
            </div>
        </div>    
    );
}