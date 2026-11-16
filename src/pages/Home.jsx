import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';

function Home({ products, onAddToCart, motionEnabled, onMotionToggle }) {
    return (
        <>
            <Hero motionEnabled={motionEnabled} onMotionToggle={onMotionToggle}/>
            <ProductGrid products={products} onAddToCart={onAddToCart} />
        </>
    );
}

export default Home;
