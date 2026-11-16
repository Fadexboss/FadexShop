import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Icon from '../components/Icon';
import './Cart.css';
const money = value => value.toLocaleString('tr-TR', {minimumFractionDigits:2, maximumFractionDigits:2}) + ' TL';
export default function Cart({ cart, setCart }) {
    const [checkoutNote, setCheckoutNote] = useState(false);
    const updateQuantity = (itemIndex, change) => {
        setCheckoutNote(false);
        setCart(previous => previous.map((item,index) => index === itemIndex ? {...item, quantity: Math.min(item.stockCount || 99,99,Math.max(0,item.quantity+change))} : item).filter(item => item.quantity > 0));
    };
    const removeItem = index => { setCheckoutNote(false); setCart(previous => previous.filter((_,itemIndex) => itemIndex !== index)); };
    const subtotal = cart.reduce((sum,item) => sum + item.price * item.quantity,0);
    const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 29.9;
    return <div className="cart-page">
        <PageHeader title="Sepetim" subtitle={cart.length ? `${cart.reduce((sum,item)=>sum+item.quantity,0)} parça, senin seçimin.` : 'Yeni favorilerin için biraz yer var.'}/>
        {cart.length === 0 ? <section className="cart-empty"><div className="container empty-state"><Icon name="bag" size={49}/><h2>Henüz tanışmadınız.</h2><p>Günün favorilerini keşfet, sana iyi gelen parçaları sepetine ekle.</p><Link to="/categories" className="btn btn-primary">Koleksiyonu Keşfet <Icon name="arrow" size={17}/></Link></div></section> : <section className="cart-section"><div className="container cart-layout">
            <div className="cart-items">{cart.map((item,index) => <article key={`${item.id}-${item.selectedSize}-${item.selectedColor?.name}`} className="cart-item">
                <Link to={`/product/${item.id}`} className="item-image"><img src={item.selectedColor?.images?.[0] || item.images[0]} alt={item.name} width="100" height="125" className="cart-item-img"/></Link>
                <div className="item-details"><Link to={`/product/${item.id}`}><h3>{item.name}</h3></Link><p className="item-category">{item.subcategory || item.category}</p><div className="item-options">{item.selectedColor && <span className="option-tag"><span className="color-dot" style={{backgroundColor:item.selectedColor.code}}/>{item.selectedColor.name}</span>}{item.selectedSize && <span className="option-tag">Beden: {item.selectedSize}</span>}</div></div>
                <div className="item-quantity"><button onClick={() => updateQuantity(index,-1)} aria-label={`${item.name} adedini azalt`}>−</button><span aria-live="polite">{item.quantity}</span><button onClick={() => updateQuantity(index,1)} disabled={item.quantity >= Math.min(item.stockCount || 99,99)} aria-label={`${item.name} adedini artır`}>+</button></div>
                <div className="item-price">{money(item.price*item.quantity)}</div><button className="remove-btn" onClick={() => removeItem(index)} aria-label={`${item.name} sepetten kaldır`}><Icon name="close" size={17}/></button>
            </article>)}</div>
            <aside className="cart-summary" aria-label="Sipariş özeti"><h2>Sipariş özeti</h2><div className="summary-row"><span>Ara toplam</span><span>{money(subtotal)}</span></div><div className="summary-row"><span>Kargo</span><span className={shipping===0 ? 'free' : ''}>{shipping===0 ? 'Ücretsiz' : money(shipping)}</span></div>{shipping>0 && <p className="shipping-note">Ücretsiz kargo için {money(500-subtotal)} daha.</p>}<div className="summary-total"><span>Toplam</span><span>{money(subtotal+shipping)}</span></div><button className="btn btn-primary checkout-btn" onClick={() => setCheckoutNote(true)}>Ödemeye Geç <Icon name="arrow" size={17}/></button>{checkoutNote && <p className="checkout-note" role="status">Bu bir örnek mağazadır. Gerçek ödeme ve sipariş alınmaz. Sepetinizi ve ürün seçeneklerini deneyebilirsiniz.</p>}<p className="cart-demo-note">Örnek alışveriş deneyimi · Ödeme alınmaz</p><Link to="/categories" className="continue-shopping">Alışverişe devam et</Link></aside>
        </div></section>}
    </div>;
}
