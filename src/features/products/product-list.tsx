import { products } from '@/assets/images'
import { ProductCard } from '@/features/products/product-card';

export const ProductList = () => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.name} product={product} />
            ))}
        </section>
    );
};