"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useSales } from "@/context/SalesContext"; // Added import
import styles from "./page.module.css";

export default function Checkout() {
  const { cartTotal, cartItems, clearCart } = useCart();
  const { addOrder } = useSales(); // Added useSales hook
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    zip: "",
    address: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    reference: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCepBlur = async (e) => {
      const cep = e.target.value.replace(/\D/g, '');
      if (cep.length === 8) {
          try {
              const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
              const data = await res.json();
              if (!data.erro) {
                  setFormData(prev => ({
                      ...prev,
                      address: data.logradouro,
                      district: data.bairro,
                      city: data.localidade,
                      state: data.uf
                  }));
              }
          } catch (error) {
              console.error("CEP Error", error);
          }
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to Mercado Pago
    await new Promise(resolve => setTimeout(resolve, 2000));

    addOrder({
        customer: formData.name,
        total: cartTotal,
        itemsCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        items: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        status: "Pago",
        cartItems: cartItems,
        address: {
            zip: formData.zip,
            street: formData.address,
            number: formData.number,
            complement: formData.complement,
            district: formData.district,
            city: formData.city,
            state: formData.state,
            reference: formData.reference
        }
    });

    setLoading(false);
    clearCart();
    setSuccess(true);
    
    setTimeout(() => {
        router.push("/");
    }, 3000);
  };

  if (success) {
      return (
        <div className={styles.page}>
            <Header />
            <main className="container" style={{textAlign: 'center', padding: '4rem 0'}}>
                <div style={{color: 'green', fontSize: '4rem', marginBottom: '1rem'}}>✓</div>
                <h1>Pagamento realizado com sucesso!</h1>
                <p>Obrigado por sua compra. Você receberá um e-mail com os detalhes.</p>
                <p>Redirecionando para a loja...</p>
            </main>
            <Footer />
        </div>
      );
  }

  if (cartItems.length === 0) {
      return (
          <div className={styles.page}>
              <Header />
              <main className="container" style={{textAlign: 'center', padding: '4rem 0'}}>
                  <h1>Carrinho vazio</h1>
              </main>
              <Footer />
          </div>
      );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className="container">
        <h1 className={styles.title}>Finalizar Compra</h1>
        
        <div className={styles.layout}>
            <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Dados de Entrega</h2>
                <form id="checkout-form" onSubmit={handleSubmit} className={styles.form}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Nome Completo" 
                        required 
                        className={styles.input} 
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="E-mail" 
                        required 
                        className={styles.input} 
                        onChange={handleChange}
                        value={formData.email}
                    />
                    
                    <div className={styles.row}>
                        <input 
                            type="text" 
                            name="zip" 
                            placeholder="CEP" 
                            required 
                            className={styles.input} 
                            onChange={handleChange}
                            onBlur={handleCepBlur}
                            value={formData.zip}
                            maxLength="9"
                        />
                        <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank" rel="noopener noreferrer" style={{fontSize: '0.8rem', color: '#2E7D32', alignSelf: 'center'}}>
                            Não sei meu CEP
                        </a>
                    </div>

                    <div className={styles.row}>
                        <input 
                            type="text" 
                            name="address" 
                            placeholder="Rua / Endereço" 
                            required 
                            className={styles.input} 
                            onChange={handleChange}
                            value={formData.address}
                            style={{ flex: 2 }}
                        />
                        <input 
                            type="text" 
                            name="number" 
                            placeholder="Número" 
                            required 
                            className={styles.input} 
                            onChange={handleChange}
                            value={formData.number}
                            style={{ flex: 1 }}
                        />
                    </div>

                    <div className={styles.row}>
                        <input 
                            type="text" 
                            name="complement" 
                            placeholder="Complemento (Obrigatório)" 
                            required 
                            className={styles.input} 
                            onChange={handleChange}
                            value={formData.complement}
                            style={{ flex: 1 }}
                        />
                        <input 
                            type="text" 
                            name="district" 
                            placeholder="Bairro" 
                            required 
                            className={styles.input} 
                            onChange={handleChange}
                            value={formData.district}
                            style={{ flex: 1 }}
                        />
                    </div>

                    <div className={styles.row}>
                        <input 
                            type="text" 
                            name="city" 
                            placeholder="Cidade" 
                            required 
                            className={styles.input} 
                            onChange={handleChange}
                            value={formData.city}
                            style={{ flex: 2 }}
                        />
                        <input 
                            type="text" 
                            name="state" 
                            placeholder="UF" 
                            required 
                            className={styles.input} 
                            onChange={handleChange}
                            value={formData.state}
                            maxLength="2"
                            style={{ flex: 0.5 }}
                        />
                    </div>

                    <input 
                        type="text" 
                        name="reference" 
                        placeholder="Ponto de Referência (Opcional)" 
                        className={styles.input} 
                        onChange={handleChange}
                        value={formData.reference}
                    />
                </form>

                <h2 className={styles.sectionTitle} style={{marginTop: '2rem'}}>Pagamento</h2>
                <div className={styles.paymentMethod}>
                    <p>Será redirecionado para o Mercado Pago (Simulação)</p>
                </div>
            </div>

            <div className={styles.summary}>
                <h2 className={styles.summaryTitle}>Resumo</h2>
                {cartItems.map(item => (
                    <div key={`${item.id}-${item.size}`} className={styles.summaryItem}>
                        <span>{item.quantity}x {item.name} ({item.size})</span>
                        <span>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                    </div>
                ))}
                
                <div className={styles.totalRow}>
                    <span>Total a Pagar</span>
                    <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>

                <button 
                    type="submit" 
                    form="checkout-form" 
                    className={styles.payBtn}
                    disabled={loading}
                >
                    {loading ? "Processando..." : "Pagar Agora"}
                </button>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
