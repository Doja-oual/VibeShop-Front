import apiClient from './api-client';
import { DashboardStats, SalesData, TopProduct, ApiResponse } from '@/types';

export const dashboardService = {
  // Get dashboard statistics
  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data.data;
  },

  // Get sales data for chart
  async getSalesData(period: '7d' | '30d' | '90d' = '7d'): Promise<SalesData[]> {
    const response = await apiClient.get<ApiResponse<SalesData[]>>('/dashboard/sales', {
      params: { period },
    });
    return response.data.data;
  },

  // Get top products
  async getTopProducts(limit: number = 5): Promise<TopProduct[]> {
    const response = await apiClient.get<ApiResponse<TopProduct[]>>('/dashboard/top-products', {
      params: { limit },
    });
    return response.data.data;
  },

  // Get recent activity
  async getRecentActivity(limit: number = 10): Promise<any[]> {
    const response = await apiClient.get<ApiResponse<any[]>>('/dashboard/activity', {
      params: { limit },
    });
    return response.data.data;
  },
};
