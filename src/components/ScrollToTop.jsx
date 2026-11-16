import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export default function ScrollToTop() {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        const titles = {'/':'Her gün için. Kendin gibi.', '/categories':'Koleksiyon', '/about':'Hakkımızda', '/faq':'Sıkça Sorulanlar', '/cart':'Sepetim'};
        document.title = (titles[pathname] || (pathname.startsWith('/product/') ? 'Ürün Detayı' : 'Sayfa bulunamadı')) + ' — FadexShop';
        if (hash) {
            const frame = requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({block:'start'}));
            return () => cancelAnimationFrame(frame);
        }
        window.scrollTo({top:0,left:0,behavior:'instant'});
    },[pathname,hash]);
    return null;
}
