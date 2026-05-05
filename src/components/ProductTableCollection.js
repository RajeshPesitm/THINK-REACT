import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';
import styles from './styles.module.css';

const backendUrl = `http://localhost:${process.env.REACT_APP_API_PORT || 5000}`;

export default function ProductTableCollection({ category, products, onCategoryClick, isDetailView, onProductsUpdated }) {
    const wrapperClass = isDetailView ? styles.nonClickable : styles.clickable;

    const handleExportCategory = async (event) => {
        event.stopPropagation();

        try {
            const response = await fetch(`${backendUrl}/api/products/export?category=${encodeURIComponent(category)}`);
            if (!response.ok) {
                throw new Error('Export failed');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${category}-products.xlsx`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert(`Unable to export ${category} products.`);
        }
    };

    const handleImportCategory = async (event) => {
        event.stopPropagation();
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${backendUrl}/api/products/import?category=${encodeURIComponent(category)}`, {
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
            alert(`${category} products imported successfully.`);
        } catch (err) {
            console.error(err);
            alert(`Unable to import products for ${category}.`);
        }
    };
    
    return (
        <div 
            className={`${styles.tableWrapper} ${wrapperClass}`}
            onClick={() => !isDetailView && onCategoryClick && onCategoryClick(category)}
        >
            <div className={styles.tableHeader}>
                <h2>{category}</h2>
                {isDetailView && (
                    <div className={styles.toolbar} onClick={(event) => event.stopPropagation()}>
                        <label className={styles.uploadLabel}>
                            Import
                            <input
                                type="file"
                                accept=".xlsx,.xls"
                                hidden
                                onChange={handleImportCategory}
                            />
                        </label>
                        <button
                            type="button"
                            className={styles.actionButton}
                            onClick={handleExportCategory}
                        >
                            Export
                        </button>
                    </div>
                )}
            </div>
            <table className={styles.table}>
                <tbody>
                    <ProductCategoryRow category={category} />
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>In Stock</th>
                        <th>Action</th>
                    </tr>
                    {products.map((product) => (
                        <ProductRow
                            product={product}
                            key={product._id || product.name}
                            onProductsUpdated={onProductsUpdated}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
