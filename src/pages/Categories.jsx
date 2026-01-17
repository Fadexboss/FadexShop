import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import PageHeader from '../components/PageHeader';
import { useProducts } from '../context/ProductContext';
import './Categories.css';

function Categories({ products, onAddToCart }) {
    const { categories: allCategories, subcategories } = useProducts();

    const [selectedCategory, setSelectedCategory] = useState('Tümü');
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [sortBy, setSortBy] = useState('featured');

    // Beden sıralama ağırlıkları
    const sizeWeights = {
        'XXS': 1, 'XS': 2, 'S': 3, 'M': 4, 'L': 5, 'XL': 6, 'XXL': 7, '3XL': 8,
        'Tek Beden': 100
    };

    const sortSizes = (sizes) => {
        return [...sizes].sort((a, b) => {
            // İkisi de sayı ise (örn: 40, 41)
            if (!isNaN(a) && !isNaN(b)) return parseInt(a) - parseInt(b);

            // Biri sayı diğeri metin ise (örn: 40 vs L)
            if (!isNaN(a)) return 1;
            if (!isNaN(b)) return -1;

            // İkisi de metin ise (örn: S, M)
            const weightA = sizeWeights[a] || 50;
            const weightB = sizeWeights[b] || 50;

            if (weightA !== weightB) return weightA - weightB;

            return a.localeCompare(b);
        });
    };

    // Dinamik filtre seçeneklerini çıkar (Seçilen kategoriye göre)
    const { dynamicSizes, dynamicColors } = useMemo(() => {
        let pool = products;
        if (selectedCategory !== 'Tümü') {
            pool = products.filter(p => p.category === selectedCategory);
        }

        const sizes = new Set();
        const colorsMap = new Map(); // name -> code haritası

        pool.forEach(p => {
            p.sizes?.forEach(s => sizes.add(s));
            p.colors?.forEach(c => {
                if (!colorsMap.has(c.name)) {
                    colorsMap.set(c.name, c.code);
                }
            });
        });

        return {
            dynamicSizes: sortSizes(Array.from(sizes)),
            dynamicColors: Array.from(colorsMap.entries()).map(([name, code]) => ({ name, code }))
        };
    }, [products, selectedCategory]);

    const toggleSize = (size) => {
        setSelectedSizes(prev =>
            prev.includes(size)
                ? prev.filter(s => s !== size)
                : [...prev, size]
        );
    };

    const toggleColor = (colorName) => {
        setSelectedColors(prev =>
            prev.includes(colorName)
                ? prev.filter(c => c !== colorName)
                : [...prev, colorName]
        );
    };

    const clearFilters = () => {
        setSelectedCategory('Tümü');
        setSelectedSubcategory(null);
        setSelectedSizes([]);
        setSelectedColors([]);
        setPriceRange([0, 10000]);
    };

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Kategori filtresi
        if (selectedCategory !== 'Tümü') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Alt kategori filtresi
        if (selectedSubcategory) {
            result = result.filter(p => p.subcategory === selectedSubcategory);
        }

        // Beden filtresi
        if (selectedSizes.length > 0) {
            result = result.filter(p =>
                p.sizes.some(size => selectedSizes.includes(size))
            );
        }

        // Renk filtresi
        if (selectedColors.length > 0) {
            result = result.filter(p =>
                p.colors.some(color => selectedColors.includes(color.name))
            );
        }

        // Fiyat filtresi
        result = result.filter(p =>
            p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        // Sıralama
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                result.sort((a, b) => b.id - a.id);
                break;
            default:
                break;
        }

        return result;
    }, [products, selectedCategory, selectedSubcategory, selectedSizes, selectedColors, priceRange, sortBy]);

    const activeFiltersCount = [
        selectedCategory !== 'Tümü',
        selectedSubcategory !== null,
        selectedSizes.length > 0,
        selectedColors.length > 0,
        priceRange[0] > 0 || priceRange[1] < 10000
    ].filter(Boolean).length;

    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    return (
        <div className="categories-page">
            <PageHeader
                title="Ürünler"
                subtitle="En yeni ve premium koleksiyonlarımızı keşfedin"
                backgroundImage="/Backgrounds/ürünler.jpg"
            />
            <div className="container">
                <div className="categories-layout">
                    {/* Filters Toggle for Mobile */}
                    <button
                        className="filter-toggle-btn"
                        onClick={() => setIsFiltersOpen(true)}
                    >
                        <span>🔍</span> Filtrele
                        {activeFiltersCount > 0 && <span className="active-count">{activeFiltersCount}</span>}
                    </button>

                    {/* Filters Sidebar */}
                    <aside className={`filters-sidebar ${isFiltersOpen ? 'open' : ''}`}>
                        <div className="filters-header">
                            <h3>Filtreler</h3>
                            <div className="filters-actions">
                                {activeFiltersCount > 0 && (
                                    <button className="clear-filters" onClick={clearFilters}>
                                        Temizle
                                    </button>
                                )}
                                <button className="close-filters" onClick={() => setIsFiltersOpen(false)}>✕</button>
                            </div>
                        </div>


                        {/* Kategori */}
                        <div className="filter-section">
                            <h4>Kategori</h4>
                            <div className="filter-options">
                                {allCategories.map(cat => (
                                    <button
                                        key={cat}
                                        className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedCategory(cat);
                                            setSelectedSubcategory(null);
                                            setSelectedSizes([]);
                                            setSelectedColors([]);
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Alt Kategori */}
                        {selectedCategory !== 'Tümü' && subcategories[selectedCategory] && (
                            <div className="filter-section">
                                <h4>Alt Kategori</h4>
                                <div className="filter-options">
                                    {subcategories[selectedCategory].map(sub => (
                                        <button
                                            key={sub}
                                            className={`filter-btn ${selectedSubcategory === sub ? 'active' : ''}`}
                                            onClick={() => setSelectedSubcategory(
                                                selectedSubcategory === sub ? null : sub
                                            )}
                                        >
                                            {sub}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Beden */}
                        {dynamicSizes.length > 0 && (
                            <div className="filter-section">
                                <h4>Beden</h4>
                                <div className="size-filters">
                                    {dynamicSizes.map(size => (
                                        <button
                                            key={size}
                                            className={`size-filter-btn ${selectedSizes.includes(size) ? 'active' : ''}`}
                                            onClick={() => toggleSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Renk */}
                        {dynamicColors.length > 0 && (
                            <div className="filter-section">
                                <h4>Renk</h4>
                                <div className="color-filters">
                                    {dynamicColors.map(color => (
                                        <button
                                            key={color.name}
                                            className={`color-filter-btn ${selectedColors.includes(color.name) ? 'active' : ''}`}
                                            style={{ backgroundColor: color.code }}
                                            onClick={() => toggleColor(color.name)}
                                            title={color.name}
                                        >
                                            {selectedColors.includes(color.name) && <span>✓</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Fiyat */}
                        <div className="filter-section">
                            <h4>Fiyat Aralığı</h4>
                            <div className="price-range-inputs">
                                <div className="price-input-group">
                                    <label>Min (₺)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                                    />
                                </div>
                                <div className="price-input-group">
                                    <label>Max (₺)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="10000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="products-content">
                        <div className="products-toolbar">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="sort-select"
                            >
                                <option value="featured">Öne Çıkanlar</option>
                                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                                <option value="rating">En Yüksek Puan</option>
                                <option value="newest">En Yeniler</option>
                            </select>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="products-grid categories-grid">
                                {filteredProducts.map((product, index) => (
                                    <div
                                        key={product.id}
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <ProductCard
                                            product={product}
                                            onAddToCart={onAddToCart}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-products">
                                <p>Seçilen kriterlere uygun ürün bulunamadı.</p>
                                <button className="btn btn-primary" onClick={clearFilters}>
                                    Filtreleri Temizle
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categories;
