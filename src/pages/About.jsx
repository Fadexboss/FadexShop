import PageHeader from '../components/PageHeader';
import './About.css';

function About() {
    const values = [
        { icon: '✨', title: 'Kalite', desc: 'En yüksek kalite standartlarında ürünler sunuyoruz' },
        { icon: '🚀', title: 'Hız', desc: 'Siparişleriniz aynı gün kargoya verilir' },
        { icon: '💎', title: 'Güven', desc: '100% orijinal ürün garantisi' },
        { icon: '🎯', title: 'Müşteri Odaklı', desc: '7/24 müşteri desteği' }
    ];

    const team = [
        { name: 'Ahmet Yılmaz', role: 'Kurucu & CEO', emoji: '👨‍💼' },
        { name: 'Elif Demir', role: 'Tasarım Direktörü', emoji: '👩‍🎨' },
        { name: 'Can Öztürk', role: 'Teknoloji Lideri', emoji: '👨‍💻' }
    ];

    return (
        <div className="about-page">
            <PageHeader
                title="Hakkımızda"
                subtitle="Premium alışveriş deneyiminin adresi"
                backgroundImage="/Backgrounds/hakkimizda.jpg"
            />

            <section className="about-story">
                <div className="container">
                    <div className="story-content">
                        <div className="story-text">
                            <h2>Hikayemiz</h2>
                            <p>
                                2020 yılında kurulan FadexShop, premium ürünleri herkes için erişilebilir
                                kılma vizyonuyla yola çıktı. Bugün, binlerce mutlu müşteriyle Türkiye'nin
                                en güvenilir online alışveriş platformlarından biri haline geldik.
                            </p>
                            <p>
                                Kalite, güven ve müşteri memnuniyeti bizim için her şeyden önemli.
                                Her ürünümüz titizlikle seçilir ve kontrol edilir.
                            </p>
                        </div>
                        <div className="story-stats">
                            <div className="stat-item">
                                <span className="stat-number">50K+</span>
                                <span className="stat-label">Mutlu Müşteri</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">1000+</span>
                                <span className="stat-label">Ürün</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">99%</span>
                                <span className="stat-label">Memnuniyet</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-values">
                <div className="container">
                    <h2 className="section-title">Değerlerimiz</h2>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card">
                                <span className="value-icon">{value.icon}</span>
                                <h3>{value.title}</h3>
                                <p>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="about-team">
                <div className="container">
                    <h2 className="section-title">Ekibimiz</h2>
                    <div className="team-grid">
                        {team.map((member, index) => (
                            <div key={index} className="team-card">
                                <div className="team-avatar">{member.emoji}</div>
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
