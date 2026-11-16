import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import './Footer.css';
export default function Footer({ motionEnabled, onMotionToggle }) {
    const [message, setMessage] = useState('');
    return <footer className="footer">
        <div className="container">
            <div className="footer-grid">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo logo" aria-label="FadexShop ana sayfa"><span className="brand-symbol" aria-hidden="true">f.</span><span className="logo-text">fadex<span>shop</span><i/></span></Link>
                    <p className="footer-description">Sade bir gardırop.<br/>Kendine ait bir stil.</p>
                    <Link to="/about" className="footer-story-link">Hikâyemizi keşfet <Icon name="arrow" size={15}/></Link>
                </div>
                <div className="footer-links"><h4>Keşfet</h4><ul><li><Link to="/">Ana Sayfa</Link></li><li><Link to="/categories">Koleksiyon</Link></li><li><Link to="/about">Hakkımızda</Link></li><li><Link to="/faq">Sıkça Sorulanlar</Link></li></ul></div>
                <div className="footer-links"><h4>Yardım</h4><ul><li><Link to="/faq#teslimat">Kargo ve Teslimat</Link></li><li><Link to="/faq#iade">İade ve Değişim</Link></li><li><Link to="/faq#odeme">Ödeme Bilgileri</Link></li><li><Link to="/faq#gizlilik">Gizlilik</Link></li></ul></div>
                <div className="footer-newsletter">
                    <h4>Biraz ilham, ara sıra.</h4><p>Yeni koleksiyonlar ve stil notları için.</p>
                    <form className="newsletter-form" onSubmit={event => { event.preventDefault(); setMessage('Bu örnek mağazada e-posta kaydı alınmıyor.'); }}>
                        <label htmlFor="newsletter-email" className="sr-only">E-posta adresiniz</label>
                        <input id="newsletter-email" type="email" autoComplete="email" required placeholder="E-posta adresiniz" className="newsletter-input"/>
                        <button type="submit" className="newsletter-btn" aria-label="Bültene katıl"><Icon name="arrow" size={20}/></button>
                    </form>
                    <p className="newsletter-message" role="status">{message || 'Örnek bülten formu. Bilgileriniz gönderilmez.'}</p>
                </div>
            </div>
            <div className="footer-bottom"><p>© {new Date().getFullYear()} FadexShop</p><p className="demo-disclosure">Örnek mağaza. Ürünler ve görseller temsilidir; gerçek sipariş ve ödeme alınmaz.</p><div className="footer-preferences"><button type="button" className="motion-toggle" onClick={onMotionToggle} aria-label={motionEnabled ? 'Animasyonları kapat' : 'Animasyonları aç'} aria-pressed={motionEnabled}><Icon name={motionEnabled ? 'pause' : 'play'} size={12}/><span>Animasyonlar: {motionEnabled ? 'Açık' : 'Kapalı'}</span></button><span className="footer-signature">EVERYDAY, CONSIDERED.</span></div></div>
        </div>
    </footer>;
}
