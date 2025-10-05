import { Navigate } from "react-router-dom";
import Token from './Shared/Token.js'

function Home() {
    return !Token() ? <Navigate to='/login' /> : <Navigate to='/assets' />;
}

export default Home;