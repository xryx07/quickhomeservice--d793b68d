import React from 'react';
import { Check, Clock, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BOOKING_STEPS, StatusEvent } from '@/hooks/useBookingStatus';
import type { BookingStatusValue } from '@/utils/refundPolicy';

interface BookingStatusTimelineProps {
  status: BookingStatusValue;
  history?: StatusEvent[];
  etaMinutes?: number | null;
  className?: string;
}

const BookingStatusTimeline: React.FC<BookingStatusTimelineProps> = ({
  status,
  history = [],
  etaMinutes,
  className,
}) => {
  if (status === 'cancelled') {
    return (
      <div className={cn('rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm', className)}>
        This booking was cancelled.
      </div>
    );
  }

  const currentIndex = Math.max(
    BOOKING_STEPS.findIndex((step) => step.key === status),
    0
  );

  const timestampFor = (key: BookingStatusValue) => {
    const event = history.find((h) => h.status === key);
    return event ? new Date(event.created_at) : null;
  };

  const showEta =
    typeof etaMinutes === 'number' && etaMinutes > 0 && (status === 'confirmed' || status === 'on-the-way');

  return (
    <div className={cn('space-y-3', className)}>
      {showEta && (
        <div className="flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-medium">
          <Truck className="h-4 w-4 flex-shrink-0" />
          <span>Your professional is about {etaMinutes} minutes away</span>
        </div>
      )}

      <ol className="relative space-y-4">
        {BOOKING_STEPS.map((step, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          const time = timestampFor(step.key);

          return (
            <li key={step.key} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full border text-[10px]',
                    done && 'border-primary bg-primary text-primary-foreground',
                    active && 'border-primary bg-background text-primary ring-2 ring-primary/30',
                    !done && !active && 'border-muted-foreground/30 text-muted-foreground'
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : index + 1}
                </span>
                {index < BOOKING_STEPS.length - 1 && (
                  <span
                    className={cn(
                      'mt-1 h-6 w-px',
                      index < currentIndex ? 'bg-primary' : 'bg-muted-foreground/25'
                    )}
                  />
                )}
              </div>
              <div className="pb-1">
                <p
                  className={cn(
                    'text-sm',
                    active ? 'font-semibold text-foreground' : done ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </p>
                {time && (
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {time.toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default BookingStatusTimeline;
