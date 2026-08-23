
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NoServicesMessage from './NoServicesMessage';
import { allServices } from '@/data/services';
import { Service } from '@/utils/types';

interface ServicesListProps {
  category?: string;
  searchQuery?: string;
  priceRange?: [number, number];
  minRating?: number;
}

const ServicesList = ({
  category,
  searchQuery = '',
  priceRange,
  minRating = 0
}: ServicesListProps) => {
  // Filter services based on props
  const filteredServices = allServices.filter((service) => {
    // Category filter
    if (category && service.category !== category) return false;
    
    // Search query filter
    if (
      searchQuery &&
      !service.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !service.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Price range filter
    if (priceRange && (service.price < priceRange[0] || service.price > priceRange[1])) {
      return false;
    }
    
    // Rating filter
    if (service.rating < minRating) return false;
    
    return true;
  });
  
  // Add refresh handler for NoServicesMessage
  const handleRefresh = () => {
    // In a real implementation, this would refetch data
    console.log('Refreshing services list');
    window.location.reload();
  };
  
  if (filteredServices.length === 0) {
    return <NoServicesMessage 
      onRefresh={handleRefresh} 
      isFiltered={!!category || !!searchQuery || !!priceRange || minRating > 0} 
    />;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredServices.map((service) => (
        <Link key={service.id} to={`/services/${service.id}`}>
          <Card className="h-full service-card">
            <div className="relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 flex items-center text-sm font-medium">
                <Star className="h-4 w-4 text-amber-500 mr-1" fill="currentColor" />
                <span>{service.rating.toFixed(1)}</span>
              </div>
            </div>
            <CardContent className="p-5">
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{service.description}</p>
              
              {/* Features list with improved dark mode visibility */}
              <div className="space-y-2 mb-4">
                {service.features && service.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm dark:text-gray-300">
                    <Check size={14} className="text-green-500 dark:text-green-400 mr-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-auto">
                <div className="font-bold">₹{service.price.toLocaleString("en-IN")}</div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ServicesList;
