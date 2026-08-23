
import { useState, FormEvent } from 'react';
import { Service } from '@/utils/types';
import { format } from 'date-fns';

interface FormData {
  date: Date | undefined;
  timeSlot: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  landmark: string;
  phone: string;
  email: string;
  note: string;
  addressType: 'home' | 'work' | 'other';
  paymentMethod: 'prepaid' | 'onservice';
}

interface ToastProps {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}

interface UseBookingFormReturn {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  isSubmitting: boolean;
  handleGetCurrentLocation: () => void;
  handleSubmit: (e: FormEvent) => void;
}

export const useBookingForm = (
  service: Service, 
  onBookingComplete?: () => void,
  toast?: (props: ToastProps) => void
): UseBookingFormReturn => {
  const [formData, setFormData] = useState<FormData>({
    date: undefined,
    timeSlot: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    landmark: '',
    phone: '',
    email: '',
    note: '',
    addressType: 'home',
    paymentMethod: 'prepaid'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGetCurrentLocation = () => {
    updateFormData('street', '123 Current Location');
    updateFormData('city', 'Mumbai');
    updateFormData('state', 'Maharashtra');
    updateFormData('zipCode', '400001');
    
    if (toast) {
      toast({
        title: "Location Detected",
        description: "We've detected your current location. Please verify the address details.",
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const { date, timeSlot, street, city, state, zipCode, phone, email, paymentMethod } = formData;
    
    if (!date || !timeSlot || !street || !city || !state || !zipCode || !phone || !email) {
      if (toast) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const bookingData = {
        serviceId: service.id,
        serviceName: service.name,
        providerId: service.providerId,
        providerName: service.providerName,
        dateTime: new Date(`${format(date, 'yyyy-MM-dd')} ${timeSlot}`).toISOString(),
        address: {
          type: formData.addressType,
          street,
          city,
          state,
          zipCode,
          landmark: formData.landmark
        },
        customerPhone: phone,
        customerEmail: email,
        note: formData.note,
        price: service.price,
        paymentMethod
      };
      
      console.log('Booking created:', bookingData);
      
      if (paymentMethod === 'prepaid') {
        if (toast) {
          toast({
            title: "Redirecting to Payment",
            description: `You'll be redirected to complete payment of ₹${service.price} for your booking.`,
          });
        }
        
        setTimeout(() => {
          if (toast) {
            toast({
              title: "Payment Successful!",
              description: `Your booking for ${service.name} has been confirmed. You will receive a confirmation email and SMS shortly.`,
            });
          }
          
          setIsSubmitting(false);
          resetForm();
          
          if (onBookingComplete) {
            onBookingComplete();
          }
        }, 2000);
      } else {
        if (toast) {
          toast({
            title: "Booking Successful!",
            description: `Your booking for ${service.name} has been placed. You will pay ₹${service.price} after the service is completed. You will receive a confirmation email and SMS shortly.`,
          });
        }
        
        setIsSubmitting(false);
        resetForm();
        
        if (onBookingComplete) {
          onBookingComplete();
        }
      }
    }, 1500);
  };
  
  const resetForm = () => {
    setFormData({
      date: undefined,
      timeSlot: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      landmark: '',
      phone: '',
      email: '',
      note: '',
      addressType: 'home',
      paymentMethod: 'prepaid'
    });
  };

  return {
    formData,
    updateFormData,
    isSubmitting,
    handleGetCurrentLocation,
    handleSubmit
  };
};
