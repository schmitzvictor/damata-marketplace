"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [content, setContent] = useState({
    aboutUsTitle: "Quem Somos Nós",
    aboutUsText: "A Da Mata Artesanal nasceu do desejo de conectar moda e natureza. Nossas peças são criações únicas, inspiradas na biodiversidade e produzidas com respeito ao meio ambiente. Cada detalhe é pensado para trazer o conforto da floresta para o seu dia a dia.",
    socials: {
        instagram: "https://instagram.com/damata",
        facebook: "https://facebook.com/damata",
    },
    whatsapp: "5548999999999"
  });

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("daMataContent");
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (e) {
        console.error("Failed to parse content", e);
      }
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem("daMataContent", JSON.stringify(content));
  }, [content]);

  const updateContent = (newContent) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
