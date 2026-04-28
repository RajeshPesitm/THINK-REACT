import styles from './styles.module.css';

export default function Layout({ children, onHome }) {
    return (
        <div className={styles.layoutContainer}>
            <button 
                className={styles.backButton}
                onClick={onHome}
            >
                Home
            </button>
            <div className={styles.layoutContent}>
                {children}
            </div>
        </div>
    );
}
