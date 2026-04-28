import { useState } from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import CategoryDetail from './CategoryDetail';
import Layout from './Layout';

export default function FilterableProductTable({ products }) {

    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleBackToHome = () => {
        setSelectedCategory(null);
    };

    if (selectedCategory) {
        const categoryProducts = products.filter(
            product => product.category === selectedCategory
        );
        return (
            <CategoryDetail 
                category={selectedCategory}
                products={categoryProducts}
                onBack={handleBackToHome}
            />
        );
    }

    return (
        <Layout showBackButton={false}>
            <SearchBar
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockOnlyChange={setInStockOnly}
            />
            <ProductTable
                products={products}
                filterText={filterText}
                inStockOnly={inStockOnly}
                onCategoryClick={handleCategoryClick}
            />
        </Layout>
    );
}
