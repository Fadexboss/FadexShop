import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';
import './Navbar.css';
export default function Navbar({ cartCount }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuButton = useRef(null);
    const navigation = useRef(null);
    useEffect(() => {
        if (!isMenuOpen) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const frame = requestAnimationFrame(() => navigation.current?.querySelector('.nav-links a')?.focus());
        const closeMenu = () => { setIsMenuOpen(false); menuButton.current?.focus(); };
        const onKey = (event) => {
            if (event.key === 'Escape') closeMenu();
            if (event.key === 'Tab') {
                const elements = [...navigation.current.querySelectorAll('a, button')].filter(element => element.getClientRects().length);
                const first = elements[0]; const last = elements.at(-1);
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
                else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
            }
        };
        const onResize = () => { if (window.innerWidth > 768) closeMenu(); };
        document.addEventListener('keydown', onKey);
        window.addEventListener('resize', onResize);
        return () => { cancelAnimationFrame(frame); document.body.style.overflow = previous; document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
    }, [isMenuOpen]);
    const links = [['/', 'Ana Sayfa'], ['/categories', 'Ürünler'], ['/about', 'Hakkımızda'], ['/faq', 'Sıkça Sorulanlar']];
    return <nav ref={navigation} className="navbar" aria-label="Ana menü">
        <div className="container navbar-content">
            <Link to="/" className="logo" aria-label="FadexShop ana sayfa" onClick={() => setIsMenuOpen(false)}><span className="brand-symbol" aria-hidden="true">f.</span><span className="logo-text">fadex<span>shop</span><i/></span></Link>
            <div className={`nav-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}/>
            <ul id="main-navigation" className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                {links.map(([path,label]) => <li key={path}><NavLink to={path} end={path === '/'} onClick={() => setIsMenuOpen(false)}>{label}</NavLink></li>)}
            </ul>
            <div className="nav-actions">
                <Link to="/cart" className="cart-btn" aria-label={`Sepetim, ${cartCount} ürün`} onClick={() => setIsMenuOpen(false)}><Icon name="bag" size={21}/><span className="cart-label">Sepetim</span>{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</Link>
                <button ref={menuButton} className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={isMenuOpen} aria-controls="main-navigation"><span className="hamburger"/></button>
            </div>
        </div>
    </nav>;
}
