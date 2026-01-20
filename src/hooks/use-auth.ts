import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { LoginCredentials, RegisterData } from '@/types';

export function useLogin() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      login(data.tokens.accessToken, data.tokens.refreshToken, data.user);
      toast.success('Connexion réussie');
      router.push('/');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Échec de la connexion');
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (data) => {
      login(data.tokens.accessToken, data.tokens.refreshToken, data.user);
      toast.success('Inscription réussie');
      router.push('/');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Échec de l'inscription");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const clearCart = useCartStore((state) => state.clearCart);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      clearCart();
      queryClient.clear();
      toast.success('Déconnexion réussie');
      router.push('/');
    },
    onError: (error: any) => {
      console.error('Logout error:', error);
    },
  });
}

export function useAuth() {
  const authState = useAuthStore();
  return authState;
}
