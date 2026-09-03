import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tag, X } from 'lucide-react';
import { useCoupons, AppliedCoupon } from '@/hooks/useCoupons';

interface PromoCodeInputProps {
  orderValue: number;
  onChange: (coupon: AppliedCoupon | null) => void;
}

export const PromoCodeInput: React.FC<PromoCodeInputProps> = ({ orderValue, onChange }) => {
  const [code, setCode] = useState('');
  const { validate, clear, applied, error, isValidating } = useCoupons();

  const handleApply = async () => {
    const result = await validate(code, orderValue);
    onChange(result.coupon ?? null);
  };

  const handleRemove = () => {
    clear();
    setCode('');
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="promo-code" className="flex items-center gap-1.5">
        <Tag className="h-4 w-4" /> Promo code
      </Label>

      {applied ? (
        <div className="flex items-center justify-between rounded-md border border-green-500/40 bg-green-500/10 px-3 py-2">
          <div className="text-sm">
            <Badge variant="outline" className="mr-2 font-mono">
              {applied.code}
            </Badge>
            <span className="text-muted-foreground">
              {applied.description || 'Discount applied'}
            </span>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={handleRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            id="promo-code"
            value={code}
            maxLength={24}
            placeholder="Enter code e.g. QHS100"
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="uppercase"
          />
          <Button type="button" variant="outline" onClick={handleApply} disabled={isValidating || !code}>
            {isValidating ? 'Checking...' : 'Apply'}
          </Button>
        </div>
      )}

      {error && !applied && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

export default PromoCodeInput;
