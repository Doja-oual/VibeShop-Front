import { z } from 'zod';

// ========================================
// Auth Schemas
// ========================================

export const loginSchema = z.object({
  email: z.string().email('Email invalide').min(1, 'Email requis'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export const registerSchema = z.object({
  email: z.string().email('Email invalide').min(1, 'Email requis'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

// ========================================
// Address Schema
// ========================================

export const addressSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  company: z.string().optional(),
  address1: z.string().min(5, 'Adresse requise'),
  address2: z.string().optional(),
  city: z.string().min(2, 'Ville requise'),
  state: z.string().min(2, 'Région requise'),
  postalCode: z.string().regex(/^\d{5}$/, 'Code postal invalide (5 chiffres)'),
  country: z.string().min(2, 'Pays requis'),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Numéro de téléphone invalide'),
});

// ========================================
// Product Schema (Admin)
// ========================================

export const productSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères').max(200),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  price: z.number().positive('Le prix doit être positif'),
  compareAtPrice: z.number().positive().optional(),
  sku: z.string().min(2, 'SKU requis'),
  stock: z.number().int().min(0, 'Le stock ne peut pas être négatif'),
  categoryId: z.string().min(1, 'Catégorie requise'),
  brandId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  specifications: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    })
  ).optional(),
});

// ========================================
// Checkout Schema
// ========================================

export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  sameAsShipping: z.boolean().default(false),
  notes: z.string().max(500).optional(),
});

// ========================================
// Promo Code Schema
// ========================================

export const promoCodeSchema = z.object({
  code: z.string().min(3, 'Code promo invalide').max(50).toUpperCase(),
});

// ========================================
// Review Schema
// ========================================

export const reviewSchema = z.object({
  rating: z.number().int().min(1, 'Minimum 1 étoile').max(5, 'Maximum 5 étoiles'),
  title: z.string().min(3, 'Titre trop court').max(100),
  comment: z.string().min(10, 'Commentaire trop court').max(1000),
});

// ========================================
// Contact Schema
// ========================================

export const contactSchema = z.object({
  name: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  subject: z.string().min(5, 'Sujet requis'),
  message: z.string().min(20, 'Message trop court').max(2000),
});

// Export types from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type PromoCodeFormData = z.infer<typeof promoCodeSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
