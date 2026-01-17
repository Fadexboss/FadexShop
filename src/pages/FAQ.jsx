import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import './FAQ.css';

function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'Kargo ne kadar sürede gelir?',
            answer: 'Siparişleriniz aynı gün kargoya verilir. İstanbul içi 1-2 iş günü, diğer iller için 2-4 iş günü içinde teslim edilir.'
        },
        {
            question: 'İade ve değişim politikanız nedir?',
            answer: '15 gün içinde koşulsuz iade hakkınız bulunmaktadır. Ürün orijinal ambalajında ve kullanılmamış olmalıdır. İade kargo ücreti bizden.'
        },
        {
            question: 'Ödeme seçenekleri nelerdir?',
            answer: 'Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçenekleri mevcuttur. Kredi kartına 12 aya kadar taksit imkanı sunuyoruz.'
        },
        {
            question: 'Ürünler orijinal mi?',
            answer: 'Tüm ürünlerimiz %100 orijinaldir ve resmi distribütörlerden temin edilmektedir. Orijinallik garantisi veriyoruz.'
        },
        {
            question: 'Kargo ücreti var mı?',
            answer: '500₺ ve üzeri alışverişlerde kargo ücretsizdir. Altındaki siparişler için 29.90₺ kargo ücreti uygulanır.'
        },
        {
            question: 'Siparişimi nasıl takip edebilirim?',
            answer: 'Sipariş onaylandıktan sonra e-posta ile kargo takip numarası gönderilir. Hesabım sayfasından da takip edebilirsiniz.'
        },
        {
            question: 'Hediye paketi seçeneği var mı?',
            answer: 'Evet, sipariş sırasında hediye paketi seçeneğini işaretleyebilirsiniz. Bu hizmet ücretsizdir.'
        },
        {
            question: 'Müşteri hizmetlerine nasıl ulaşabilirim?',
            answer: 'Sağ alt köşedeki canlı destek butonundan, info@luxeshop.com adresinden veya 0850 XXX XX XX numarasından bize ulaşabilirsiniz.'
        }
    ];

    return (
        <div className="faq-page">
            <PageHeader
                title="Sıkça Sorulan Sorular"
                subtitle="Merak ettiğiniz tüm soruların cevapları"
                backgroundImage="/Backgrounds/sss.jpg"
            />

            <section className="faq-section">
                <div className="container">
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${openIndex === index ? 'open' : ''}`}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                >
                                    <span>{faq.question}</span>
                                    <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                                </button>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="faq-contact">
                        <h3>Sorunuz hala cevapsız mı?</h3>
                        <p>Müşteri hizmetlerimizle iletişime geçin</p>
                        <a href="mailto:info@luxeshop.com" className="btn btn-primary">
                            Bize Ulaşın
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default FAQ;
