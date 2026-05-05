import ProductTableCollection from './ProductTableCollection';
import styles from './styles.module.css';

const backendUrl = `http://localhost:${process.env.REACT_APP_API_PORT || 5000}`;

export default function ProductTable({ products, filterText, inStockOnly, onCategoryClick, onProductsUpdated }) {
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

    const handleExportAll = async () => {
        try {
            const response = await fetch(`${backendUrl}/products/export`);
            if (!response.ok) {
                throw new Error('Export failed');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'products.xlsx';
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert('Unable to export all products.');
        }
    };

    const handleImportAll = async (event) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${backendUrl}/products/import`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || 'Import failed');
            }
            await response.json();
            event.target.value = '';
            onProductsUpdated?.();
            alert('Products imported successfully.');
        } catch (err) {
            console.error(err);
            alert('Unable to import products.');
        }
    };

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
        <>
            <div className={styles.toolbar}>
                <label className={styles.uploadLabel}>
                    Import all
                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        hidden
                        onChange={handleImportAll}
                    />
                </label>
                <button
                    type="button"
                    className={styles.actionButton}
                    onClick={handleExportAll}
                >
                    Export all
                </button>
            </div>
            <div className={styles.gridContainer}>
                {categories.map((category) => (
                    <ProductTableCollection
                        key={category}
                        category={category}
                        products={groupedByCategory[category]}
                        onCategoryClick={onCategoryClick}
                        onProductsUpdated={onProductsUpdated}
                    />
                ))}
            </div>
        </>
    );
}
