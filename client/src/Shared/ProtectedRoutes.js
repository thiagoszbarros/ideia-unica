import {Outlet, Navigate} from 'react-router-dom';
import Token from './Token';

function ProtectedRoutes() {
    return Token() ? <Outlet/> : <Navigate to="/login" />;
}

export default ProtectedRoutes;