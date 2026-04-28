import ProductTableCollection from './ProductTableCollection';
import styles from './styles.module.css';

export default function ProductTable({ products, filterText, inStockOnly, onCategoryClick }) {
    // Step 1: Filter products based on filterText and inStockOnly
    const filteredProducts = products.filter((product) => {
        if (
            product.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return false;
        }
        if (inStockOnly && !product.stocked) {
            return false;
        }
        return true;
    });

    // Step 2: Group filtered products by category
    const groupedByCategory = {};
    filteredProducts.forEach((product) => {
        if (!groupedByCategory[product.category]) {
            groupedByCategory[product.category] = [];
        }
        groupedByCategory[product.category].push(product);
    });

    // Step 3: Get categories in order of first appearance
    const categories = Object.keys(groupedByCategory);

    return (
        <div className={styles.gridContainer}>
            {categories.map((category) => (
                <ProductTableCollection
                    key={category}
                    category={category}
                    products={groupedByCategory[category]}
                    onCategoryClick={onCategoryClick}
                />
            ))}
        </div>
    );
}
