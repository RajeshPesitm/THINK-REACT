import { useState, useEffect } from 'react';
import { FilterableProductTable, CategoryDetail, Layout } from './components';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [PRODUCTS, setProducts] = useState([]); // 🔥 moved to state
  const backendPort = process.env.REACT_APP_API_PORT || 5000;
  const backendUrl = `http://localhost:${backendPort}`;

  // 🔥 fetch from MongoDB backend
  useEffect(() => {
    fetch(`${backendUrl}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, [backendUrl]);

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
        <h1 style={{ marginTop: '0' }}>
          {selectedCategory} - Products
        </h1>
        <CategoryDetail 
          category={selectedCategory}
          products={categoryProducts}
        />
      </>
    );
  } else {
    content = (
      <FilterableProductTable 
        products={PRODUCTS} 
        onCategoryClick={handleCategoryClick} 
      />
    );
  }

  return (
    <Layout onHome={handleHome}>
      {content}
    </Layout>
  );
}