import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SavedAddress {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  landmark: string | null;
  is_default: boolean;
}

export type NewAddress = Omit<SavedAddress, 'id'>;

export const useSavedAddresses = () => {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAddresses = useCallback(async () => {
    setIsLoading(true);
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) {
      setAddresses([]);
      setIsLoading(false);
      return;
    }
    const { data } = await supabase
      .from('user_addresses')
      .select('id, label, street, city, state, zip_code, landmark, is_default')
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: true });

    setAddresses((data as SavedAddress[]) ?? []);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const addAddress = useCallback(
    async (address: Partial<NewAddress>) => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth?.user) return { error: 'Please sign in to save an address.' };

      if (address.is_default) {
        await supabase.from('user_addresses').update({ is_default: false }).eq('user_id', auth.user.id);
      }

      const { error } = await supabase.from('user_addresses').insert({
        user_id: auth.user.id,
        label: address.label ?? 'home',
        street: address.street ?? '',
        city: address.city ?? '',
        state: address.state ?? '',
        zip_code: address.zip_code ?? '',
        landmark: address.landmark ?? null,
        is_default: address.is_default ?? false,
      });

      await fetchAddresses();
      return { error: error?.message };
    },
    [fetchAddresses]
  );

  const setDefault = useCallback(
    async (id: string) => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth?.user) return;
      await supabase.from('user_addresses').update({ is_default: false }).eq('user_id', auth.user.id);
      await supabase.from('user_addresses').update({ is_default: true }).eq('id', id);
      await fetchAddresses();
    },
    [fetchAddresses]
  );

  const removeAddress = useCallback(
    async (id: string) => {
      await supabase.from('user_addresses').delete().eq('id', id);
      await fetchAddresses();
    },
    [fetchAddresses]
  );

  return { addresses, isLoading, refresh: fetchAddresses, addAddress, setDefault, removeAddress };
};
