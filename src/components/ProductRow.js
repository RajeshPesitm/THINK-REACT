import styles from './styles.module.css';

export default function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td className={styles.tableCell}>{name}</td>
      <td className={styles.tableCell}>{product.price}</td>
      <td className={styles.tableCell}>{product.stocked ? 'Yes' : 'No'}</td>
    </tr>
  );
}
