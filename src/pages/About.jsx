import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Icon from '../components/Icon';
import './About.css';
export default function About() {
    const values = [
        {number:'01', title:'Sadelik', desc:'Fazlalıklardan arınmış çizgiler. Her gün giymek isteyeceğin parçalar.'},
        {number:'02', title:'Doku', desc:'Giydiğinde fark edilen, gün boyu rahat hissettiren kumaşlar.'},
        {number:'03', title:'Uyum', desc:'Birbirini tamamlayan renkler. Daha az çabayla daha çok kombin.'},
        {number:'04', title:'Devamlılık', desc:'Bir sezonun ötesinde, gardırobunda kendine yer bulan tasarımlar.'},
    ];
    const edits = [
        {name:'Günlük temeller', desc:'Rahat kesimler, yalın bir görünüm.', image:'tee-black', category:'Giyim'},
        {name:'Hafif adımlar', desc:'Günün ritmine ayak uydur.', image:'runner-white', category:'Ayakkabı'},
        {name:'Son dokunuş', desc:'Stilini tamamlayan küçük detaylar.', image:'cap-navy', category:'Aksesuar'}
    ];
    return <div className="about-page">
        <PageHeader title="Sade olan kalır." subtitle="Her günün içinde, kendine ait bir stil."/>
        <section className="about-story"><div className="container story-content">
            <div className="story-text"><span className="eyebrow">BİZİM YAKLAŞIMIMIZ</span><h2>İyi bir gardırop,<br/>iyi seçilmiş parçalardan oluşur.</h2><p>Sabah evden çıkarken elinin gittiği o tişört. Serin bir akşamda yanına aldığın triko. Her kombinle uyum sağlayan ayakkabı.</p><p>FadexShop, günlük giyime bu sade bakışla yaklaşır. Nötr tonları, rahat kesimleri ve küçük detayları bir araya getirerek giyinmeyi daha kolay, daha kişisel hale getirir.</p><p className="story-note" id="proje">FadexShop, bir e-ticaret deneyimini göstermek için hazırlanmış örnek bir web projesidir. Koleksiyon, ürün bilgileri ve fotoğraflar temsilidir.</p></div>
            <div className="story-stats">{[['01','Giyim','Günün vazgeçilmezleri'],['02','Ayakkabı','Her adımda rahatlık'],['03','Aksesuar','Karakter katan detaylar']].map(([number,title,desc]) => <Link to={`/categories?category=${encodeURIComponent(title)}`} className="stat-item" key={number}><span className="stat-number">{number}</span><div><span className="stat-label">{title}</span><p>{desc}</p></div><Icon name="arrow" size={18}/></Link>)}</div>
        </div></section>
        <section className="about-values"><div className="container"><span className="eyebrow">SEÇİMLERİMİZE YÖN VERENLER</span><h2 className="section-title">Dört küçük ilke.</h2><div className="values-grid">{values.map(value => <div className="value-card" key={value.number}><span className="value-icon">{value.number}</span><h3>{value.title}</h3><p>{value.desc}</p></div>)}</div></div></section>
        <section className="about-team"><div className="container"><span className="eyebrow products-eyebrow">BİR ARADA DAHA İYİ</span><h2 className="section-title">Koleksiyonu yakından tanı.</h2><div className="team-grid">{edits.map(edit => <Link to={`/categories?category=${encodeURIComponent(edit.category)}`} className="team-card" key={edit.name}><div className="team-avatar"><img src={`/images/${edit.image}.webp`} alt={edit.name} loading="lazy" width="400" height="500"/></div><h3>{edit.name}<Icon name="arrow" size={17}/></h3><p>{edit.desc}</p></Link>)}</div></div></section>
    </div>;
}
