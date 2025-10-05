import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCache } from './useAuth';

function Logout() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleLogout() {
        setIsLoading(true);
        localStorage.removeItem('token');
        clearCache();  
        navigate('/login');
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