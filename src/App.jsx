import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductProvider, useProducts } from './context/ProductContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Cart from './pages/Cart';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import Icon from './components/Icon';
import useMotionPreference from './useMotionPreference';
import './App.css';
import './motion.css';

const CART_KEY = 'fadexshop-cart-v2';
function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter(item => Number.isInteger(item.id) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99 && Number.isFinite(item.price) && Array.isArray(item.images) && Array.isArray(item.colors) && Array.isArray(item.sizes)) : [];
  } catch { return []; }
}
function AppContent() {
  const { motionEnabled, toggleMotion } = useMotionPreference();
  const [cart, setCart] = useState(readCart);
  const [toast, setToast] = useState(null);
  const { products, loading, error } = useProducts();
  useEffect(() => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* Browsing with storage disabled still supports the current session. */ } }, [cart]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(null), 3800); return () => clearTimeout(timer); }, [toast]);
  const handleAddToCart = (product) => {
    if (!product.inStock) return;
    const maxQuantity = Math.min(product.stockCount || 99, 99);
    const item = { ...product, quantity: Math.min(maxQuantity, product.quantity || 1), selectedSize: product.selectedSize || product.sizes[0], selectedColor: product.selectedColor || product.colors[0] };
    setCart(previous => {
      const matches = entry => entry.id === item.id && entry.selectedSize === item.selectedSize && entry.selectedColor?.name === item.selectedColor?.name;
      return previous.some(matches) ? previous.map(entry => matches(entry) ? { ...entry, quantity: Math.min(maxQuantity, entry.quantity + item.quantity) } : entry) : [...previous, item];
    });
    setToast({ name: product.name, time: Date.now() });
  };
  return <div className="app">
    {!loading && <ScrollToTop/>}
    <a href="#main-content" className="skip-link">İçeriğe geç</a>
    <Navbar cartCount={cart.reduce((sum,item) => sum + item.quantity, 0)}/>
    <main id="main-content">
      {loading ? <div className="app-state" role="status"><div className="loading-spinner"/><p>Koleksiyon hazırlanıyor…</p></div> : error ? <div className="app-state" role="alert"><p>Ürünler şu anda yüklenemiyor.</p><button className="btn btn-primary" onClick={() => window.location.reload()}>Tekrar dene</button></div> :
      <Routes>
        <Route path="/" element={<Home products={products} onAddToCart={handleAddToCart} motionEnabled={motionEnabled} onMotionToggle={toggleMotion}/>}/>
        <Route path="/categories" element={<Categories products={products} onAddToCart={handleAddToCart}/>}/>
        <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart}/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/faq" element={<FAQ/>}/>
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>}/>
        <Route path="*" element={<div className="app-state"><h1>Bu sayfa bulunamadı.</h1><Link to="/" className="btn btn-primary">Ana sayfaya dön</Link></div>}/>
      </Routes>}
    </main>
    {toast && <div key={toast.time} className="toast" role="status"><Icon name="check" size={18}/><span>Ürün sepetinize eklendi.</span><Link to="/cart">Sepeti gör</Link></div>}
    <WhatsAppButton/>
    <Footer motionEnabled={motionEnabled} onMotionToggle={toggleMotion}/>
  </div>;
}
export default function App() { return <Router><ProductProvider><AppContent/></ProductProvider></Router>; }
