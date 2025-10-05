import { Navigate } from "react-router-dom";
import Token from './Token.js'

function Fallback() {
    return !Token() ? <Navigate to='/login' /> : <Navigate to='/assets' />;
}

export default Fallback;