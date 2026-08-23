
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Service } from '@/utils/types';

interface ServiceOverviewProps {
  service: Service;
  onBookNow: () => void;
}

const ServiceOverview = ({ service, onBookNow }: ServiceOverviewProps) => {
  // Create a fallback empty array for includes if it doesn't exist on the service
  const includedItems = service.features?.slice(0, 3) || [];
  
  return (
    <div className="space-y-8">
      <div className="relative rounded-lg overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-full h-80 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1.5 flex items-center text-sm font-medium">
          <Star className="h-5 w-5 text-amber-500 mr-1" fill="currentColor" />
          <span>{service.rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
            <p className="text-muted-foreground">{service.description}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Service Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.features?.map((feature, index) => (
                <div key={index} className="flex items-center dark:text-gray-300">
                  <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <p className="text-2xl font-bold mb-1">₹{service.price.toLocaleString("en-IN")}</p>
                <p className="text-muted-foreground">Base price for this service</p>
              </div>
              
              <Button onClick={onBookNow} className="w-full mb-4">Book Now</Button>
              
              <div className="space-y-3 mt-6">
                <h3 className="font-medium">What's included:</h3>
                {includedItems.map((item, index) => (
                  <div key={index} className="flex items-center text-sm dark:text-gray-300">
                    <Check className="h-4 w-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceOverview;
