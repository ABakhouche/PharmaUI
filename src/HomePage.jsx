import './App.css';
import PharmallianceLogo from './assets/Pharmalliancelogo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { useState } from 'react';

function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
          'http://xecm.itsolutions.dz:444/otcs/cs.exe/api/v1/auth',
          qs.stringify({
            username: 'abakhouche',
            password: 'ABK@ITSOTCS8'
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
      );

      console.log(response.data);
      // Save the token to local storage
      localStorage.setItem('OtcsTicket', response.data.token); // Adjust if the token is in a different part of the response

      // Redirect after successful authentication
      navigate('/Requests');
    } catch (error) {
      console.error('Authentication failed:', error);
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <div className="grid md:grid-cols-2 items-center md:gap-8 gap-6 font-[sans-serif] max-w-5xl max-md:max-w-md mx-auto">
          <div className="max-md:order-1 max-md:text-center">
            <h2 className="md:text-4xl text-3xl md:leading-10 font-extrabold text-gray-800 mb-4">
              Vacation Request
            </h2>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              This application offers you the possibility to send a Vacation request and review the results
            </p>
            <div className="mt-8 flex max-sm:flex-col sm:space-x-4 max-sm:space-y-6">
              <button
                  onClick={handleAuth}
                  disabled={loading}
                  className={`px-6 py-3 text-base font-semibold ${
                      loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#1a948c]'
                  } text-white rounded-full hover:bg-[#343e70] hover:text-white transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50`}
              >
                {loading ? (
                    <div className="flex items-center justify-center">
                      <span className="ml-2">Authenticating...</span>
                    </div>
                ) : (
                    'Send A Request'
                )}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <Link
                  to={"/"}
                  className="px-6 py-3 text-base font-semibold text-[#1a948c] border border-[#1a948c] rounded-full hover:text-white hover:bg-[#343e70] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50"
              >
                Visit History
              </Link>
            </div>
          </div>
          <div className="md:h-[450px]">
            <img
                src={PharmallianceLogo}
                className="h-auto object-cover rounded-lg shadow-xl"
                alt="Pharmalliance Logo"
            />
          </div>
        </div>
      </>
  );
}

export default HomePage;


