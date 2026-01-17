import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ cartCount }) {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    // Reset menu state on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMenuOpen]);

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo">
                    <img src="/Company_images/logo.png" alt="FadexShop Logo" className="logo-icon" />
                    <span className="logo-text">FadexShop</span>
                </Link>

                <div className={`nav-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)} />

                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li>
                        <Link to="/" className={isActive('/') ? 'active' : ''}>
                            Ana Sayfa
                        </Link>
                    </li>
                    <li>
                        <Link to="/categories" className={isActive('/categories') ? 'active' : ''}>
                            Ürünler
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className={isActive('/about') ? 'active' : ''}>
                            Hakkımızda
                        </Link>
                    </li>
                    <li>
                        <Link to="/faq" className={isActive('/faq') ? 'active' : ''}>
                            SSS
                        </Link>
                    </li>
                </ul>

                <div className="nav-actions">
                    <Link to="/cart" className="cart-btn">
                        <span>🛒</span>
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
                    </Link>

                    <button
                        className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menü"
                    >
                        <span className="hamburger"></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

