// frontend/src/contexts/CreditContext.tsx
import React, { createContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  PricingPlan,
  CreditTransaction,
  CreditHistoryPagination
} from '../types/payment.types';
import {
  getCreditBalanceApi,
  getPricingPlansApi,
  createCheckoutSessionApi,
  getCreditHistoryApi
} from '../services/payment.api';

export interface PaymentSuccessDetails {
  planName?: string;
  creditsAdded?: number;
  newBalance?: number;
  sessionId?: string;
}

export interface CreditContextType {
  credits: number;
  currency: string;
  isLoadingBalance: boolean;
  plans: PricingPlan[];
  isLoadingPlans: boolean;
  history: CreditTransaction[];
  pagination: CreditHistoryPagination | null;
  isLoadingHistory: boolean;
  isPricingModalOpen: boolean;
  isHistoryModalOpen: boolean;
  isOutOfCreditsModalOpen: boolean;
  isSuccessModalOpen: boolean;
  successDetails: PaymentSuccessDetails | null;
  refreshBalance: () => Promise<void>;
  fetchPlans: () => Promise<void>;
  fetchHistory: (page?: number, limit?: number) => Promise<void>;
  startCheckout: (planId: string) => Promise<void>;
  openPricingModal: () => void;
  closePricingModal: () => void;
  openHistoryModal: () => void;
  closeHistoryModal: () => void;
  openOutOfCreditsModal: () => void;
  closeOutOfCreditsModal: () => void;
  openSuccessModal: (details?: PaymentSuccessDetails) => void;
  closeSuccessModal: () => void;
  updateCreditsDirectly: (newCredits: number) => void;
}

export const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [credits, setCredits] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('usd');
  const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(false);

  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState<boolean>(false);

  const [history, setHistory] = useState<CreditTransaction[]>([]);
  const [pagination, setPagination] = useState<CreditHistoryPagination | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);

  const [isPricingModalOpen, setIsPricingModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isOutOfCreditsModalOpen, setIsOutOfCreditsModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [successDetails, setSuccessDetails] = useState<PaymentSuccessDetails | null>(null);

  // 1. Tải số dư hiện tại của người dùng
  const refreshBalance = useCallback(async () => {
    if (!user) return;
    setIsLoadingBalance(true);
    try {
      const data = await getCreditBalanceApi();
      setCredits(data.credits);
      setCurrency(data.currency);
    } catch (error) {
      console.error('[CreditContext] Lỗi khi lấy số dư:', error);
    } finally {
      setIsLoadingBalance(false);
    }
  }, [user]);

  // 2. Tải danh mục bảng giá
  const fetchPlans = useCallback(async () => {
    setIsLoadingPlans(true);
    try {
      const data = await getPricingPlansApi();
      setPlans(data);
    } catch (error) {
      console.error('[CreditContext] Lỗi khi tải danh mục gói cước:', error);
    } finally {
      setIsLoadingPlans(false);
    }
  }, []);

  // 3. Tải lịch sử biến động sổ cái
  const fetchHistory = useCallback(async (page: number = 1, limit: number = 10) => {
    setIsLoadingHistory(true);
    try {
      const res = await getCreditHistoryApi(page, limit);
      setHistory(res.transactions);
      setPagination(res.pagination);
    } catch (error) {
      console.error('[CreditContext] Lỗi khi tải lịch sử:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  // 4. Khởi tạo checkout và chuyển hướng sang Stripe
  const startCheckout = useCallback(async (planId: string): Promise<void> => {
    try {
      // Lưu thông tin gói đang mua vào sessionStorage để hiển thị popup thành công chuẩn xác
      const selectedPlan = plans.find((p) => p.id === planId);
      if (selectedPlan) {
        sessionStorage.setItem(
          'pending_payment_plan',
          JSON.stringify({
            planId: selectedPlan.id,
            planName: selectedPlan.name,
            creditsAdded: selectedPlan.credits
          })
        );
      }

      const checkoutData = await createCheckoutSessionApi(planId);
      if (checkoutData.checkoutUrl) {
        window.location.href = checkoutData.checkoutUrl;
      } else {
        throw new Error('No checkout URL received from Stripe.');
      }
    } catch (error: any) {
      console.error('[CreditContext] Lỗi khởi tạo checkout:', error);
      throw error;
    }
  }, [plans]);

  // Cập nhật số dư trực tiếp (dùng khi response chat trả về creditsRemaining)
  const updateCreditsDirectly = useCallback((newCredits: number) => {
    setCredits(newCredits);
  }, []);

  // Các hàm điều khiển Modal dùng useCallback để giữ nguyên reference, triệt tiêu re-render loop
  const openPricingModal = useCallback(() => setIsPricingModalOpen(true), []);
  const closePricingModal = useCallback(() => setIsPricingModalOpen(false), []);
  const openHistoryModal = useCallback(() => setIsHistoryModalOpen(true), []);
  const closeHistoryModal = useCallback(() => setIsHistoryModalOpen(false), []);
  const openOutOfCreditsModal = useCallback(() => setIsOutOfCreditsModalOpen(true), []);
  const closeOutOfCreditsModal = useCallback(() => setIsOutOfCreditsModalOpen(false), []);
  const openSuccessModal = useCallback((details?: PaymentSuccessDetails) => {
    setSuccessDetails(details || null);
    setIsSuccessModalOpen(true);
  }, []);
  const closeSuccessModal = useCallback(() => {
    setIsSuccessModalOpen(false);
    setSuccessDetails(null);
  }, []);

  // Tự động load số dư khi user đăng nhập thành công
  useEffect(() => {
    if (user?.id) {
      refreshBalance();
      fetchPlans();
    }
  }, [user?.id, refreshBalance, fetchPlans]);

  const contextValue = useMemo<CreditContextType>(
    () => ({
      credits,
      currency,
      isLoadingBalance,
      plans,
      isLoadingPlans,
      history,
      pagination,
      isLoadingHistory,
      isPricingModalOpen,
      isHistoryModalOpen,
      isOutOfCreditsModalOpen,
      isSuccessModalOpen,
      successDetails,
      refreshBalance,
      fetchPlans,
      fetchHistory,
      startCheckout,
      openPricingModal,
      closePricingModal,
      openHistoryModal,
      closeHistoryModal,
      openOutOfCreditsModal,
      closeOutOfCreditsModal,
      openSuccessModal,
      closeSuccessModal,
      updateCreditsDirectly
    }),
    [
      credits,
      currency,
      isLoadingBalance,
      plans,
      isLoadingPlans,
      history,
      pagination,
      isLoadingHistory,
      isPricingModalOpen,
      isHistoryModalOpen,
      isOutOfCreditsModalOpen,
      isSuccessModalOpen,
      successDetails,
      refreshBalance,
      fetchPlans,
      fetchHistory,
      startCheckout,
      openPricingModal,
      closePricingModal,
      openHistoryModal,
      closeHistoryModal,
      openOutOfCreditsModal,
      closeOutOfCreditsModal,
      openSuccessModal,
      closeSuccessModal,
      updateCreditsDirectly
    ]
  );

  return (
    <CreditContext.Provider value={contextValue}>
      {children}
    </CreditContext.Provider>
  );
};
