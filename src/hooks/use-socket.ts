'use client';

import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '@/config/constants';
import { useAuthStore } from '@/stores/auth.store';
import { useNotificationStore } from '@/stores/notification.store';
import { NotificationType } from '@/types';
import { toast } from 'sonner';

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const accessToken = useAuthStore((state) => state.accessToken);
  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    if (!accessToken) return;

    // Initialize socket connection
    socketRef.current = io(SOCKET_URL, {
      auth: {
        token: accessToken,
      },
      transports: ['websocket'],
    });

    const socket = socketRef.current;

    // Connection events
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    // Business events
    socket.on('order:created', (data) => {
      addNotification({
        type: NotificationType.ORDER_CREATED,
        title: 'Nouvelle commande',
        message: `Commande #${data.orderNumber} créée`,
        data,
      });
      toast.success('Nouvelle commande reçue');
    });

    socket.on('order:updated', (data) => {
      addNotification({
        type: NotificationType.ORDER_UPDATED,
        title: 'Commande mise à jour',
        message: `Commande #${data.orderNumber} - ${data.status}`,
        data,
      });
    });

    socket.on('stock:low', (data) => {
      addNotification({
        type: NotificationType.STOCK_LOW,
        title: 'Stock faible',
        message: `${data.productName} - Stock: ${data.stock}`,
        data,
      });
      toast.warning(`Stock faible: ${data.productName}`);
    });

    socket.on('stock:out', (data) => {
      addNotification({
        type: NotificationType.STOCK_OUT,
        title: 'Rupture de stock',
        message: `${data.productName} est en rupture`,
        data,
      });
      toast.error(`Rupture de stock: ${data.productName}`);
    });

    socket.on('payment:success', (data) => {
      addNotification({
        type: NotificationType.PAYMENT_SUCCESS,
        title: 'Paiement réussi',
        message: `Paiement de ${data.amount}€ confirmé`,
        data,
      });
    });

    socket.on('payment:failed', (data) => {
      addNotification({
        type: NotificationType.PAYMENT_FAILED,
        title: 'Paiement échoué',
        message: `Le paiement a échoué`,
        data,
      });
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [accessToken, addNotification]);

  const emit = useCallback((event: string, data?: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    }
  }, []);

  return {
    socket: socketRef.current,
    emit,
    isConnected: socketRef.current?.connected || false,
  };
}
