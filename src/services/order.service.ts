import apiClient from './api-client';
import { Order, OrderStatus, PaginatedResponse, ApiResponse, Address } from '@/types';

export interface CreateOrderData {
  items: { productId: string; quantity: number }[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethodId: string;
  promoCode?: string;
  notes?: string;
}

export const orderService = {
  // Create order (checkout)
  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await apiClient.post<ApiResponse<Order>>('/orders', data);
    return response.data.data;
  },

  // Get user orders
  async getMyOrders(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Order>> {
    const response = await apiClient.get<PaginatedResponse<Order>>('/orders/me', {
      params: { page, limit },
    });
    return response.data;
  },

  // Get single order
  async getOrder(id: string): Promise<Order> {
    const response = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data.data;
  },

  // Cancel order
  async cancelOrder(id: string): Promise<Order> {
    const response = await apiClient.post<ApiResponse<Order>>(`/orders/${id}/cancel`);
    return response.data.data;
  },

  // Admin: Get all orders
  async getAllOrders(
    page: number = 1,
    limit: number = 20,
    status?: OrderStatus
  ): Promise<PaginatedResponse<Order>> {
    const params: any = { page, limit };
    if (status) params.status = status;

    const response = await apiClient.get<PaginatedResponse<Order>>('/orders', { params });
    return response.data;
  },

  // Admin: Update order status
  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const response = await apiClient.patch<ApiResponse<Order>>(`/orders/${id}/status`, {
      status,
    });
    return response.data.data;
  },

  // Admin: Get order statistics
  async getOrderStats(): Promise<any> {
    const response = await apiClient.get<ApiResponse<any>>('/orders/stats');
    return response.data.data;
  },
};
