
import './App.css'
import PharmallianceLogo from './assets/Pharmalliancelogo.svg';
import {Link} from "react-router-dom";

function HomePage() {


  return (
      <>

        <div
            className="grid md:grid-cols-2 items-center md:gap-8 gap-6 font-[sans-serif] max-w-5xl max-md:max-w-md mx-auto">
          <div className="max-md:order-1 max-md:text-center">
            <h2 className="md:text-4xl text-3xl md:leading-10 font-extrabold text-gray-800 mb-4">Vacation Request</h2>
            <p className="mt-4 text-base text-gray-600 leading-relaxed"> This application offers you the possibility to send a Vacation request and review the results</p>
            <div className="mt-8 flex max-sm:flex-col sm:space-x-4 max-sm:space-y-6">
              <Link to={"/Requests"}
                 className="px-6 py-3 text-base font-semibold text-white bg-[#1a948c] rounded-full hover:bg-[#343e70] hover:text-white transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50" >
                Send A Request </Link>
              <Link to={"/"}
                 className="px-6 py-3 text-base font-semibold text-[#1a948c] border border-[#1a948c] rounded-full hover:text-white hover:bg-[#343e70] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50" >Visit History
                </Link>
            </div>
          </div>
          <div className="md:h-[450px]">

            <img
                src={PharmallianceLogo}
                 className="  h-auto object-cover  rounded-lg shadow-xl" alt=""/>
          </div>
        </div>

      </>
  )
}

export default HomePage
