import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/products.json');
        
        if (!response.ok) {
          throw new Error('Ürün verileri yüklenemedi');
        }
        
        const data = await response.json();
        
        setProducts(data.products || []);
        setCategories(data.categories || []);
        setSubcategories(data.subcategories || {});
        setAvailableSizes(data.availableSizes || []);
        setAvailableColors(data.availableColors || []);
        setError(null);
      } catch (err) {
        console.error('Ürün yükleme hatası:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const value = {
    products,
    categories,
    subcategories,
    availableSizes,
    availableColors,
    loading,
    error,
    getProductById
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

export default ProductContext;
