import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import './Cart.css';

function Cart({ cart, setCart }) {
    const updateQuantity = (itemIndex, change) => {
        setCart(prevCart =>
            prevCart.map((item, index) =>
                index === itemIndex
                    ? { ...item, quantity: Math.max(0, item.quantity + change) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const removeItem = (itemIndex) => {
        setCart(prevCart => prevCart.filter((_, index) => index !== itemIndex));
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 500 ? 0 : 29.90;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <PageHeader
                    title="Sepetim"
                    subtitle="Alışveriş sepetiniz"
                    backgroundImage="/Backgrounds/sepetim.jpg"
                />

                <section className="cart-empty">
                    <div className="container">
                        <div className="empty-state">
                            <span className="empty-icon">🛒</span>
                            <h2>Sepetiniz Boş</h2>
                            <p>Henüz sepetinize ürün eklemediniz</p>
                            <Link to="/" className="btn btn-primary">
                                Alışverişe Başla
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <PageHeader
                title="Sepetim"
                subtitle={`${cart.reduce((sum, item) => sum + item.quantity, 0)} ürün`}
                backgroundImage="/Backgrounds/sepetim.jpg"
            />

            <section className="cart-section">
                <div className="container">
                    <div className="cart-layout">
                        <div className="cart-items">
                            {cart.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <Link to={`/product/${item.id}`} className="item-image">
                                        <img
                                            src={item.images ? item.images[0] : item.image}
                                            alt={item.name}
                                            className="cart-item-img"
                                        />
                                    </Link>
                                    <div className="item-details">
                                        <Link to={`/product/${item.id}`}>
                                            <h3>{item.name}</h3>
                                        </Link>
                                        <p className="item-category">{item.subcategory || item.category}</p>
                                        <div className="item-options">
                                            {item.selectedColor && (
                                                <span className="option-tag">
                                                    <span
                                                        className="color-dot"
                                                        style={{ backgroundColor: item.selectedColor.code }}
                                                    ></span>
                                                    {item.selectedColor.name}
                                                </span>
                                            )}
                                            {item.selectedSize && (
                                                <span className="option-tag">Beden: {item.selectedSize}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="item-quantity">
                                        <button onClick={() => updateQuantity(index, -1)}>−</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(index, 1)}>+</button>
                                    </div>
                                    <div className="item-price">
                                        {(item.price * item.quantity).toLocaleString('tr-TR')} ₺
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItem(index)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h3>Sipariş Özeti</h3>
                            <div className="summary-row">
                                <span>Ara Toplam</span>
                                <span>{subtotal.toLocaleString('tr-TR')} ₺</span>
                            </div>
                            <div className="summary-row">
                                <span>Kargo</span>
                                <span className={shipping === 0 ? 'free' : ''}>
                                    {shipping === 0 ? 'Ücretsiz' : `${shipping.toFixed(2)} ₺`}
                                </span>
                            </div>
                            {shipping > 0 && (
                                <p className="shipping-note">
                                    500₺ üzeri alışverişlerde kargo ücretsiz!
                                </p>
                            )}
                            <div className="summary-total">
                                <span>Toplam</span>
                                <span>{total.toLocaleString('tr-TR')} ₺</span>
                            </div>
                            <button className="btn btn-primary checkout-btn">
                                Ödemeye Geç
                            </button>
                            <Link to="/categories" className="continue-shopping">
                                ← Alışverişe Devam Et
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Cart;
