import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';
import styles from './styles.module.css';

export default function ProductTableCollection({ category, products, onCategoryClick, isDetailView }) {
    const wrapperClass = isDetailView ? styles.nonClickable : styles.clickable;
    
    return (
        <div 
            className={`${styles.tableWrapper} ${wrapperClass}`}
            onClick={() => !isDetailView && onCategoryClick && onCategoryClick(category)}
        >
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
        </div>
    );
}
