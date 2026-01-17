import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
    // Slider images from public/Home_page_background_images
    const sliderImages = [
        "/Home_page_background_images/12G_Fullwith_2496x988aegzst_2026010608381215402.jpg",
        "/Home_page_background_images/12G_Fullwith_2496x98avcdsavf_2026010810193433433.png"
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [sliderImages.length]);

    const marqueeText = "YENİ SEZON KOLEKSİYONU ŞİMDİ MAĞAZADA • ÜCRETSİZ KARGO FIRSATI • %50'YE VARAN İNDİRİMLER • PREMİUM KALİTE • GÜVENLİ ALIŞVERİŞ • ";

    return (
        <section className="hero-section">
            {/* Top Marquee */}
            <div className="hero-marquee hero-marquee-top">
                <div className="marquee-content">
                    <span>{marqueeText}{marqueeText}{marqueeText}</span>
                </div>
            </div>

            <div className="hero">
                {/* Slider Background */}
                <div className="hero-slider">
                    {sliderImages.map((image, index) => (
                        <div
                            key={index}
                            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                    ))}
                    {/* Overlay to ensure text readability */}
                    <div className="hero-overlay"></div>
                </div>

                <div className="container hero-content">
                    {/* Left side - Frosted glass text box */}
                    <div className="hero-text-wrapper">
                        <div className="hero-text">
                            <span className="hero-badge">
                                <span className="badge-dot"></span>
                                Yeni Koleksiyon 2026
                            </span>
                            <h1 className="hero-title">
                                Premium Ürünler,
                                <span className="gradient-text"> Eşsiz Deneyim</span>
                            </h1>
                            <p className="hero-description">
                                En son moda trendlerini, kaliteli giyim ürünlerini ve
                                yaşam tarzı aksesuarlarını keşfedin. Kalite ve şıklık bir arada.
                            </p>
                            <div className="hero-buttons">
                                <Link to="/categories" className="btn btn-primary btn-glow">
                                    Alışverişe Başla
                                    <span className="btn-arrow">→</span>
                                </Link>
                                <Link to="/about" className="btn btn-glass">
                                    Bizi Tanıyın
                                </Link>
                            </div>

                            <div className="hero-stats">
                                <div className="stat">
                                    <span className="stat-number">50K+</span>
                                    <span className="stat-label">Mutlu Müşteri</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">1000+</span>
                                    <span className="stat-label">Ürün</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">24/7</span>
                                    <span className="stat-label">Destek</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Empty, shows background image */}
                    <div className="hero-visual"></div>
                </div>
            </div>

            {/* Bottom Marquee */}
            <div className="hero-marquee hero-marquee-bottom">
                <div className="marquee-content">
                    <span>{marqueeText}{marqueeText}{marqueeText}</span>
                </div>
            </div>
        </section>
    );
}

export default Hero;
