import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import './App.css';

function AppContent() {
  const [cart, setCart] = useState([]);
  const { products, loading, error } = useProducts();

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item =>
        item.id === product.id &&
        item.selectedSize === product.selectedSize &&
        item.selectedColor?.name === product.selectedColor?.name
      );

      if (existingItem) {
        return prevCart.map(item =>
          (item.id === product.id &&
            item.selectedSize === product.selectedSize &&
            item.selectedColor?.name === product.selectedColor?.name)
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prevCart, {
        ...product,
        quantity: product.quantity || 1,
        selectedSize: product.selectedSize || product.sizes?.[0],
        selectedColor: product.selectedColor || product.colors?.[0]
      }];
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (loading) {
    return (
      <div className="app">
        <Navbar cartCount={0} />
        <main style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div className="loading-spinner" style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(255, 255, 255, 0.1)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Ürünler yükleniyor...</p>
        </main>
        <Footer />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Navbar cartCount={0} />
        <main style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <p style={{ color: '#ef4444', fontSize: '1.2rem' }}>⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Tekrar Dene
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar cartCount={cartCount} />
      <main>
        <Routes>
          <Route path="/" element={<Home products={products} onAddToCart={handleAddToCart} />} />
          <Route path="/categories" element={<Categories products={products} onAddToCart={handleAddToCart} />} />
          <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        </Routes>
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ProductProvider>
        <AppContent />
      </ProductProvider>
    </Router>
  );
}

export default App;
