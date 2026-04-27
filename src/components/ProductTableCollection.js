import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';

export default function ProductTableCollection({ category, products }) {
    return (
        <>
            <ProductCategoryRow category={category} />
            {products.map((product) => (
                <ProductRow
                    product={product}
                    key={product.name}
                />
            ))}
        </>
    );
}
