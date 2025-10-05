import Logout from '../Logout.js';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <h2>Ideia Única</h2>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <Logout />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;