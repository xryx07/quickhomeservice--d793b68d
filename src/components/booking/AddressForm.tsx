
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

const states = [
  'Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu',
  'West Bengal', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh'
];

interface AddressFormProps {
  street: string;
  setStreet: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  zipCode: string;
  setZipCode: (value: string) => void;
  landmark: string;
  setLandmark: (value: string) => void;
  addressType: 'home' | 'work' | 'other';
  setAddressType: (value: 'home' | 'work' | 'other') => void;
  handleGetCurrentLocation: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
  street, setStreet,
  city, setCity,
  state, setState,
  zipCode, setZipCode,
  landmark, setLandmark,
  addressType, setAddressType,
  handleGetCurrentLocation
}) => {
  return (
    <>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <Label htmlFor="addressType">Address Type</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleGetCurrentLocation}
            className="text-xs"
          >
            Use Current Location
          </Button>
        </div>
        <Select value={addressType} onValueChange={(value) => setAddressType(value as 'home' | 'work' | 'other')}>
          <SelectTrigger id="addressType">
            <SelectValue placeholder="Select address type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="home">Home</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="street">Street Address</Label>
        <Textarea
          id="street"
          placeholder="Enter your street address, house number, building, etc."
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="resize-none"
          rows={2}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="city">City</Label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger id="city">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="state">State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger id="state">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="zipCode">PIN Code</Label>
          <Input
            id="zipCode"
            placeholder="Enter PIN code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="landmark">Landmark (Optional)</Label>
          <Input
            id="landmark"
            placeholder="Nearby landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default AddressForm;
