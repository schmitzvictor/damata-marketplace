export const products = [
  {
    id: 1,
    name: "Camisa Cogumelo Mágico",
    price: 89.90,
    size: "M",
    date: "2024-01-15",
    image: "https://placehold.co/400x500/2E7D32/FFFFFF?text=Cogumelo+Magico",
    category: "Camisetas",
    featured: true,
    stock: 15
  },
  {
    id: 2,
    name: "Vestido Folhas de Outono",
    price: 149.90,
    size: "P",
    date: "2024-02-01",
    image: "https://placehold.co/400x500/D32F2F/FFFFFF?text=Vestido+Outono",
    category: "Vestidos",
    featured: true,
    stock: 8
  },
  {
    id: 3,
    name: "Calça Linho Natural",
    price: 129.90,
    size: "G",
    date: "2023-12-10",
    image: "https://placehold.co/400x500/8D6E63/FFFFFF?text=Calca+Linho",
    category: "Calças",
    featured: false,
    stock: 20
  },
  {
    id: 4,
    name: "Bermuda Cargo Verde",
    price: 79.90,
    size: "GG",
    date: "2024-01-20",
    image: "https://placehold.co/400x500/558B2F/FFFFFF?text=Bermuda+Cargo",
    category: "Bermudas",
    featured: false,
    stock: 12
  },
  {
    id: 5,
    name: "Camisa Estampa Floresta",
    price: 99.90,
    size: "M",
    date: "2024-02-10",
    image: "https://placehold.co/400x500/1B5E20/FFFFFF?text=Estampa+Floresta",
    category: "Camisetas",
    featured: true,
    stock: 5
  },
  {
    id: 6,
    name: "Saia Longa Terra",
    price: 119.90,
    size: "P",
    date: "2023-11-05",
    image: "https://placehold.co/400x500/795548/FFFFFF?text=Saia+Terra",
    category: "Saias",
    featured: false,
    stock: 7
  }
];

export const getAllProducts = () => products;

export const getFeaturedProducts = () => products.filter(p => p.featured);

export const getProductById = (id) => products.find(p => p.id === parseInt(id));
