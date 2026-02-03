const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const initialProducts = [
  {
    name: "Camiseta Cogumelo Mágico",
    price: 89.90,
    date: "2024-01-15",
    image: "https://placehold.co/400x500/2E7D32/FFFFFF?text=Cogumelo+Magico",
    category: "Camisetas",
    featured: true,
    variants: {
      create: [
        { size: "P", stock: 5 },
        { size: "M", stock: 15 },
        { size: "G", stock: 8 },
        { size: "GG", stock: 2 },
      ]
    }
  },
  {
    name: "Vestido Folhas de Outono",
    price: 149.90,
    date: "2024-02-01",
    image: "https://placehold.co/400x500/D32F2F/FFFFFF?text=Vestido+Outono",
    category: "Vestidos",
    featured: true,
    variants: {
        create: [
            { size: "P", stock: 8 },
            { size: "M", stock: 5 },
            { size: "G", stock: 2 },
        ]
    }
  },
  {
    name: "Calça Linho Natural",
    price: 129.90,
    date: "2023-12-10",
    image: "https://placehold.co/400x500/8D6E63/FFFFFF?text=Calca+Linho",
    category: "Calças",
    featured: false,
    variants: {
        create: [
            { size: "M", stock: 10 },
            { size: "G", stock: 20 },
            { size: "GG", stock: 20 },
        ]
    }
  },
  {
    name: "Bermuda Cargo Verde",
    price: 79.90,
    date: "2024-01-20",
    image: "https://placehold.co/400x500/558B2F/FFFFFF?text=Bermuda+Cargo",
    category: "Bermudas",
    featured: false,
    variants: {
        create: [
           { size: "P", stock: 2 },
           { size: "GG", stock: 12 },
        ]
    }
  },
  {
    name: "Camisa Estampa Floresta",
    price: 99.90,
    date: "2024-02-10",
    image: "https://placehold.co/400x500/1B5E20/FFFFFF?text=Estampa+Floresta",
    category: "Camisetas",
    featured: true,
    variants: {
        create: [
            { size: "M", stock: 5 },
        ]
    }
  },
  {
    name: "Saia Longa Terra",
    price: 119.90,
    date: "2023-11-05",
    image: "https://placehold.co/400x500/795548/FFFFFF?text=Saia+Terra",
    category: "Saias",
    featured: false,
    variants: {
        create: [
            { size: "P", stock: 7 },
            { size: "M", stock: 10 },
        ]
    }
  }
];

const initialPosts = [
  {
    title: "A Magia dos Cogumelos na Moda",
    excerpt: "Descubra como os fungos inspiram nossas estampas e o design sustentável da nossa nova coleção.",
    content: "Os cogumelos não são apenas organismos fascinantes da floresta, eles representam uma rede de conexão vital. Na Da Mata Artesanal, buscamos trazer essa estética orgânica para nossas roupas...",
    date: new Date("2024-03-10"),
    image: "https://placehold.co/800x400/2E7D32/FFFFFF?text=Cogumelos+Moda",
    author: "Ana da Mata"
  },
  {
    title: "Tecidos Sustentáveis: O Futuro é Agora",
    excerpt: "Por que escolhemos linho e algodão orgânico para nossas peças.",
    content: "A indústria da moda é uma das mais poluentes do mundo. Para combater isso, escolhemos trabalhar apenas com fibras naturais que se degradam sem deixar rastros tóxicos...",
    date: new Date("2024-02-28"),
    image: "https://placehold.co/800x400/8D6E63/FFFFFF?text=Tecidos+Sustentaveis",
    author: "Carlos Silva"
  },
  {
    title: "Artesanato Local de Florianópolis",
    excerpt: "Valorizando a cultura manezinha em cada detalhe.",
    content: "Florianópolis respira arte e cultura. Nossa produção é 100% local, valorizando as costureiras e artesãos da ilha...",
    date: new Date("2024-01-15"),
    image: "https://placehold.co/800x400/1565C0/FFFFFF?text=Floripa+Artesanal",
    author: "Ana da Mata"
  }
];

const initialSettings = [
    {
        key: 'aboutUsTitle',
        value: JSON.stringify('Quem Somos Nós')
    },
    {
        key: 'aboutUsText',
        value: JSON.stringify('A Da Mata Artesanal nasceu do desejo de conectar moda e natureza. Nossas peças são criações únicas, inspiradas na biodiversidade e produzidas com respeito ao meio ambiente. Cada detalhe é pensado para trazer o conforto da floresta para o seu dia a dia.')
    },
    {
        key: 'socials',
        value: JSON.stringify({
            instagram: "https://instagram.com/damata",
            facebook: "https://facebook.com/damata",
        })
    },
    {
        key: 'whatsapp',
        value: JSON.stringify('5548999999999')
    }
];

async function main() {
  console.log('Seeding...');
  
  // Clear existing if needed, or better use upsert. 
  // For products, names might not be unique, so let's delete all and recreate for clean state given the schema change
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.post.deleteMany();
  await prisma.setting.deleteMany();

  for (const product of initialProducts) {
    await prisma.product.create({ data: product });
  }

  for (const post of initialPosts) {
    await prisma.post.create({ data: post });
  }

  for (const setting of initialSettings) {
    await prisma.setting.create({ data: setting });
  }

  // Create initial admin user
  await prisma.user.deleteMany(); // Clear existing users
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@damata.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'admin'
    }
  });
  console.log('Admin user created: admin@damata.com / admin123');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
