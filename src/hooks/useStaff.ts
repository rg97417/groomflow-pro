import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Staff {
  id: string;
  user_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  specialty: string | null;
  commission_rate: number;
  is_active: boolean;
  hire_date: string;
  created_at: string;
  updated_at: string;
}

export function useStaff() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: staff = [], isLoading } = useQuery({
    queryKey: ['staff', user?.id],
    queryFn: async (): Promise<Staff[]> => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching staff:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
  });

  const addStaffMutation = useMutation({
    mutationFn: async (newStaff: Omit<Staff, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('staff')
        .insert({
          ...newStaff,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      toast({
        title: 'Funcionário adicionado',
        description: 'O funcionário foi cadastrado com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao adicionar funcionário',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateStaffMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Staff> }) => {
      const { data, error } = await supabase
        .from('staff')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      toast({
        title: 'Funcionário atualizado',
        description: 'As informações do funcionário foram salvas.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar funcionário',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteStaffMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('staff')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff'] });
      toast({
        title: 'Funcionário removido',
        description: 'O funcionário foi removido do sistema.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao remover funcionário',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    staff,
    isLoading,
    addStaff: addStaffMutation.mutate,
    updateStaff: updateStaffMutation.mutate,
    deleteStaff: deleteStaffMutation.mutate,
    isAdding: addStaffMutation.isPending,
    isUpdating: updateStaffMutation.isPending,
    isDeleting: deleteStaffMutation.isPending,
  };
}