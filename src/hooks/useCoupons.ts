import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AppliedCoupon {
  id: string;
  code: string;
  description: string;
  discountAmount: number;
}

interface ValidationResult {
  coupon?: AppliedCoupon;
  error?: string;
}

export const useCoupons = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [applied, setApplied] = useState<AppliedCoupon | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(async (rawCode: string, orderValue: number): Promise<ValidationResult> => {
    const code = rawCode.trim().toUpperCase();
    if (!code) return { error: 'Enter a promo code.' };

    setIsValidating(true);
    setError(null);

    const { data, error: dbError } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .maybeSingle();

    setIsValidating(false);

    if (dbError || !data) {
      const message = 'This promo code is not valid.';
      setError(message);
      return { error: message };
    }

    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      const message = 'This promo code has expired.';
      setError(message);
      return { error: message };
    }

    if (data.usage_limit !== null && data.times_used >= data.usage_limit) {
      const message = 'This promo code has reached its usage limit.';
      setError(message);
      return { error: message };
    }

    if (orderValue < Number(data.min_order_value)) {
      const message = `Valid on orders above ₹${Number(data.min_order_value).toLocaleString('en-IN')}.`;
      setError(message);
      return { error: message };
    }

    let discount =
      data.discount_type === 'flat'
        ? Number(data.discount_value)
        : (orderValue * Number(data.discount_value)) / 100;

    if (data.max_discount !== null) {
      discount = Math.min(discount, Number(data.max_discount));
    }
    discount = Math.min(Math.round(discount), orderValue);

    const coupon: AppliedCoupon = {
      id: data.id,
      code: data.code,
      description: data.description,
      discountAmount: discount,
    };

    setApplied(coupon);
    return { coupon };
  }, []);

  const clear = useCallback(() => {
    setApplied(null);
    setError(null);
  }, []);

  return { validate, clear, applied, error, isValidating };
};
