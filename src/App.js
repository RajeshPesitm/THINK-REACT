import { useState } from 'react';
import { FilterableProductTable, CategoryDetail, Layout } from './components';

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  { category: "grains", price: "$1", stocked: true, name: "barley" },
  { category: "spices", price: "$1", stocked: false, name: "turmeric" }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleHome = () => {
    setSelectedCategory(null);
  };

  let content;
  if (selectedCategory) {
    const categoryProducts = PRODUCTS.filter(
      product => product.category === selectedCategory
    );
    content = (
      <>
        <h1 style={{ marginTop: '0' }}>{selectedCategory} - Products</h1>
        <CategoryDetail 
          category={selectedCategory}
          products={categoryProducts}
        />
      </>
    );
  } else {
    content = <FilterableProductTable products={PRODUCTS} onCategoryClick={handleCategoryClick} />;
  }

  return (
    <Layout onHome={handleHome}>
      {content}
    </Layout>
  );
}