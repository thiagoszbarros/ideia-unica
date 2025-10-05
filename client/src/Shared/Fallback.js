import { Navigate } from "react-router-dom";
import { useAuth } from './useAuth';

function Fallback() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return !isAuthenticated ? <Navigate to='/login' /> : <Navigate to='/assets' />;
}

export default Fallback;