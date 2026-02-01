"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
        try {
            const res = await fetch('/api/settings');
            if (res.ok) {
                const data = await res.json();
                // Data is { aboutUsTitle: "...", ... }
                setContent(data);
            }
        } catch (e) { console.error(e); }
    };

    fetchContent();
  }, []);

  const updateContent = async (newContent) => {
    try {
        const res = await fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContent)
        });
        if (res.ok) {
            setContent(prev => ({ ...prev, ...newContent }));
        }
    } catch (e) {
        console.error("Update content failed", e);
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
