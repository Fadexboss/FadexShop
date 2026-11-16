import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import './Hero.css';

const slides = [
    { image: '/images/editorial-hero.webp', alt: 'Taş duvar önünde ekru triko ve koyu pantolonla yeni sezon stili', label: 'Günün vazgeçilmezleri' },
    { image: '/images/editorial-city.webp', alt: 'Güneşli bir taş kapının önünde camel gömlek ceketle şehir stili', label: 'Şehrin ritminde' },
    { image: '/images/editorial-layers.webp', alt: 'Açık renk bir avluda lacivert ceket ve kum rengi pantolonla katmanlı stil', label: 'Katman katman, kendin gibi' },
    { image: '/images/editorial-weekend.webp', alt: 'Sıcak ışıklı bir stüdyoda karamel triko ve ekru pantolonla hafta sonu stili', label: 'Hafta sonuna yavaş bir başlangıç' },
];
const tickerItems = ['YENİ SEZON KOLEKSİYONU', 'GÜNLÜK STİLİN VAZGEÇİLMEZLERİ', 'GİYİM · AYAKKABI · AKSESUAR', 'ÖZENLİ DOKULAR, SADE ÇİZGİLER'];
const SLIDE_DURATION = 6500;
const FADE_DURATION = 1400;
const TICKER_SPEED = 38;

export default function Hero({ motionEnabled, onMotionToggle }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [movingSlides, setMovingSlides] = useState([0]);
    const [readySlides, setReadySlides] = useState([]);
    const [paused, setPaused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [tickerPaused, setTickerPaused] = useState(false);
    const [pageVisible, setPageVisible] = useState(() => !document.hidden);
    const [tickerLayout, setTickerLayout] = useState({ copies: 2, duration: 60 });
    const tickerRef = useRef(null);
    const tickerUnitRef = useRef(null);
    const remainingTime = useRef(SLIDE_DURATION);
    const motionPaused = paused || hovered || focused || !motionEnabled || !pageVisible;
    const playbackPaused = paused || !motionEnabled;
    const tickerIsPaused = tickerPaused || !motionEnabled;

    const goToSlide = useCallback(index => {
        setMovingSlides(previous => previous.includes(index) ? previous : [...previous, index]);
        setCurrentSlide(index);
    }, []);

    useEffect(() => {
        const ticker = tickerRef.current;
        const unit = tickerUnitRef.current;
        const updateLayout = () => {
            const unitWidth = unit.getBoundingClientRect().width;
            if (!unitWidth) return;
            const copies = Math.ceil(ticker.clientWidth / unitWidth) + 1;
            const duration = unitWidth * copies / TICKER_SPEED;
            setTickerLayout(previous => previous.copies === copies && Math.abs(previous.duration - duration) < .1 ? previous : { copies, duration });
        };
        const observer = new ResizeObserver(updateLayout);
        observer.observe(ticker);
        observer.observe(unit);
        updateLayout();
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // An outgoing photograph must keep its transform until it is fully transparent.
        const timer = window.setTimeout(() => {
            setMovingSlides(previous => previous.length === 1 && previous[0] === currentSlide ? previous : [currentSlide]);
        }, motionEnabled ? FADE_DURATION + 80 : 0);
        return () => window.clearTimeout(timer);
    }, [currentSlide, motionEnabled]);

    useEffect(() => {
        remainingTime.current = SLIDE_DURATION;
    }, [currentSlide, motionEnabled]);

    useEffect(() => {
        const onVisibility = () => setPageVisible(!document.hidden);
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    useEffect(() => {
        if (motionPaused || readySlides.length < 2) return;
        const startedAt = performance.now();
        const timer = window.setTimeout(() => {
            for (let offset = 1; offset < slides.length; offset += 1) {
                const next = (currentSlide + offset) % slides.length;
                if (readySlides.includes(next)) {
                    goToSlide(next);
                    break;
                }
            }
        }, remainingTime.current);
        return () => {
            window.clearTimeout(timer);
            remainingTime.current = Math.max(0, remainingTime.current - (performance.now() - startedAt));
        };
    }, [currentSlide, motionPaused, readySlides, goToSlide]);

    return (
        <section className="hero-section" aria-label="Yeni sezon koleksiyonu">
            <div className="hero-marquee hero-marquee-top">
                <span>AZ PARÇA. ÇOK HİKÂYE.</span>
                <span>FADEXSHOP — GÜNLÜK YAŞAM KOLEKSİYONU</span>
                <span>SONBAHAR / KIŞ 2026</span>
            </div>

            <div
                className={`hero ${motionPaused ? 'is-motion-paused' : ''}`}
                style={{ '--hero-zoom-duration': `${SLIDE_DURATION + FADE_DURATION}ms`, '--hero-fade-duration': `${FADE_DURATION}ms` }}
                role="region"
                aria-roledescription="slayt gösterisi"
                aria-label="Sezonun dört görünümü"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocusCapture={() => setFocused(true)}
                onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
            >
                <div className="hero-slider">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.image}
                            className={`hero-slide ${currentSlide === index ? 'active' : ''} ${movingSlides.includes(index) ? 'is-moving' : ''}`}
                            style={{ '--hero-zoom-name': index % 2 === 0 ? 'editorial-zoom-in' : 'editorial-zoom-out', '--hero-zoom-start': index % 2 === 0 ? 1 : 1.06 }}
                            aria-hidden={currentSlide !== index}
                        >
                            <img
                                src={slide.image}
                                alt={slide.alt}
                                className="hero-photo"
                                fetchPriority={index === 0 ? 'high' : 'low'}
                                loading="eager"
                                decoding="async"
                                width="1672"
                                height="941"
                                onLoad={() => setReadySlides(previous => previous.includes(index) ? previous : [...previous, index])}
                            />
                        </div>
                    ))}
                    <div className="hero-overlay"/>
                </div>

                <div className="container hero-content">
                    <div className="hero-text-wrapper">
                        <div className="hero-text">
                            <span className="hero-badge">YENİ SEZON · 2026 / 27</span>
                            <h1 className="hero-title">Her gün için.<br/><em>Kendin gibi.</em></h1>
                            <p className="hero-description">İyi hissettiren dokular, sade çizgiler.<br/>Gardırobunun en çok giyilen parçalarıyla tanış.</p>
                            <div className="hero-buttons">
                                <Link to="/categories" className="btn btn-primary">Koleksiyonu Keşfet <Icon name="arrow" size={17}/></Link>
                                <Link to="/about" className="btn btn-glass">Bizi Tanıyın</Link>
                            </div>
                            <div className="hero-stats">
                                <div className="stat"><Icon name="fabric" size={19}/><span>Özenli dokular</span></div>
                                <div className="stat"><Icon name="check" size={19}/><span>Zamansız kesimler</span></div>
                                <div className="stat"><Icon name="bag" size={19}/><span>Kolay kombinler</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <span className="hero-slide-caption" key={currentSlide}>{slides[currentSlide].label}</span>
                        <div className="hero-controls" aria-label="Banner kontrolleri">
                            <span className="hero-slide-count" aria-hidden="true">0{currentSlide + 1} / 04</span>
                            <div className="hero-dots">
                                {slides.map((slide, index) => (
                                    <button key={slide.image} className={`hero-dot ${currentSlide === index ? 'active' : ''}`} disabled={!readySlides.includes(index)} onClick={() => goToSlide(index)} aria-label={`${index + 1}. görsele geç`} aria-pressed={currentSlide === index}><span/></button>
                                ))}
                            </div>
                            <button className="hero-pause" onClick={() => { if (!motionEnabled) { onMotionToggle(); setPaused(false); } else setPaused(!paused); }} aria-label={playbackPaused ? 'Otomatik geçişi oynat' : 'Otomatik geçişi duraklat'} aria-pressed={playbackPaused}><Icon name={playbackPaused ? 'play' : 'pause'} size={14}/></button>
                        </div>
                    </div>
                </div>
            </div>

            <div ref={tickerRef} className={`hero-marquee hero-marquee-bottom ${tickerIsPaused ? 'is-paused' : ''}`} aria-label="Koleksiyon duyuruları">
                <div className="marquee-track" style={{ '--marquee-duration': `${tickerLayout.duration}s` }}>
                    {[0, 1].map(copy => (
                        <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
                            {Array.from({ length: tickerLayout.copies }, (_, repetition) => (
                                <div className="marquee-unit" key={repetition} ref={copy === 0 && repetition === 0 ? tickerUnitRef : undefined} aria-hidden={copy > 0 || repetition > 0}>
                                    {tickerItems.map(item => <span key={item}>{item}<i aria-hidden="true"/></span>)}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <button className="marquee-toggle" onClick={() => { if (!motionEnabled) { onMotionToggle(); setTickerPaused(false); } else setTickerPaused(!tickerPaused); }} aria-label={tickerIsPaused ? 'Kayan yazıyı oynat' : 'Kayan yazıyı duraklat'} aria-pressed={tickerIsPaused}><Icon name={tickerIsPaused ? 'play' : 'pause'} size={13}/></button>
            </div>
        </section>
    );
}
