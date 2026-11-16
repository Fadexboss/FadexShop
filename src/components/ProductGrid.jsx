import { useState } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext';
import './ProductGrid.css';
export default function ProductGrid({ products, onAddToCart }) {
    const { categories } = useProducts();
    const [activeCategory, setActiveCategory] = useState('Tümü');
    const filteredProducts = activeCategory === 'Tümü' ? products : products.filter(p => p.category === activeCategory);
    return <section id="products" className="products-section">
        <div className="container">
            <span className="eyebrow products-eyebrow">GARDIROBUNA İYİ GELİR</span>
            <h2 className="section-title">Günün favorileri</h2>
            <p className="section-subtitle">Birbiriyle uyumlu. Her anına eşlik eden.</p>
            <div id="categories" className="category-filter" aria-label="Ürün kategorileri">
                {categories.map(category => <button key={category} className={`category-btn ${activeCategory === category ? 'active' : ''}`} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
            </div>
            <div className="products-grid">{filteredProducts.map(product => <ProductCard key={product.id} product={product} onAddToCart={onAddToCart}/>)}</div>
        </div>
    </section>;
}
