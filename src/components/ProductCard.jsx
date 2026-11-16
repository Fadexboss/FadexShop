import { Link } from 'react-router-dom';
import Icon from './Icon';
import './ProductCard.css';
export default function ProductCard({ product, onAddToCart }) {
    const discount = product.originalPrice > product.price ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    return <article className="product-card">
        <Link to={`/product/${product.id}`} className="product-image" aria-label={`${product.name}, ürünü incele`}>
            <img src={product.images[0]} alt={product.name} className="product-img" loading="lazy" decoding="async" width="640" height="800"/>
            {discount > 0 && <span className="discount-badge">%{discount}</span>}
            <span className="product-view">Ürünü incele <Icon name="arrow" size={15}/></span>
        </Link>
        <div className="product-info">
            <div className="product-meta"><span className="product-category">{product.subcategory || product.category}</span><span className="product-swatches" aria-label={`${product.colors.length} renk`}>{product.colors.map(color => <span key={color.name} title={color.name} style={{background: color.code}}/>)}</span></div>
            <Link to={`/product/${product.id}`}><h3 className="product-name">{product.name}</h3></Link>
            <p className="product-description">{product.description}</p>
            <div className="product-footer">
                <div className="product-price"><span className="current-price">{product.price.toLocaleString('tr-TR')} TL</span>{discount > 0 && <span className="original-price">{product.originalPrice.toLocaleString('tr-TR')} TL</span>}</div>
                <button className="add-to-cart-btn" onClick={() => onAddToCart(product)} aria-label={`${product.name} sepete ekle`} disabled={!product.inStock}><Icon name="plus" size={19}/></button>
            </div>
        </div>
    </article>;
}
