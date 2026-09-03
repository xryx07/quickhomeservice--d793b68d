import React from 'react';
import { Badge } from '@/components/ui/badge';
import { BadgeCheck, Award, Briefcase, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProviderBadgeInput {
  rating?: number;
  completedJobs?: number;
  backgroundVerified?: boolean;
  ecoFriendly?: boolean;
}

interface ProviderBadgesProps extends ProviderBadgeInput {
  className?: string;
  size?: 'sm' | 'md';
}

export const ProviderBadges: React.FC<ProviderBadgesProps> = ({
  rating = 0,
  completedJobs = 0,
  backgroundVerified = false,
  ecoFriendly = false,
  className,
  size = 'md',
}) => {
  const textSize = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs';
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5';

  const badges: React.ReactNode[] = [];

  if (backgroundVerified) {
    badges.push(
      <Badge key="verified" variant="outline" className={cn('gap-1 border-primary/40', textSize)}>
        <BadgeCheck className={iconSize} /> Verified
      </Badge>
    );
  }

  if (rating >= 4.7) {
    badges.push(
      <Badge key="top" variant="outline" className={cn('gap-1 border-amber-500/50 text-amber-600 dark:text-amber-400', textSize)}>
        <Award className={iconSize} /> Top Rated
      </Badge>
    );
  }

  if (completedJobs >= 50) {
    const rounded = Math.floor(completedJobs / 50) * 50;
    badges.push(
      <Badge key="jobs" variant="outline" className={cn('gap-1', textSize)}>
        <Briefcase className={iconSize} /> {rounded}+ jobs
      </Badge>
    );
  }

  if (ecoFriendly) {
    badges.push(
      <Badge key="eco" variant="outline" className={cn('gap-1 border-green-500/50 text-green-600 dark:text-green-400', textSize)}>
        <Leaf className={iconSize} /> Eco-friendly
      </Badge>
    );
  }

  if (badges.length === 0) return null;

  return <div className={cn('flex flex-wrap gap-1.5', className)}>{badges}</div>;
};

export default ProviderBadges;
