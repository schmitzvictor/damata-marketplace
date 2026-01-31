import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <Link href={`/produtos/${product.id}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
             {/* Using simple img for now to avoid domain config issues with placeholder service, 
                 in production would use next/image with configured domains */}
            <img 
              src={product.image} 
              alt={product.name} 
              className={styles.image}
            />
        </div>
      </Link>
      <div className={styles.content}>
        <h3 className={styles.title}>
            <Link href={`/produtos/${product.id}`} className={styles.titleLink}>
                {product.name}
            </Link>
        </h3>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.footer}>
            <span className={styles.price}>
                R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            <button className={styles.addBtn} title="Adicionar ao Carrinho">
                +
            </button>
        </div>
      </div>
    </div>
  );
}
