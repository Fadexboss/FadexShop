import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import PageHeader from '../components/PageHeader';
import Icon from '../components/Icon';
import PriceInput from '../components/PriceInput';
import { useProducts } from '../context/ProductContext';
import './Categories.css';
const weights = {'XS':1,'S':2,'M':3,'L':4,'XL':5,'XXL':6,'Tek Beden':1000};
const sizeWeight = size => weights[size] || (size.endsWith('cm') ? 200 + parseInt(size) : parseInt(size)) || 500;
const sortSizes = sizes => [...sizes].sort((a,b) => sizeWeight(a)-sizeWeight(b));
export default function Categories({ products, onAddToCart }) {
    const { categories, subcategories } = useProducts();
    const [searchParams,setSearchParams] = useSearchParams();
    const selectedCategory = categories.includes(searchParams.get('category')) ? searchParams.get('category') : 'Tümü';
    const [subcategory,setSubcategory] = useState(null);
    const [sizes,setSizes] = useState([]);
    const [colors,setColors] = useState([]);
    const [priceRange,setPriceRange] = useState(['','']);
    const [sortBy,setSortBy] = useState('featured');
    const [isFiltersOpen,setIsFiltersOpen] = useState(false);
    const sidebar = useRef(null);
    const toggle = useRef(null);
    const pool = useMemo(() => selectedCategory === 'Tümü' ? products : products.filter(product=>product.category===selectedCategory),[products,selectedCategory]);
    const dynamicSizes = sortSizes(new Set(pool.flatMap(product=>product.sizes)));
    const dynamicColors = [...new Map(pool.flatMap(product=>product.colors).map(color=>[color.name,color])).values()];
    useEffect(() => {
        if (!isFiltersOpen) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const focusable = () => [...sidebar.current.querySelectorAll('button, input')].filter(element=>!element.disabled && element.getClientRects().length);
        focusable()[0]?.focus();
        const close = () => { setIsFiltersOpen(false); toggle.current?.focus(); };
        const onKey = event => {
            if(event.key === 'Escape') close();
            if(event.key === 'Tab') { const elements=focusable(); const first=elements[0]; const last=elements.at(-1); if(event.shiftKey && document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first?.focus();} }
        };
        const onResize = () => { if(window.innerWidth>968) close(); };
        document.addEventListener('keydown',onKey); window.addEventListener('resize',onResize);
        return () => {document.body.style.overflow=previous;document.removeEventListener('keydown',onKey);window.removeEventListener('resize',onResize);};
    },[isFiltersOpen]);
    const clearFilters = () => {setSearchParams({},{replace:true});setSubcategory(null);setSizes([]);setColors([]);setPriceRange(['','']);};
    const toggleValue = (value,setter) => setter(previous=>previous.includes(value)?previous.filter(item=>item!==value):[...previous,value]);
    const changeCategory = category => {setSearchParams(category==='Tümü'?{}:{category},{replace:true});setSubcategory(null);setSizes([]);setColors([]);};
    const filteredProducts = useMemo(() => {
        let result = pool.filter(product => (!subcategory || product.subcategory===subcategory) && (!sizes.length || product.sizes.some(size=>sizes.includes(size))) && (!colors.length || product.colors.some(color=>colors.includes(color.name))) && product.price >= (Number(priceRange[0])||0) && product.price <= (priceRange[1]===''?Infinity:Number(priceRange[1])));
        if(sortBy==='price-asc') result.sort((a,b)=>a.price-b.price);
        if(sortBy==='price-desc') result.sort((a,b)=>b.price-a.price);
        if(sortBy==='name') result.sort((a,b)=>a.name.localeCompare(b.name,'tr'));
        if(sortBy==='newest') result.sort((a,b)=>b.id-a.id);
        return result;
    },[pool,subcategory,sizes,colors,priceRange,sortBy]);
    const count = Number(selectedCategory!=='Tümü')+Number(!!subcategory)+sizes.length+colors.length+Number(priceRange.some(value=>value!==''));
    return <div className="categories-page"><PageHeader title="Koleksiyon" subtitle="İyi seçilmiş parçalar. Her gün için yeni bir başlangıç."/>
        <div className="container"><div className="categories-layout">
            <button ref={toggle} className="filter-toggle-btn" onClick={()=>setIsFiltersOpen(true)} aria-expanded={isFiltersOpen} aria-controls="catalog-filters"><Icon name="filter" size={17}/>Filtrele {count>0 && <span className="active-count">{count}</span>}</button>
            <aside id="catalog-filters" ref={sidebar} className={`filters-sidebar ${isFiltersOpen?'open':''}`} aria-label="Ürün filtreleri">
                <div className="filters-header"><h2>Filtreler</h2><div className="filters-actions">{count>0 && <button className="clear-filters" onClick={clearFilters}>Temizle</button>}<button className="close-filters" onClick={()=>{setIsFiltersOpen(false);toggle.current?.focus();}} aria-label="Filtreleri kapat"><Icon name="close" size={20}/></button></div></div>
                <fieldset className="filter-section"><legend>Kategori</legend><div className="filter-options">{categories.map(category=><button key={category} className={`filter-btn ${selectedCategory===category?'active':''}`} aria-pressed={selectedCategory===category} onClick={()=>changeCategory(category)}>{category}<span>{category==='Tümü'?products.length:products.filter(product=>product.category===category).length}</span></button>)}</div></fieldset>
                {selectedCategory!=='Tümü' && <fieldset className="filter-section"><legend>Ürün tipi</legend><div className="filter-options">{(subcategories[selectedCategory]||[]).map(sub=><button key={sub} className={`filter-btn ${subcategory===sub?'active':''}`} aria-pressed={subcategory===sub} onClick={()=>setSubcategory(subcategory===sub?null:sub)}>{sub}</button>)}</div></fieldset>}
                <fieldset className="filter-section"><legend>Beden</legend><div className="size-filters">{dynamicSizes.map(size=><button key={size} className={`size-filter-btn ${sizes.includes(size)?'active':''}`} onClick={()=>toggleValue(size,setSizes)} aria-pressed={sizes.includes(size)}>{size}</button>)}</div></fieldset>
                <fieldset className="filter-section"><legend>Renk</legend><div className="color-filters">{dynamicColors.map(color=><button key={color.name} className={`color-filter-btn ${colors.includes(color.name)?'active':''}`} style={{backgroundColor:color.code}} title={color.name} aria-label={color.name} aria-pressed={colors.includes(color.name)} onClick={()=>toggleValue(color.name,setColors)}>{colors.includes(color.name)&&<span>✓</span>}</button>)}</div></fieldset>
                <fieldset className="filter-section"><legend>Fiyat aralığı</legend><div className="price-range-inputs"><PriceInput id="price-min" label="En az (TL)" name="En az" placeholder="0" value={priceRange[0]} onChange={value=>setPriceRange([value,priceRange[1]])}/><PriceInput id="price-max" label="En çok (TL)" name="En çok" placeholder="Tümü" value={priceRange[1]} onChange={value=>setPriceRange([priceRange[0],value])}/></div></fieldset>
                <button className="btn btn-primary show-results" onClick={()=>{setIsFiltersOpen(false);toggle.current?.focus();}}>{filteredProducts.length} ürünü göster</button>
            </aside>
            <div className="products-content"><div className="products-toolbar"><p role="status">{filteredProducts.length} parça</p><label htmlFor="sort-products" className="sr-only">Ürünleri sırala</label><select id="sort-products" value={sortBy} onChange={event=>setSortBy(event.target.value)} className="sort-select"><option value="featured">Öne Çıkanlar</option><option value="price-asc">Fiyat: Artan</option><option value="price-desc">Fiyat: Azalan</option><option value="name">İsim: A–Z</option><option value="newest">Yeni Eklenenler</option></select></div>
                {filteredProducts.length ? <div className="products-grid categories-grid">{filteredProducts.map(product=><ProductCard key={product.id} product={product} onAddToCart={onAddToCart}/>)}</div> : <div className="no-products"><span className="eyebrow">BİRAZ DAHA KEŞFEDELİM</span><h2>Bu seçimde bir parça bulamadık.</h2><p>Filtrelerini değiştirerek koleksiyona yeniden göz atabilirsin.</p><button className="btn btn-primary" onClick={clearFilters}>Filtreleri temizle</button></div>}
            </div>
        </div></div>
    </div>;
}
