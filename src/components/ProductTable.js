import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';

export default function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    lastCategory = product.category;

    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>In Stock</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
