
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Banknote } from 'lucide-react';

interface PaymentSelectorProps {
  paymentMethod: 'prepaid' | 'onservice';
  setPaymentMethod: (method: 'prepaid' | 'onservice') => void;
  price: number;
}

export const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  paymentMethod, setPaymentMethod, price
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label>Payment Method</Label>
        <RadioGroup 
          value={paymentMethod} 
          onValueChange={(value) => setPaymentMethod(value as 'prepaid' | 'onservice')}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem value="prepaid" id="prepaid" />
            <Label htmlFor="prepaid" className="flex items-center cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Now (Online)
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-md border p-3">
            <RadioGroupItem value="onservice" id="onservice" />
            <Label htmlFor="onservice" className="flex items-center cursor-pointer">
              <Banknote className="mr-2 h-4 w-4" />
              Pay After Service (QR Code)
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mt-2 text-lg font-bold">
          <span>Total:</span>
          <span>₹{price}</span>
        </div>
      </div>
    </>
  );
};

export default PaymentSelector;
