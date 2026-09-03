import React, { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, CalendarClock } from 'lucide-react';
import {
  BookingStatusValue,
  calculateRefund,
  canReschedule,
  formatINR,
} from '@/utils/refundPolicy';

export type BookingActionMode = 'cancel' | 'reschedule';

interface CancelRescheduleDialogProps {
  open: boolean;
  mode: BookingActionMode;
  onOpenChange: (open: boolean) => void;
  price: number;
  dateTime: string;
  status: BookingStatusValue;
  rescheduleCount?: number;
  isSubmitting?: boolean;
  onCancelBooking: (payload: { reason: string; refundAmount: number }) => void | Promise<void>;
  onRescheduleBooking: (payload: { dateTime: string; reason: string }) => void | Promise<void>;
}

const toLocalInputValue = (iso: string) => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`;
};

export const CancelRescheduleDialog: React.FC<CancelRescheduleDialogProps> = ({
  open,
  mode,
  onOpenChange,
  price,
  dateTime,
  status,
  rescheduleCount = 0,
  isSubmitting = false,
  onCancelBooking,
  onRescheduleBooking,
}) => {
  const [reason, setReason] = useState('');
  const [newDateTime, setNewDateTime] = useState(() => toLocalInputValue(dateTime));

  const refund = useMemo(() => calculateRefund(price, dateTime, status), [price, dateTime, status]);
  const reschedulable = useMemo(
    () => canReschedule(dateTime, status, rescheduleCount),
    [dateTime, status, rescheduleCount]
  );

  const handleConfirm = async () => {
    if (mode === 'cancel') {
      await onCancelBooking({ reason: reason.trim().slice(0, 300), refundAmount: refund.amount });
    } else {
      await onRescheduleBooking({
        dateTime: new Date(newDateTime).toISOString(),
        reason: reason.trim().slice(0, 300),
      });
    }
    setReason('');
    onOpenChange(false);
  };

  const disabled =
    isSubmitting ||
    (mode === 'cancel' ? !refund.canCancel : !reschedulable.allowed || !newDateTime);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === 'cancel' ? (
              <>
                <AlertTriangle className="h-4 w-4 text-destructive" /> Cancel booking
              </>
            ) : (
              <>
                <CalendarClock className="h-4 w-4" /> Reschedule booking
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {mode === 'cancel'
              ? 'Review the refund policy before you confirm.'
              : 'Pick a new date and time that works better for you.'}
          </DialogDescription>
        </DialogHeader>

        {mode === 'cancel' ? (
          <div className="space-y-4">
            <div className="rounded-md border bg-muted/40 p-3 text-sm">
              <div className="flex items-center justify-between font-medium">
                <span>{refund.label}</span>
                <span>{formatINR(refund.amount)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{refund.description}</p>
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                <li>• More than 24 hours before the slot — 100% refund</li>
                <li>• Within 24 hours of the slot — 50% refund</li>
                <li>• After the professional starts — no refund</li>
              </ul>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cancel-reason">Reason (optional)</Label>
              <Textarea
                id="cancel-reason"
                value={reason}
                maxLength={300}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Tell us why you're cancelling"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {!reschedulable.allowed && (
              <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm">
                {reschedulable.reason}
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="new-slot">New date & time</Label>
              <Input
                id="new-slot"
                type="datetime-local"
                value={newDateTime}
                min={toLocalInputValue(new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString())}
                onChange={(e) => setNewDateTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reschedule-reason">Reason (optional)</Label>
              <Textarea
                id="reschedule-reason"
                value={reason}
                maxLength={300}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Anything the professional should know?"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Go back
          </Button>
          <Button
            type="button"
            variant={mode === 'cancel' ? 'destructive' : 'default'}
            disabled={disabled}
            onClick={handleConfirm}
          >
            {mode === 'cancel' ? `Confirm cancellation` : 'Confirm new slot'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelRescheduleDialog;
