import { useState } from 'react';
import styles from './styles.module.css';

const backendUrl = `http://localhost:${process.env.REACT_APP_API_PORT || 5000}`;

export default function ProductRow({ product, onProductsUpdated }) {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [stocked, setStocked] = useState(product.stocked);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${backendUrl}/products/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price: Number(price), stocked }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Update failed');
      }

      await response.json();
      onProductsUpdated?.();
      setExpanded(false);
      alert('Product updated successfully.');
    } catch (err) {
      console.error(err);
      alert('Unable to update product.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${product.name}?`)) {
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/products/${product._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Delete failed');
      }

      await response.json();
      onProductsUpdated?.();
      alert('Product deleted successfully.');
    } catch (err) {
      console.error(err);
      alert('Unable to delete product.');
    }
  };

  const displayName = product.stocked ? product.name : (
    <span style={{ color: 'red' }}>
      {product.name}
    </span>
  );

  const hasId = !!product._id;
  return (
    <>
      <tr>
        <td className={styles.tableCell}>{displayName}</td>
        <td className={styles.tableCell}>{product.price}</td>
        <td className={styles.tableCell}>{product.stocked ? 'Yes' : 'No'}</td>
        <td className={styles.tableCell}>
          <button
            type="button"
            className={styles.smallButton}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? 'Hide' : 'View'}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className={styles.detailRow}>
          <td className={styles.detailCell} colSpan="4">
            <div className={styles.detailForm}>
              {!hasId && (
                <div style={{ color: 'red', marginBottom: 8 }}>
                  This product cannot be updated or deleted (missing _id).
                </div>
              )}
              <label>
                Name
                <input
                  className={styles.detailInput}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={!hasId}
                />
              </label>
              <label>
                Price
                <input
                  className={styles.detailInput}
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  disabled={!hasId}
                />
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={stocked}
                  onChange={() => setStocked((value) => !value)}
                  disabled={!hasId}
                />
                In stock
              </label>
              <div className={styles.detailActions}>
                <button
                  type="button"
                  className={styles.actionButton}
                  onClick={handleUpdate}
                  disabled={!hasId}
                >
                  Update
                </button>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={handleDelete}
                  disabled={!hasId}
                >
                  Delete
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
