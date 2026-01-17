import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <img src="/Company_images/logo.png" alt="FadexShop Logo" className="footer-logo-img" />
                            <span className="gradient-text">FadexShop</span>
                        </Link>
                        <p className="footer-description">
                            Premium ürünler, eşsiz alışveriş deneyimi.
                            Kalite ve şıklığı bir arada sunuyoruz.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link">📷</a>
                            <a href="#" className="social-link">🐦</a>
                            <a href="#" className="social-link">📘</a>
                            <a href="#" className="social-link">🎵</a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Hızlı Linkler</h4>
                        <ul>
                            <li><Link to="/">Ana Sayfa</Link></li>
                            <li><Link to="/categories">Kategoriler</Link></li>
                            <li><Link to="/about">Hakkımızda</Link></li>
                            <li><Link to="/faq">SSS</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Destek</h4>
                        <ul>
                            <li><Link to="/faq">Sıkça Sorulan Sorular</Link></li>
                            <li><a href="#">Kargo Takip</a></li>
                            <li><a href="#">İade Politikası</a></li>
                            <li><a href="#">Gizlilik Politikası</a></li>
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h4>Bültene Kayıt Ol</h4>
                        <p>İndirimlerden ve yeni ürünlerden haberdar ol!</p>
                        <form className="newsletter-form">
                            <input
                                type="email"
                                placeholder="E-posta adresiniz"
                                className="newsletter-input"
                            />
                            <button type="submit" className="newsletter-btn">→</button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 FadexShop. Tüm hakları saklıdır.</p>
                    <div className="payment-methods">
                        <span>💳</span>
                        <span>🏦</span>
                        <span>📱</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
