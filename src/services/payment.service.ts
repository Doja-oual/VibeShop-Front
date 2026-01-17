import apiClient from './api-client';
import { PaymentIntent, PromoCode, ApiResponse } from '@/types';

export const paymentService = {
  // Create payment intent
  async createPaymentIntent(amount: number, currency: string = 'eur'): Promise<PaymentIntent> {
    const response = await apiClient.post<ApiResponse<PaymentIntent>>('/payments/intent', {
      amount,
      currency,
    });
    return response.data.data;
  },

  // Confirm payment
  async confirmPayment(paymentIntentId: string): Promise<any> {
    const response = await apiClient.post<ApiResponse<any>>('/payments/confirm', {
      paymentIntentId,
    });
    return response.data.data;
  },

  // Validate promo code
  async validatePromoCode(code: string): Promise<PromoCode> {
    const response = await apiClient.post<ApiResponse<PromoCode>>('/payments/promo/validate', {
      code,
    });
    return response.data.data;
  },

  // Apply promo code
  async applyPromoCode(code: string, subtotal: number): Promise<number> {
    const response = await apiClient.post<ApiResponse<{ discount: number }>>(
      '/payments/promo/apply',
      { code, subtotal }
    );
    return response.data.data.discount;
  },
};
