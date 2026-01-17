import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onAddToCart(product);
    };

    const mainImage = product.images ? product.images[0] : product.image;

    return (
        <Link to={`/product/${product.id}`} className="product-card">
            <div className="product-image">
                <img
                    src={mainImage}
                    alt={product.name}
                    className="product-img"
                    loading="lazy"
                />
                {discount > 0 && (
                    <span className="discount-badge">-{discount}%</span>
                )}
            </div>

            <div className="product-info">
                <span className="product-category">{product.subcategory || product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-rating">
                    <span className="stars">{"⭐".repeat(Math.floor(product.rating))}</span>
                    <span className="rating-text">{product.rating} ({product.reviewCount || product.reviews})</span>
                </div>

                <div className="product-footer">
                    <div className="product-price">
                        <span className="current-price">{product.price.toLocaleString('tr-TR')} ₺</span>
                        {product.originalPrice > product.price && (
                            <span className="original-price">{product.originalPrice.toLocaleString('tr-TR')} ₺</span>
                        )}
                    </div>
                    <button
                        className="add-to-cart-btn"
                        onClick={handleAddToCart}
                    >
                        <span>+</span>
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
