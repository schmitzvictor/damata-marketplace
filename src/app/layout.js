import { Roboto, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { BlogProvider } from "@/context/BlogContext";
import { ContentProvider } from "@/context/ContentContext";
import { SalesProvider } from "@/context/SalesContext";
import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import WhatsAppButton from "@/components/WhatsAppButton";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Damata Grow",
  description: "Moda artesanal com conexão natural.",
};

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Roboto:wght@400;500;700&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=account_circle,add,arrow_forward,chat,check_circle,close,dark_mode,dashboard,delete,eco,edit,expand_more,group,home,inventory_2,light_mode,lock,lock_open,login,logout,payments,person,search,settings,shopping_bag,shopping_cart,verified_user" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${roboto.variable} ${inter.variable}`}>
        <ThemeProvider>
          <AuthProvider>
            <ContentProvider>
              <ToastProvider>
                <BlogProvider>
                  <SalesProvider>
                    <ProductProvider>
                      <CartProvider>
                        {children}
                        <WhatsAppButton />
                        <Analytics />
                        <SpeedInsights />
                      </CartProvider>
                    </ProductProvider>
                  </SalesProvider>
                </BlogProvider>
              </ToastProvider>
            </ContentProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
