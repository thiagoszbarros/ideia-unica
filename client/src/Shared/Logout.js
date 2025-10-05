import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Token from "./Token";

function Logout() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    if (!Token()) {
        return navigate('/login');
    }

    function handleLogout() {
        setIsLoading(true);
        localStorage.removeItem('token');
    }

    return (
        <div >
            <button
                onClick={handleLogout}
                type="button"
                className={`login-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
            >{isLoading ? 'Saindo...' : 'Sair'}</button>
        </div>
    )
}

export default Logout;