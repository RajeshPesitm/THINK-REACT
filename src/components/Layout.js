import styles from './styles.module.css';

export default function Layout({ children, title, showBackButton, onBack }) {
    return (
        <div className={styles.layoutContainer}>
            {showBackButton && (
                <button 
                    className={styles.backButton}
                    onClick={onBack}
                >
                    ← Back to Home
                </button>
            )}
            {title && <h1 className={styles.pageTitle}>{title}</h1>}
            <div className={styles.layoutContent}>
                {children}
            </div>
        </div>
    );
}
