import { useState } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext';
import './ProductGrid.css';

function ProductGrid({ products, onAddToCart }) {
    const { categories } = useProducts();
    const [activeCategory, setActiveCategory] = useState('Tümü');

    const filteredProducts = activeCategory === 'Tümü'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <section id="products" className="products-section">
            <div className="container">
                <h2 className="section-title">Popüler Ürünler</h2>

                <div id="categories" className="category-filter">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="products-grid">
                    {filteredProducts.map((product, index) => (
                        <div
                            key={product.id}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <ProductCard
                                product={product}
                                onAddToCart={onAddToCart}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductGrid;
