import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    if (!localStorage.getItem('token')) {
        setTimeout(() => {
            return navigate('/');
        }, 1000);
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