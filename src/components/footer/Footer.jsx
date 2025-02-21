import React from 'react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = ({sectionRef}) => {
  return (
    <div className="bg-gray-800 ">
      <footer className="w-full px-4 py-8 mx-auto max-w-7xl md:px-16 lg:px:28">
        <div className="grid grid-cols-1 place-items-center md:grid-cols-3">
          <div className="md:pr-10 3x3-pb-10">
            <h2 className="mb-4 text-lg font-bold text-white">About</h2>
            <p className="text-gray-300">
              WhereMyIP is an IP address tracker that helps users quickly identify your public IP address and its associated location. It provides valuable details such as the country, city, and internet service provider (ISP) linked to the IP.
            </p>
          </div>
          <div className="w-40 pt-6 pb-6 max-md-hidden md:pt-0 md:pb-0">
            <img src="/images/app-logo.png" alt="logo" width="500" height="600" className=""/>
          </div>
          <div ref={sectionRef}>
            <h2 className="mb-4 text-lg font-bold text-white">Links</h2>
            <ul>
              <li className="flex items-center p-2">
                <FaGithub className="text-gray-300"/>
                <a href="https://github.com/pavithrailankoon/where-my-ip" className="pl-3 text-gray-300 hover:underline" target="_blank">Github</a>
              </li>
              <li className="flex items-center p-2">
                <FaLinkedin className="text-gray-300"/>
                <a href="https://www.linkedin.com/in/pavithrailankoon/" className="pl-3 text-gray-300 hover:underline" target="_blank">Linkedin</a>
              </li>
              <li className="flex items-center p-2">
                <FaEnvelope className="text-gray-300"/>
                <a href="mailto:ilankoonpavithra@gmail.com" className="pl-3 text-gray-300 hover:underline">Email</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 mt-6 text-center text-gray-300 border-t border-gray-600">
          <p>Developed by <span className="font-bold text-white hover:underline">Pavithra Ilankoon</span></p>
        </div>
    </footer>
    </div> 
  )
}

export default Footer