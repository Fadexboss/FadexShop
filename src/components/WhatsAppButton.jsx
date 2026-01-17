import React from 'react';
import './WhatsAppButton.css';
import whatsappIcon from '../../public/Company_images/Whatsapp.svg';

const WhatsAppButton = () => {
    const phoneNumber = "905551232345";
    const message = encodeURIComponent("Merhaba, bir ürün hakkında bilgi almak istiyorum.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile İletişime Geç"
        >
            <div className="whatsapp-icon-wrapper">
                <img
                    src={whatsappIcon}
                    alt="WhatsApp"
                    className="whatsapp-svg"
                />
            </div>
            <div className="pulse-ring"></div>
        </a>
    );
};

export default WhatsAppButton;
