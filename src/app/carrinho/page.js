"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className={styles.page}>
      <Header />
      <main className="container">
        <h1 className={styles.title}>Seu Carrinho</h1>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Seu carrinho está vazio.</p>
            <Link href="/produtos" className={styles.continueBtn}>
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.itemsList}>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className={styles.item}>
                  <div className={styles.imageWrapper}>
                    <img src={item.image} alt={item.name} className={styles.image} />
                  </div>
                  
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemMeta}>Tamanho: {item.size}</p>
                    <p className={styles.itemPrice}>
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  <div className={styles.quantityControls}>
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className={styles.qtyBtn}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className={styles.qty}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className={styles.qtyBtn}
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.itemTotal}>
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id, item.size)}
                    className={styles.removeBtn}
                    title="Remover item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <h2 className={styles.summaryTitle}>Resumo do Pedido</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Frete</span>
                <span>Grátis</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total</span>
                <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              
              <Link href="/checkout" className={styles.checkoutBtn}>
                Finalizar Compra
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
