import ProductTableCollection from './ProductTableCollection';

export default function CategoryDetail({ category, products }) {
    return (
        <ProductTableCollection 
            category={category} 
            products={products}
            isDetailView={true}
        />
    );
}
