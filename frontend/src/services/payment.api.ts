// frontend/src/services/payment.api.ts
import { apiClient } from './api';
import {
  CreditBalance,
  PricingPlan,
  PaymentCheckoutResult,
  CreditHistoryResponse
} from '../types/payment.types';

/**
 * Lấy số dư tín dụng hiện tại của người dùng
 * GET /api/credits/balance
 */
export const getCreditBalanceApi = async (): Promise<CreditBalance> => {
  const res = await apiClient.get<{ success: boolean; data: CreditBalance }>('/credits/balance');
  return res.data.data;
};

/**
 * Lấy danh mục các gói cước đang kích hoạt
 * GET /api/credits/plans
 */
export const getPricingPlansApi = async (): Promise<PricingPlan[]> => {
  const res = await apiClient.get<{ success: boolean; data: { plans: PricingPlan[] } }>('/credits/plans');
  return res.data.data.plans;
};

/**
 * Khởi tạo phiên thanh toán Stripe Checkout
 * POST /api/credits/checkout
 */
export const createCheckoutSessionApi = async (planId: string): Promise<PaymentCheckoutResult> => {
  const res = await apiClient.post<{ success: boolean; data: PaymentCheckoutResult }>('/credits/checkout', {
    planId
  });
  return res.data.data;
};

/**
 * Lấy lịch sử sổ cái giao dịch có phân trang
 * GET /api/credits/history?page=1&limit=10
 */
export const getCreditHistoryApi = async (
  page: number = 1,
  limit: number = 10
): Promise<CreditHistoryResponse> => {
  const res = await apiClient.get<{ success: boolean; data: CreditHistoryResponse }>('/credits/history', {
    params: { page, limit }
  });
  return res.data.data;
};

