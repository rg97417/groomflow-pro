import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Service {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number; // in minutes
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useServices() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services', user?.id],
    queryFn: async (): Promise<Service[]> => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching services:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
  });

  const addServiceMutation = useMutation({
    mutationFn: async (newService: Omit<Service, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('services')
        .insert({
          ...newService,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({
        title: 'Serviço adicionado',
        description: 'O serviço foi cadastrado com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao adicionar serviço',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Service> }) => {
      const { data, error } = await supabase
        .from('services')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({
        title: 'Serviço atualizado',
        description: 'As informações do serviço foram salvas.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar serviço',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({
        title: 'Serviço removido',
        description: 'O serviço foi removido do sistema.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao remover serviço',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    services,
    isLoading,
    addService: addServiceMutation.mutate,
    updateService: updateServiceMutation.mutate,
    deleteService: deleteServiceMutation.mutate,
    isAdding: addServiceMutation.isPending,
    isUpdating: updateServiceMutation.isPending,
    isDeleting: deleteServiceMutation.isPending,
  };
}