import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Home, Briefcase, MapPin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SavedAddress, useSavedAddresses } from '@/hooks/useSavedAddresses';

interface SavedAddressSelectorProps {
  selectedId?: string | null;
  onSelect: (address: SavedAddress) => void;
}

const labelIcon = (label: string) => {
  if (label === 'work') return <Briefcase className="h-4 w-4" />;
  if (label === 'home') return <Home className="h-4 w-4" />;
  return <MapPin className="h-4 w-4" />;
};

export const SavedAddressSelector: React.FC<SavedAddressSelectorProps> = ({ selectedId, onSelect }) => {
  const { addresses, isLoading } = useSavedAddresses();

  if (isLoading || addresses.length === 0) return null;

  return (
    <div className="space-y-2">
      <Label>Saved addresses</Label>
      <div className="grid gap-2 sm:grid-cols-2">
        {addresses.map((address) => (
          <button
            key={address.id}
            type="button"
            onClick={() => onSelect(address)}
            className={cn(
              'rounded-md border p-3 text-left text-sm transition-colors hover:bg-accent',
              selectedId === address.id && 'border-primary ring-1 ring-primary'
            )}
          >
            <div className="mb-1 flex items-center gap-2 font-medium capitalize">
              {labelIcon(address.label)}
              {address.label}
              {address.is_default && (
                <Badge variant="outline" className="ml-auto gap-1 text-[10px]">
                  <Star className="h-3 w-3" /> Default
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">
              {address.street}, {address.city}, {address.state} - {address.zip_code}
            </p>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Pick a saved address to fill the form below, or enter a new one.
      </p>
    </div>
  );
};

export default SavedAddressSelector;
