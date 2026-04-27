import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';
import styles from './styles.module.css';

export default function ProductTableCollection({ category, products }) {
    return (
        <table className={styles.table}>
            <tbody>
                <ProductCategoryRow category={category} />
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>In Stock</th>
                </tr>
                {products.map((product) => (
                    <ProductRow
                        product={product}
                        key={product.name}
                    />
                ))}
            </tbody>
        </table>
    );
}
