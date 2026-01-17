import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';

function Home({ products, onAddToCart }) {
    return (
        <>
            <Hero />
            <ProductGrid products={products} onAddToCart={onAddToCart} />
        </>
    );
}

export default Home;
