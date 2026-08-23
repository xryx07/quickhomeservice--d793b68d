
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { User, AtSign, Phone, Key } from 'lucide-react';
import RoleSelector from './RoleSelector';
import OtpVerification from './OtpVerification';
import { authApi } from '@/api';

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm = ({ onClose }: RegistrationFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isPhoneVerifying, setIsPhoneVerifying] = useState(false);
  const [role, setRole] = useState<'customer' | 'provider'>('customer');
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPhoneVerifying) {
      setIsLoading(true);
      try {
        const result = await authApi.login({ phone });
        if (result.success) {
          setIsPhoneVerifying(true);
          toast({
            title: "Verification code sent",
            description: `We've sent a verification code to ${phone}`,
          });
        } else {
          toast({
            title: "Failed to send code",
            description: result.message || "Please try again",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Failed to send code",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        console.error('Failed to send OTP:', error);
      } finally {
        setIsLoading(false);
      }
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Verify OTP first
      await authApi.verifyOtp({ phone, otp });
      
      // If OTP is verified, proceed with registration
      const registerData = {
        name,
        email,
        phone,
        role
      };
      
      const result = await authApi.register(registerData);
      
      if (result.success) {
        toast({
          title: "Registration successful",
          description: `You've been registered as a ${role}`,
        });
        onClose();
        
        // Reset form
        setEmail('');
        setPassword('');
        setName('');
        setPhone('');
        setOtp('');
        setIsPhoneVerifying(false);
      } else {
        toast({
          title: "Registration failed",
          description: result.message || "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const sendOtpAgain = async () => {
    try {
      await authApi.resendOtp(phone);
      toast({
        title: "Verification code sent again",
        description: `We've sent a new verification code to ${phone}`,
      });
    } catch (error) {
      toast({
        title: "Failed to resend code",
        description: "Could not send a new code. Please try again.",
        variant: "destructive",
      });
      console.error('Failed to resend OTP:', error);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {!isPhoneVerifying ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Enter your full name"
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reg-email">Email</Label>
            <div className="relative">
              <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="reg-email"
                placeholder="Enter your email"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="phone"
                placeholder="Enter your phone number"
                className="pl-10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reg-password">Password</Label>
            <div className="relative">
              <Key className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="reg-password"
                type="password"
                placeholder="Create a password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Register as</Label>
            <div className="flex gap-4">
              <div 
                className={`flex-1 border rounded-md p-3 cursor-pointer ${role === 'customer' ? 'border-brand-600 bg-brand-50' : ''}`}
                onClick={() => setRole('customer')}
              >
                <div className="font-medium">Customer</div>
                <div className="text-sm text-muted-foreground">Book services</div>
              </div>
              <div 
                className={`flex-1 border rounded-md p-3 cursor-pointer ${role === 'provider' ? 'border-brand-600 bg-brand-50' : ''}`}
                onClick={() => setRole('provider')}
              >
                <div className="font-medium">Provider</div>
                <div className="text-sm text-muted-foreground">Offer services</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <OtpVerification 
          phone={phone} 
          otp={otp} 
          setOtp={setOtp} 
          sendOtpAgain={sendOtpAgain} 
        />
      )}
      
      <Button type="submit" className="w-full btn-brand" disabled={isLoading}>
        {isLoading 
          ? 'Processing...' 
          : isPhoneVerifying 
            ? 'Complete Registration' 
            : 'Continue to Verification'}
      </Button>
    </form>
  );
};

export default RegistrationForm;
