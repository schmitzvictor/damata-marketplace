"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { posts as initialPosts } from "@/lib/posts";

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem("daMataPosts");
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        console.error("Failed to parse posts", e);
      }
    }
  }, []);

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem("daMataPosts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => {
    const newId = Math.max(...posts.map(p => p.id), 0) + 1;
    const newPost = { 
        ...post, 
        id: newId, 
        date: new Date().toISOString().split('T')[0] 
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id, updatedData) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deletePost = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const getPostById = (id) => posts.find(p => p.id === parseInt(id));

  return (
    <BlogContext.Provider value={{ 
      posts, 
      addPost, 
      updatePost, 
      deletePost,
      getPostById
    }}>
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => useContext(BlogContext);
