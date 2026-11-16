import './WhatsAppButton.css';

export default function WhatsAppButton() {
    const number = (import.meta.env.VITE_WHATSAPP_NUMBER || '905551232345').replace(/\D/g, '');
    const message = encodeURIComponent('Merhaba, bir ürün hakkında bilgi almak istiyorum.');
    return (
        <a href={`https://wa.me/${number}?text=${message}`} className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ile iletişime geç">
            <span className="whatsapp-pulse" aria-hidden="true"/>
            <img src="/Company_images/Whatsapp.svg" alt="" width="43" height="43"/>
            <span className="whatsapp-label" aria-hidden="true">WhatsApp ile iletişim</span>
        </a>
    );
}
