
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Phone } from 'lucide-react';
import { authApi } from '@/api';
import OtpVerification from './OtpVerification';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm = ({ onClose }: LoginFormProps) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isPhoneVerifying, setIsPhoneVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPhoneVerifying) {
      // Step 1: Send OTP to phone
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
    
    // Step 2: Verify OTP and login
    setIsLoading(true);
    try {
      const authResponse = await authApi.verifyOtp({ phone, otp });
      
      // Store auth data
      localStorage.setItem('token', authResponse.token);
      localStorage.setItem('user', JSON.stringify(authResponse.user));
      
      toast({
        title: "Logged in successfully",
        description: "Welcome back to QuickHomeService!",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid verification code. Please try again.",
        variant: "destructive",
      });
      console.error('Login error:', error);
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
    <form onSubmit={handleLogin} className="space-y-4">
      {!isPhoneVerifying ? (
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
            ? 'Login' 
            : 'Send Verification Code'}
      </Button>
    </form>
  );
};

export default LoginForm;
