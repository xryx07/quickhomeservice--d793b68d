import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { BookingStatusValue } from '@/utils/refundPolicy';

export interface StatusEvent {
  id: string;
  status: BookingStatusValue;
  note: string | null;
  created_at: string;
}

export const BOOKING_STEPS: { key: BookingStatusValue; label: string }[] = [
  { key: 'pending', label: 'Booked' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'on-the-way', label: 'Provider on the way' },
  { key: 'in-progress', label: 'In progress' },
  { key: 'completed', label: 'Completed' },
];

/**
 * Loads and appends the status timeline of a booking.
 * Falls back gracefully (empty history) when the booking is local/mock data.
 */
export const useBookingStatus = (bookingId?: string) => {
  const [history, setHistory] = useState<StatusEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!bookingId) return;
    setIsLoading(true);
    const { data, error } = await supabase
      .from('booking_status_history')
      .select('id, status, note, created_at')
      .eq('booking_id', bookingId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setHistory(data as StatusEvent[]);
    }
    setIsLoading(false);
  }, [bookingId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const recordStatus = useCallback(
    async (status: BookingStatusValue, note?: string) => {
      if (!bookingId) return;
      const { data: auth } = await supabase.auth.getUser();
      await supabase.from('booking_status_history').insert({
        booking_id: bookingId,
        status,
        note: note ?? null,
        changed_by: auth?.user?.id ?? null,
      });
      await fetchHistory();
    },
    [bookingId, fetchHistory]
  );

  return { history, isLoading, refresh: fetchHistory, recordStatus };
};
