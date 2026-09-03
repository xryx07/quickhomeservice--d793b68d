export type BookingStatusValue =
  | 'pending'
  | 'confirmed'
  | 'on-the-way'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export interface RefundOutcome {
  /** Percentage of the paid amount that is refunded (0 - 100). */
  percentage: number;
  amount: number;
  label: string;
  description: string;
  canCancel: boolean;
}

/**
 * Simple, transparent cancellation policy:
 * - More than 24h before the slot  -> 100% refund
 * - Within 24h of the slot         -> 50% refund
 * - Once the provider has started  -> no refund
 */
export const calculateRefund = (
  price: number,
  slotDateTime: string | Date,
  status: BookingStatusValue,
  now: Date = new Date()
): RefundOutcome => {
  const slot = typeof slotDateTime === 'string' ? new Date(slotDateTime) : slotDateTime;
  const hoursUntilSlot = (slot.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (status === 'completed' || status === 'cancelled') {
    return {
      percentage: 0,
      amount: 0,
      label: 'Not cancellable',
      description:
        status === 'completed'
          ? 'This service has already been completed.'
          : 'This booking is already cancelled.',
      canCancel: false,
    };
  }

  if (status === 'in-progress') {
    return {
      percentage: 0,
      amount: 0,
      label: 'No refund',
      description:
        'The professional has already started work, so no refund is available for this cancellation.',
      canCancel: true,
    };
  }

  if (hoursUntilSlot > 24) {
    return {
      percentage: 100,
      amount: price,
      label: 'Full refund',
      description:
        'You are cancelling more than 24 hours before the slot, so you get a 100% refund.',
      canCancel: true,
    };
  }

  return {
    percentage: 50,
    amount: Math.round(price * 0.5),
    label: '50% refund',
    description:
      'You are cancelling within 24 hours of the slot, so 50% of the amount is refunded as per policy.',
    canCancel: true,
  };
};

export const canReschedule = (
  slotDateTime: string | Date,
  status: BookingStatusValue,
  rescheduleCount = 0
): { allowed: boolean; reason?: string } => {
  if (status === 'completed' || status === 'cancelled') {
    return { allowed: false, reason: 'This booking can no longer be changed.' };
  }
  if (status === 'in-progress' || status === 'on-the-way') {
    return { allowed: false, reason: 'The professional is already on the job.' };
  }
  if (rescheduleCount >= 2) {
    return { allowed: false, reason: 'You have reached the maximum of 2 reschedules.' };
  }
  const slot = typeof slotDateTime === 'string' ? new Date(slotDateTime) : slotDateTime;
  if (slot.getTime() - Date.now() < 2 * 60 * 60 * 1000) {
    return { allowed: false, reason: 'Bookings can only be rescheduled at least 2 hours in advance.' };
  }
  return { allowed: true };
};

export const formatINR = (value: number) => `₹${Number(value || 0).toLocaleString('en-IN')}`;
