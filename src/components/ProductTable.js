import ProductTableCollection from './ProductTableCollection';

export default function ProductTable({ products, filterText, inStockOnly }) {
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
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>In Stock</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <ProductTableCollection
                        key={category}
                        category={category}
                        products={groupedByCategory[category]}
                    />
                ))}
            </tbody>
        </table>
    );
}
