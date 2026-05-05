import ProductTableCollection from './ProductTableCollection';

export default function CategoryDetail({ category, products, onProductsUpdated }) {
    return (
        <ProductTableCollection 
            category={category} 
            products={products}
            isDetailView={true}
            onProductsUpdated={onProductsUpdated}
        />
    );
}
