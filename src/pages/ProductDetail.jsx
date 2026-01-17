import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ImageZoom from '../components/ImageZoom';
import './ProductDetail.css';

function ProductDetail({ onAddToCart }) {
    const { id } = useParams();
    const { products, loading } = useProducts();
    const product = products.find(p => p.id === parseInt(id));

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('features');
    const [mainImage, setMainImage] = useState(0);

    // Ürün yüklendiğinde varsayılan rengi ayarla
    useEffect(() => {
        if (product?.colors?.[0]) {
            setSelectedColor(product.colors[0]);
        }
    }, [product]);

    if (loading) {
        return (
            <div className="product-detail-page">
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '60vh'
                }}>
                    <p style={{ color: 'var(--text-secondary)' }}>Ürün yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-not-found">
                <div className="container">
                    <h1>Ürün Bulunamadı</h1>
                    <p>Aradığınız ürün mevcut değil.</p>
                    <Link to="/" className="btn btn-primary">Ana Sayfaya Dön</Link>
                </div>
            </div>
        );
    }

    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Lütfen bir beden seçin');
            return;
        }
        onAddToCart({
            ...product,
            selectedColor,
            selectedSize,
            quantity
        });
    };

    return (
        <div className="product-detail-page">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/">Ana Sayfa</Link>
                    <span>/</span>
                    <Link to="/categories">{product.category}</Link>
                    <span>/</span>
                    <span>{product.name}</span>
                </nav>

                <div className="product-detail-grid">
                    {/* Left - Images */}
                    <div className="product-images">
                        <div className="main-image-container">
                            <ImageZoom
                                src={(selectedColor?.images || product.images)[mainImage] || product.images[0]}
                                alt={product.name}
                            />
                            {discount > 0 && (
                                <span className="discount-tag">-{discount}%</span>
                            )}
                        </div>
                        <div className="thumbnail-list">
                            {(selectedColor?.images || product.images).map((img, index) => (
                                <button
                                    key={index}
                                    className={`thumbnail ${mainImage === index ? 'active' : ''}`}
                                    onClick={() => setMainImage(index)}
                                >
                                    <img src={img} alt={`${product.name} görsel ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right - Product Info */}
                    <div className="product-info-detail">
                        <span className="product-category-tag">{product.subcategory}</span>
                        <h1 className="product-title">{product.name}</h1>

                        <div className="product-rating-detail">
                            <span className="stars">{"⭐".repeat(Math.floor(product.rating))}</span>
                            <span className="rating-value">{product.rating}</span>
                            <span className="review-count">({product.reviewCount} değerlendirme)</span>
                        </div>

                        <p className="product-short-desc">{product.longDescription}</p>

                        <div className="product-price-detail">
                            <span className="current-price">{product.price.toLocaleString('tr-TR')} ₺</span>
                            {product.originalPrice > product.price && (
                                <span className="original-price">{product.originalPrice.toLocaleString('tr-TR')} ₺</span>
                            )}
                        </div>

                        {/* Color Selection */}
                        <div className="option-section">
                            <h4>Renk: <span>{selectedColor?.name}</span></h4>
                            <div className="color-options">
                                {product.colors.map((color, index) => (
                                    <button
                                        key={index}
                                        className={`color-btn ${selectedColor?.name === color.name ? 'active' : ''}`}
                                        style={{ backgroundColor: color.code }}
                                        onClick={() => {
                                            setSelectedColor(color);
                                            setMainImage(0); // Renk değiştiğinde ilk resme dön
                                        }}
                                        title={color.name}
                                    >
                                        {selectedColor?.name === color.name && <span className="check">✓</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="option-section">
                            <h4>Beden: <span>{selectedSize || 'Seçiniz'}</span></h4>
                            <div className="size-options">
                                {product.sizes.map((size, index) => (
                                    <button
                                        key={index}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="add-to-cart-section">
                            <div className="quantity-selector">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                            <button className="btn btn-primary add-cart-btn" onClick={handleAddToCart}>
                                Sepete Ekle
                            </button>
                        </div>

                        {/* Stock Info */}
                        <div className="stock-info">
                            {product.inStock ? (
                                <span className="in-stock">✓ Stokta ({product.stockCount} adet)</span>
                            ) : (
                                <span className="out-of-stock">✕ Stokta Yok</span>
                            )}
                        </div>

                        {/* Shipping Info */}
                        <div className="shipping-info">
                            <div className="info-item">
                                <span className="icon">🚚</span>
                                <span>Ücretsiz Kargo (500₺ üzeri)</span>
                            </div>
                            <div className="info-item">
                                <span className="icon">↩️</span>
                                <span>15 Gün İade Hakkı</span>
                            </div>
                            <div className="info-item">
                                <span className="icon">🛡️</span>
                                <span>Orijinal Ürün Garantisi</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="product-tabs">
                    <div className="tabs-header">
                        <button
                            className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                            onClick={() => setActiveTab('features')}
                        >
                            Ürün Özellikleri
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Yorumlar ({product.reviewCount})
                        </button>
                    </div>

                    <div className="tabs-content">
                        {activeTab === 'features' && (
                            <div className="features-tab">
                                <table className="features-table">
                                    <tbody>
                                        {product.features.map((feature, index) => (
                                            <tr key={index}>
                                                <td className="feature-label">{feature.label}</td>
                                                <td className="feature-value">{feature.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="reviews-tab">
                                <div className="reviews-summary">
                                    <div className="rating-big">
                                        <span className="rating-number">{product.rating}</span>
                                        <span className="rating-stars">{"⭐".repeat(Math.floor(product.rating))}</span>
                                        <span className="rating-count">{product.reviewCount} değerlendirme</span>
                                    </div>
                                </div>

                                <div className="reviews-list">
                                    {product.reviews.map((review) => (
                                        <div key={review.id} className="review-card">
                                            <div className="review-header">
                                                <img
                                                    src={review.avatar}
                                                    alt={review.user}
                                                    className="review-avatar-img"
                                                />
                                                <div className="review-meta">
                                                    <span className="review-user">{review.user}</span>
                                                    <span className="review-date">{review.date}</span>
                                                </div>
                                                <div className="review-rating">
                                                    {"⭐".repeat(review.rating)}
                                                </div>
                                            </div>
                                            <p className="review-comment">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
