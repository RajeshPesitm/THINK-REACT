import Layout from './Layout';
import ProductTableCollection from './ProductTableCollection';

export default function CategoryDetail({ category, products, onBack }) {
    return (
        <Layout 
            title={`${category} - Products`}
            showBackButton={true}
            onBack={onBack}
        >
            <ProductTableCollection 
                category={category} 
                products={products}
                isDetailView={true}
            />
        </Layout>
    );
}
