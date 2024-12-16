import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';  // Import PropTypes

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!sessionStorage.getItem('ticket');  // Check if auth token exists

    return isAuthenticated ? children : <Navigate to="/" />;
};

// Define prop types for the component
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,  // 'children' must be a React node and is required
};

export default PrivateRoute;

