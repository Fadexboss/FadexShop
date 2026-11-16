import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ImageZoom from '../components/ImageZoom';
import Icon from '../components/Icon';
import './ProductDetail.css';

function ProductView({ product, onAddToCart }) {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('features');
    const [sizeError, setSizeError] = useState(false);
    const mainImage = selectedColor?.images[0] || product.images[0];
    const discount = product.originalPrice > product.price ? Math.round((1-product.price/product.originalPrice)*100) : 0;
    const addToCart = () => {
        if (!selectedSize) { setSizeError(true); document.getElementById('product-size')?.focus(); return; }
        onAddToCart({ ...product, selectedColor, selectedSize, quantity });
    };
    return <div className="product-detail-page"><div className="container">
        <nav className="breadcrumb" aria-label="Sayfa yolu"><Link to="/">Ana Sayfa</Link><span>/</span><Link to="/categories">{product.category}</Link><span>/</span><span>{product.name}</span></nav>
        <div className="product-detail-grid">
            <div className="product-images"><div className="main-image-container"><ImageZoom src={mainImage} alt={`${product.name}, ${selectedColor.name}`}/>{discount > 0 && <span className="discount-tag">%{discount} indirim</span>}</div>
                <div className="thumbnail-list" aria-label="Ürün görselleri">{product.colors.map(color => <button key={color.name} className={`thumbnail ${selectedColor.name === color.name ? 'active' : ''}`} onClick={() => setSelectedColor(color)} aria-label={`${color.name} rengini göster`} aria-pressed={selectedColor.name === color.name}><img src={color.images[0]} alt={color.name} width="80" height="100"/></button>)}</div>
            </div>
            <div className="product-info-detail">
                <span className="product-category-tag">{product.subcategory} / THE EVERYDAY EDIT</span><h1 className="product-title">{product.name}</h1>
                <p className="product-reference">FADEX ESSENTIALS · FS-{String(product.id).padStart(4,'0')}</p>
                <p className="product-short-desc">{product.longDescription}</p>
                <div className="product-price-detail"><span className="current-price">{product.price.toLocaleString('tr-TR')} TL</span>{discount > 0 && <span className="original-price">{product.originalPrice.toLocaleString('tr-TR')} TL</span>}</div>
                <fieldset className="option-section"><legend>Renk: <span>{selectedColor.name}</span></legend><div className="color-options">{product.colors.map(color => <button key={color.name} className={`color-btn ${selectedColor.name === color.name ? 'active' : ''}`} style={{backgroundColor:color.code}} onClick={() => setSelectedColor(color)} title={color.name} aria-label={color.name} aria-pressed={selectedColor.name === color.name}>{selectedColor.name === color.name && <span className="check">✓</span>}</button>)}</div></fieldset>
                <fieldset className="option-section" id="product-size" tabIndex="-1" aria-describedby={sizeError ? 'size-error' : undefined}><legend>Beden: <span>{selectedSize || 'Seçiniz'}</span></legend><div className="size-options">{product.sizes.map(size => <button key={size} className={`size-btn ${selectedSize === size ? 'active' : ''}`} onClick={() => { setSelectedSize(size); setSizeError(false); }} aria-pressed={selectedSize === size}>{size}</button>)}</div>{sizeError && <p className="size-error" role="alert" id="size-error">Sepete eklemek için bir beden seçin.</p>}</fieldset>
                <div className="add-to-cart-section"><div className="quantity-selector" aria-label="Ürün adedi"><button onClick={() => setQuantity(Math.max(1,quantity-1))} aria-label="Adedi azalt" disabled={quantity === 1}>−</button><span aria-live="polite">{quantity}</span><button onClick={() => setQuantity(Math.min(product.stockCount,99,quantity+1))} aria-label="Adedi artır" disabled={quantity >= Math.min(product.stockCount,99)}>+</button></div><button className="btn btn-primary add-cart-btn" onClick={addToCart} disabled={!product.inStock}><Icon name="bag" size={18}/>Sepete Ekle</button></div>
                <div className="stock-info"><span className={product.inStock ? 'in-stock' : 'out-of-stock'}>{product.inStock ? 'Koleksiyonda mevcut' : 'Şu anda mevcut değil'}</span></div>
                <div className="shipping-info"><div className="info-item"><Icon name="truck" size={19}/><span>500 TL ve üzeri sepette ücretsiz kargo</span></div><div className="info-item"><Icon name="return" size={19}/><span>Örnek alışveriş deneyimi</span></div><div className="info-item"><Icon name="shield" size={19}/><span>Bu sitede gerçek ödeme alınmaz</span></div></div>
            </div>
        </div>
        <div className="product-tabs">
            <div className="tabs-header" role="tablist" aria-label="Ürün bilgileri">{[['features','Ürün Özellikleri'],['shipping','Teslimat ve İade']].map(([id,label]) => <button role="tab" id={`tab-${id}`} aria-controls={`panel-${id}`} aria-selected={activeTab === id} tabIndex={activeTab === id ? 0 : -1} key={id} className={`tab-btn ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)} onKeyDown={event => { if (['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 'features' : event.key === 'End' ? 'shipping' : activeTab === 'features' ? 'shipping' : 'features'; setActiveTab(next); document.getElementById(`tab-${next}`)?.focus(); } }}>{label}</button>)}</div>
            <div className="tabs-content" role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`} tabIndex="0">{activeTab === 'features' ? <table className="features-table"><tbody>{product.features.map(feature => <tr key={feature.label}><th scope="row" className="feature-label">{feature.label}</th><td className="feature-value">{feature.value}</td></tr>)}</tbody></table> : <div className="shipping-tab"><h3>Alışveriş akışını keşfedin.</h3><p>Bu örnek mağazada gerçek satış, teslimat veya iade işlemi yapılmaz. Sepetinizdeki kargo tutarı, alışveriş deneyimini göstermek için hesaplanır.</p><Link to="/faq#teslimat">Kargo ve alışveriş hakkında <Icon name="arrow" size={16}/></Link></div>}</div>
        </div>
    </div></div>;
}
export default function ProductDetail({ onAddToCart }) {
    const { id } = useParams();
    const { getProductById } = useProducts();
    const product = getProductById(id);
    return product ? <ProductView key={product.id} product={product} onAddToCart={onAddToCart}/> : <div className="app-state"><h1>Bu ürün bulunamadı.</h1><p>Koleksiyondaki diğer parçalara göz atabilirsiniz.</p><Link to="/categories" className="btn btn-primary">Koleksiyona dön</Link></div>;
}
