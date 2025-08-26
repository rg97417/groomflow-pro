import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Client {
  id: string;
  user_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  birth_date: string | null;
  notes: string | null;
  total_visits: number;
  last_visit: string | null;
  created_at: string;
  updated_at: string;
}

export function useClients() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients', user?.id],
    queryFn: async (): Promise<Client[]> => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching clients:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
  });

  const addClientMutation = useMutation({
    mutationFn: async (newClient: Omit<Client, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'total_visits' | 'last_visit'>) => {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('clients')
        .insert({
          ...newClient,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: 'Cliente adicionado',
        description: 'O cliente foi cadastrado com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao adicionar cliente',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateClientMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Client> }) => {
      const { data, error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: 'Cliente atualizado',
        description: 'As informações do cliente foram salvas.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar cliente',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteClientMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast({
        title: 'Cliente removido',
        description: 'O cliente foi removido do sistema.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao remover cliente',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    clients,
    isLoading,
    addClient: addClientMutation.mutate,
    updateClient: updateClientMutation.mutate,
    deleteClient: deleteClientMutation.mutate,
    isAdding: addClientMutation.isPending,
    isUpdating: updateClientMutation.isPending,
    isDeleting: deleteClientMutation.isPending,
  };
}