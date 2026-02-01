import { Roboto } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { BlogProvider } from "@/context/BlogContext";
import { ContentProvider } from "@/context/ContentContext";
import { SalesProvider } from "@/context/SalesContext";
import { ToastProvider } from "@/context/ToastContext";
import WhatsAppButton from "@/components/WhatsAppButton";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata = {
  title: "Da Mata Artesanal",
  description: "Moda artesanal com conexão natural.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={roboto.variable}>
        <ContentProvider>
            <ToastProvider>
                <BlogProvider>
                    <SalesProvider>
                        <ProductProvider>
                            <CartProvider>
                                {children}
                                <WhatsAppButton />
                            </CartProvider>
                        </ProductProvider>
                    </SalesProvider>
                </BlogProvider>
            </ToastProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
