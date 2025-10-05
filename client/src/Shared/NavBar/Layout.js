import Navbar from './Navbar.js';
import './Layout.css';

function Layout({ children }) {
    return (
        <div className="layout">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}

export default Layout;