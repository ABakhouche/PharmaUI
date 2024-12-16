import './App.css';
import LogoPharmalliance from './assets/unnamed.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

function HomePage() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false); // Default to false
  const [cardId, setCardId] = useState(''); // For card ID input

  // Check for ticket on component mount
  useEffect(() => {
    const ticket = sessionStorage.getItem('ticket');
    if (!ticket) {
      setOpenModal(true); // Open modal only if no ticket is found
    }
  }, []);

  // Function to handle authentication on modal submit
    const handleAuth = async () => {
        setLoading(true);
        setError(null);

        try {
            // First request: Authentication
            const response = await axios.post(
                'http://xecm.itsolutions.dz:444/otcs/cs.exe/api/v1/auth',
                qs.stringify({
                    username: 'abakhouche',
                    password: 'ABK@XECM#8',
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            // Save authentication ticket in localStorage
            sessionStorage.setItem('ticket', response.data.ticket);
            console.log(sessionStorage.getItem('ticket'));

            // Retrieve CardID from sessionStorage
            const cardID = sessionStorage.getItem('CardID');

            if (cardID) {
                // Encode the CardID before sending it in the request
                const encodedCardID = encodeURIComponent(cardID);

                // Second request: Retrieve WebReport using the encoded CardID
                const reportResponse = await axios.get(
                    `http://xecm.itsolutions.dz:444/otcs/cs.exe/api/v1/nodes/116702/output?format=webreport&var1=${encodedCardID}`,
                    {
                        headers: {
                            'OTCSTicket': response.data.ticket, // Send the ticket in headers
                        },
                    }
                );

                sessionStorage.setItem('User', reportResponse.data)
                console.log('WebReport Data:', reportResponse.data);



            } else {
                console.error('CardID not found in sessionStorage');
            }

            // Close the modal and redirect on successful authentication and WebReport retrieval
            setOpenModal(false);
            // navigate('/Requests'); // Uncomment if you want to redirect to the Requests page
        } catch (error) {
            console.error('Authentication or WebReport retrieval failed:', error);
            setError('Authentication or data retrieval failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    // Handle modal submission and validation
  const handleModalSubmit = () => {

    if (cardId.trim() !== '') {
      handleAuth();
      sessionStorage.setItem('CardID', cardId)

    } else {
      setError('Please enter a valid Card ID');
    }
  };

  return (
      <>
        {/* Authentication Modal */}
        <Modal
            open={openModal}
            disableEscapeKeyDown // Prevent closing with Escape key
            onClose={() => {}}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
          <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: '8px',
                boxShadow: 24,
                p: 4,
              }}
          >
            <Typography variant="h6" gutterBottom>
                Entrer votre carte pour s'authentifier
            </Typography>
            <TextField
                type="password"
                label="Card ID"
                fullWidth
                value={cardId}
                onChange={(e) => setCardId(e.target.value)}
                required
                sx={{ mb: 2 }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
                variant="contained"
                className="px-6 py-3 text-base font-semibold text-[#1a948c] border border-[#1a948c] rounded-full hover:text-white hover:bg-[#343e70] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50"
                onClick={handleModalSubmit}
                disabled={loading}
                fullWidth
            >
              {loading ? 'authentification...' : 'authentifier'}
            </Button>
          </Box>
        </Modal>

        {/* Rest of HomePage content */}
        <div className="grid md:grid-cols-2 items-center md:gap-8 gap-6 font-[sans-serif] max-w-5xl max-md:max-w-md mx-auto">
          <div className="max-md:order-1 max-md:text-center">
            <h2 className="md:text-4xl text-3xl md:leading-10 font-extrabold text-gray-800 mb-4">
              Demande de congé
            </h2>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              Cette interface vous facilite la demande de votre titre de congé .
            </p>
            <div className="mt-8 justify-center max-sm:flex-col sm:space-x-4 max-sm:space-y-6">
              <Link
                  to={'/Requests'}
                  className="px-6 py-3 text-base font-semibold text-[#000000] border border-[#000000] rounded-full hover:text-white hover:bg-[#22297c] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50"
              >
                Envoyer une demande
              </Link>
              {/*<Link*/}
              {/*    to={'/'}*/}
              {/*    className="px-6 py-3 text-base font-semibold text-[#1a948c] border border-[#1a948c] rounded-full hover:text-white hover:bg-[#343e70] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#1a948c] focus:outline-none focus:ring-opacity-50"*/}
              {/*>*/}
              {/*  Visit History*/}
              {/*</Link>*/}
            </div>
          </div>
          <div className="md:h-[450px]">
            <img
                src={LogoPharmalliance}
                className="h-auto object-cover rounded-lg "
                alt="Pharmalliance Logo"
            />
          </div>
        </div>
      </>
  );
}

export default HomePage;





