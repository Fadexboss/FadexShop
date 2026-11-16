import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import './FAQ.css';
const faqs = [
    { id:'magaza', question:'FadexShop gerçek bir mağaza mı?', answer:'FadexShop, bir online mağazanın tasarımını ve alışveriş akışını göstermek için hazırlanmış bir örnek projedir. Ürünler, fiyatlar ve görseller temsilidir. Gerçek sipariş oluşturulmaz ve ödeme alınmaz.' },
    { id:'sepet', question:'Sepeti ve ürün seçeneklerini deneyebilir miyim?', answer:'Evet. Koleksiyonu kategori, beden, renk ve fiyata göre filtreleyebilir; ürün detayında seçenekleri inceleyip sepete ekleyebilirsiniz. Sepetiniz bu tarayıcıda saklanır. Tarayıcı verilerini sildiğinizde sepet de sıfırlanır.' },
    { id:'teslimat', question:'Kargo ücreti nasıl hesaplanıyor?', answer:'Örnek alışveriş akışında 500 TL ve üzerindeki sepetler için kargo ücretsizdir. Daha düşük tutarlar için 29,90 TL kargo bedeli hesaplanır. Bu tutarlar yalnızca sepet deneyimini göstermek içindir; teslimat yapılmaz.' },
    { id:'iade', question:'İade ve değişim işlemleri yapılabiliyor mu?', answer:'Bu sitede gerçek satış yapılmadığı için iade veya değişim işlemi bulunmuyor. Gerçek bir mağaza için bu alan işletmenin teslimat ve iade koşullarına göre düzenlenebilir.' },
    { id:'odeme', question:'Ödemeye geç butonu ne yapıyor?', answer:'Sepet özetinin altında örnek alışveriş akışına ilişkin bir açıklama gösterir. Kart veya adres bilgisi istenmez; ödeme kuruluşuna bağlanılmaz.' },
    { id:'beden', question:'Beden ve renk seçimini nasıl yapabilirim?', answer:'Ürün detay sayfasında önce rengi, ardından bedeni seçebilirsiniz. Sepet satırında seçtiğiniz renk ve beden görünür. Aynı ürünün farklı bedenleri veya renkleri ayrı satırlarda tutulur.' },
    { id:'gizlilik', question:'Hangi bilgiler saklanıyor?', answer:'Örnek sepetiniz ve animasyon tercihiniz bu cihazdaki tarayıcı depolamasında tutulur. Bülten formu e-posta adresinizi kaydetmez veya bir sunucuya göndermez. Hesap açmanız ya da ödeme bilgisi girmeniz gerekmez. Yazı tipleri bu sitenin kendi dosyalarından yüklenir.' },
    { id:'iletisim', question:'Bu tasarım başka bir mağazaya uyarlanabilir mi?', answer:'Evet. Marka, ürün kataloğu, fotoğraflar ve metinler farklı bir işletme için düzenlenebilir. Gerçek satışa geçmek için ayrıca ödeme, sipariş yönetimi ve işletmeye ait iletişim bilgileri bağlanmalıdır.' },
];
export default function FAQ() {
    const { hash } = useLocation();
    const [expanded, setExpanded] = useState({hash, id: hash.slice(1) || 'magaza'});
    const activeId = expanded.hash === hash ? expanded.id : (hash.slice(1) || 'magaza');
    return <div className="faq-page">
        <PageHeader title="Aklındaki sorular." subtitle="Koleksiyon, sepet ve örnek mağaza deneyimi hakkında."/>
        <section className="faq-section"><div className="container"><div className="faq-list">
            {faqs.map((faq,index) => <div key={faq.id} id={faq.id} className={`faq-item ${activeId === faq.id ? 'open' : ''}`}><h2><button className="faq-question" id={`question-${faq.id}`} aria-expanded={activeId === faq.id} aria-controls={`answer-${faq.id}`} onClick={() => setExpanded({hash, id: activeId === faq.id ? '' : faq.id})}><span className="faq-index">{String(index+1).padStart(2,'0')}</span><span>{faq.question}</span><span className="faq-icon" aria-hidden="true">{activeId === faq.id ? '−' : '+'}</span></button></h2><div className="faq-answer" id={`answer-${faq.id}`} role="region" aria-labelledby={`question-${faq.id}`} hidden={activeId !== faq.id}><p>{faq.answer}</p></div></div>)}
        </div><div className="faq-contact"><span className="eyebrow">DAHA YAKINDAN TANIYIN</span><h3>Sadelikle tasarlandı.</h3><p>FadexShop’un yaklaşımını ve koleksiyonunu keşfedin.</p><Link to="/about" className="btn btn-primary">Bizi Tanıyın</Link></div></div></section>
    </div>;
}
