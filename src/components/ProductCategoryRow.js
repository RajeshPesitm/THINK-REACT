export default function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="3">
        {category}
      </th>
    </tr>
  );
}
