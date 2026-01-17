// Mock API Service - Données de test pour développement
import { Product, Category, Brand, Order, User } from '@/types';

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    slug: 'iphone-15-pro',
    description: 'Le smartphone le plus avancé d\'Apple avec puce A17 Pro',
    price: 1299,
    compareAtPrice: 1499,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
      'https://images.unsplash.com/photo-1695048064942-54a21f20f174?w=500'
    ],
    categoryId: '1',
    category: {
      id: '1',
      name: 'Smartphones',
      slug: 'smartphones',
      description: 'Téléphones intelligents',
      image: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    brandId: '1',
    brand: {
      id: '1',
      name: 'Apple',
      slug: 'apple',
      logo: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    stock: 50,
    sku: 'IPH15PRO-256-BLU',
    specifications: {
      'Écran': '6.1" Super Retina XDR',
      'Processeur': 'A17 Pro',
      'Mémoire': '256 GB',
      'Caméra': '48 MP',
      'Batterie': '3274 mAh'
    },
    rating: 4.8,
    reviewCount: 1024,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'MacBook Pro 16"',
    slug: 'macbook-pro-16',
    description: 'Le MacBook Pro le plus puissant avec puce M3 Max',
    price: 2999,
    compareAtPrice: 3299,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500'
    ],
    categoryId: '2',
    category: {
      id: '2',
      name: 'Ordinateurs',
      slug: 'ordinateurs',
      description: 'PC et Mac',
      image: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    brandId: '1',
    brand: {
      id: '1',
      name: 'Apple',
      slug: 'apple',
      logo: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    stock: 25,
    sku: 'MBP16-M3MAX-1TB',
    specifications: {
      'Écran': '16.2" Liquid Retina XDR',
      'Processeur': 'Apple M3 Max',
      'RAM': '36 GB',
      'Stockage': '1 TB SSD',
      'GPU': '40 cœurs'
    },
    rating: 4.9,
    reviewCount: 512,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'AirPods Pro 2',
    slug: 'airpods-pro-2',
    description: 'Écouteurs sans fil avec réduction de bruit active',
    price: 279,
    images: [
      'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500'
    ],
    categoryId: '3',
    category: {
      id: '3',
      name: 'Audio',
      slug: 'audio',
      description: 'Écouteurs et enceintes',
      image: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    brandId: '1',
    brand: {
      id: '1',
      name: 'Apple',
      slug: 'apple',
      logo: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    stock: 100,
    sku: 'AIRPODS-PRO-2',
    specifications: {
      'Type': 'Intra-auriculaires',
      'Réduction de bruit': 'Active',
      'Autonomie': 'Jusqu\'à 6h',
      'Étanche': 'IPX4'
    },
    rating: 4.7,
    reviewCount: 2048,
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    description: 'Smartphone Android haut de gamme avec S Pen',
    price: 1399,
    compareAtPrice: 1599,
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'
    ],
    categoryId: '1',
    category: {
      id: '1',
      name: 'Smartphones',
      slug: 'smartphones',
      description: 'Téléphones intelligents',
      image: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    brandId: '2',
    brand: {
      id: '2',
      name: 'Samsung',
      slug: 'samsung',
      logo: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    stock: 30,
    sku: 'SGS24U-512-BLK',
    specifications: {
      'Écran': '6.8" Dynamic AMOLED 2X',
      'Processeur': 'Snapdragon 8 Gen 3',
      'Mémoire': '512 GB',
      'Caméra': '200 MP',
      'Batterie': '5000 mAh'
    },
    rating: 4.6,
    reviewCount: 756,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Dell XPS 15',
    slug: 'dell-xps-15',
    description: 'PC portable performant pour créateurs',
    price: 1899,
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500'
    ],
    categoryId: '2',
    category: {
      id: '2',
      name: 'Ordinateurs',
      slug: 'ordinateurs',
      description: 'PC et Mac',
      image: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    brandId: '3',
    brand: {
      id: '3',
      name: 'Dell',
      slug: 'dell',
      logo: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    stock: 15,
    sku: 'XPS15-I9-32GB',
    specifications: {
      'Écran': '15.6" 4K OLED',
      'Processeur': 'Intel Core i9',
      'RAM': '32 GB',
      'Stockage': '1 TB SSD',
      'GPU': 'NVIDIA RTX 4060'
    },
    rating: 4.5,
    reviewCount: 342,
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    description: 'Casque sans fil premium avec réduction de bruit',
    price: 399,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500'
    ],
    categoryId: '3',
    category: {
      id: '3',
      name: 'Audio',
      slug: 'audio',
      description: 'Écouteurs et enceintes',
      image: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    brandId: '4',
    brand: {
      id: '4',
      name: 'Sony',
      slug: 'sony',
      logo: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    stock: 45,
    sku: 'SONY-WH1000XM5-BLK',
    specifications: {
      'Type': 'Circum-auriculaires',
      'Réduction de bruit': 'Active HD',
      'Autonomie': 'Jusqu\'à 30h',
      'Bluetooth': '5.2'
    },
    rating: 4.8,
    reviewCount: 1523,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Téléphones intelligents',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Ordinateurs',
    slug: 'ordinateurs',
    description: 'PC et Mac',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Audio',
    slug: 'audio',
    description: 'Écouteurs et enceintes',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock Brands
export const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'Apple',
    slug: 'apple',
    logo: 'https://logo.clearbit.com/apple.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Samsung',
    slug: 'samsung',
    logo: 'https://logo.clearbit.com/samsung.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Dell',
    slug: 'dell',
    logo: 'https://logo.clearbit.com/dell.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Sony',
    slug: 'sony',
    logo: 'https://logo.clearbit.com/sony.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
