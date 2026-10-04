import { z } from 'zod';

export const registerSchema = z.object({
    body: z.object({
        name: z.string().trim().min(2, 'Name must be at least 2 characters'),
        email: z.string().trim().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    }),
    params: z.object({}),
    query: z.object({}),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().trim().email('Invalid email address'),
        password: z.string().min(1, 'Password is required'),
    }),
    params: z.object({}),
    query: z.object({}),
});

const productFields = {
    name: z.string().trim().min(1, 'Name is required'),
    description: z.string().trim().min(1, 'Description is required'),
    price: z.number().nonnegative('Price cannot be negative'),
    category: z.enum([
        'electronics',
        'fashion',
        'home',
        'books',
        'sports',
        'beauty',
    ]),
    brand: z.string().optional(),
    image: z.string().url('Image must be a valid URL').optional(),
    stock: z.number().int().nonnegative('Stock cannot be negative').optional(),
    rating: z.number().min(0).max(5).optional(),
};

export const createProductSchema = z.object({
    body: z.object(productFields),
    params: z.object({}),
    query: z.object({}),
});

export const updateProductSchema = z.object({
    body: z.object(productFields).partial(),
    params: z.object({
        id: z.string().min(1, 'Product ID is required'),
    }),
    query: z.object({}),
});

export const createOrderSchema = z.object({
    body: z.object({
        items: z
            .array(
                z.object({
                    product: z.string().min(1, 'Product ID is required'),
                    quantity: z.number().int().positive('Quantity must be positive'),
                    price: z.number().nonnegative('Price cannot be negative'),
                })
            )
            .min(1, 'Order must contain at least one item'),
        shippingAddress: z.string().trim().min(1, 'Shipping address is required'),
        paymentMethod: z.string().trim().min(1, 'Payment method is required'),
    }),
    params: z.object({}),
    query: z.object({}),
});